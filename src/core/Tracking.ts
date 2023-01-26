import {ACore} from './ACore';
import {Config} from '../config/Config';
import {Messages} from '../Messages';
import {ProductCollection} from '../data/ProductCollection';
import {Parameter} from '../Parameter';
import {Product} from '../data/Product';
import {ParameterMap} from '../data/ParameterMap';
import {DataMap} from '../data/DataMap';

export class Tracking extends ACore {
    /**
     * @param config Mapp Intelligence configuration
     */
    public constructor(config: Config) {
        super(config);
    }

    /**
     * @param maxLength maximal length to simulate empty values
     *
     * @return String[]
     */
    private static simulateEmptyValues(maxLength: number): Array<string> {
        const emptyArray: Array<string> = [];
        for (let i = 0; i < maxLength; i++) {
            emptyArray[i] = '';
        }

        return emptyArray;
    }

    /**
     * @param value value to convert
     *
     * @return String
     */
    private static convertToString(value: string): string {
        if (value === 'true') {
            return '1';
        }

        return ((value === 'false') ? '0' : value);
    }

    /**
     * @param data Object to check
     *
     * @return boolean
     */
    private static isProductList(data: any): boolean {
        return data instanceof ProductCollection;
    }

    /**
     * @param productInformation List of products
     *
     * @return Map(String, String)
     */
    private static mergeProducts(productInformation: Array<{[key: string]: string}>): {[key: string]: string} {
        const requestInformation: {[key: string]: Array<string>} = {};
        const returnValue: {[key: string]: string} = {};
        const length: number = productInformation.length;

        for (let i = 0; i < length; i++) {
            const pi: {[key: string]: string} = productInformation[i];
            for (const entry in pi) {
                if (!requestInformation[entry]) {
                    requestInformation[entry] = Tracking.simulateEmptyValues(length);
                }

                requestInformation[entry][i] = Tracking.convertToString(pi[entry]);
            }
        }

        for (const entry in requestInformation) {
            const joinValue: Array<string> = requestInformation[entry];
            returnValue[entry] = joinValue.join(';');
        }

        return returnValue;
    }

    /**
     * @param data Tracking request data
     */
    private static getRequestData(data: {[key: string]: any}): {[key: string]: string} {
        const requestData: {[key: string]: string} = {};
        let value: any;

        for (const entry in data) {
            value = data[entry];
            if (Tracking.isProductList(value)) {
                const products: Array<{[key: string]: string}> = [];
                const valueProductList: Array<Product> = value.build();
                let mappIntelligenceProduct: Product;
                for (mappIntelligenceProduct of valueProductList) {
                    products.push(mappIntelligenceProduct.getQueryParameter());
                }
                Object.assign(requestData, Tracking.mergeProducts(products));
            } else {
                if (value) {
                    Object.assign(requestData, value.getQueryParameter());
                }
            }
        }

        return requestData;
    }

    /**
     * @return boolean
     */
    private isTrackable(): boolean {
        if (this.deactivate) {
            this.logger.log(Messages.TRACKING_IS_DEACTIVATED);
            return false;
        }

        if (!this.trackId || !this.trackDomain) {
            this.logger.log(Messages.REQUIRED_TRACK_ID_AND_DOMAIN_FOR_TRACKING);
            return false;
        }

        if (this.deactivateByInAndExclude) {
            this.logger.log(Messages.TRACKING_IS_DEACTIVATED_BY_IN_AND_EXCLUDE);
            return false;
        }

        return true;
    }

    /**
     * @param requestData Tracking request data
     *
     * @return boolean
     */
    private async addToRequestQueue(requestData: {[key: string]: string}): Promise<boolean> {
        requestData[Parameter.PIXEL_FEATURES] = this.config['statistics'];
        requestData[Parameter.VERSION] = Tracking.VERSION;
        requestData[Parameter.TRACKING_PLATFORM] = Tracking.TRACKING_PLATFORM;

        await this.queue.add(requestData);
        return true;
    }

    /**
     * @param [data] Mapp Intelligence parameter or data map
     * @return boolean
     */
    private async trackData(data: any): Promise<boolean> {
        return this.track(new ParameterMap());
    }

    /**
     * @param [data] Mapp Intelligence parameter or data map
     * @return boolean
     */
    public async track(data?: any): Promise<boolean> {
        if (!data) {
            return this.trackData(new ParameterMap());
        }

        if (this.isTrackable()) {
            if (data instanceof ParameterMap) {
                return this.addToRequestQueue(data.build());
            }
            else if (data instanceof DataMap) {
                return this.addToRequestQueue(Tracking.getRequestData(data.build()));
            }
        }

        return false;
    }

    /**
     * @return boolean
     */
    public flush(): Promise<boolean> {
        return this.queue.flush();
    }
}
