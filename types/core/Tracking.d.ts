import { ACore } from './ACore';
import { Config } from '../config/Config';
export declare class Tracking extends ACore {
    constructor(config: Config);
    private static simulateEmptyValues;
    private static convertToString;
    private static isProductList;
    private static mergeProducts;
    private static getRequestData;
    private isTrackable;
    private addToRequestQueue;
    private trackData;
    track(data?: any): Promise<boolean>;
    flush(): Promise<boolean>;
}
