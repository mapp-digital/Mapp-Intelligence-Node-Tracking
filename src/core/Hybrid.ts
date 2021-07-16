import {Config} from '../config/Config';
import {ACore} from './ACore';
import {ConsumerType} from '../consumer/ConsumerType';

export class Hybrid extends ACore {
    /**
     * A 1x1px transparent gif (base64 encoded).
     */
    private static readonly PIXEL: string = 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    private static readonly CONTENT_TYPE: string = 'Content-Type: image/gif';
    private static readonly CONTENT_LENGTH: string = 'Content-Length: 43';

    /**
     * HTTP request URL.
     */
    private requestURL: URL;

    /**
     * @param config Mapp Intelligence configuration
     */
    public constructor(config: Config) {
        super(
            config.build()['consumerType'] === ConsumerType.CUSTOM
                ? config
                : config.setConsumerType(ConsumerType.FILE)
        );

        this.requestURL = config.build()['requestURL'];
    }

    /**
     * @return Returns a 1x1px transparent gif
     */
    public getResponseAsBase64(): string {
        return Hybrid.PIXEL;
    }

    /**
     * @return Returns a 1x1px transparent gif
     */
    public getResponseAsBuffer(): Buffer {
        return Buffer.from(this.getResponseAsBase64(), 'base64');
    }

    /**
     * @param [rURL] request url with query parameters
     */
    public async track(rURL?: string): Promise<void> {
        if (!rURL) {
            const r: URL = this.requestURL;
            if (!this.deactivate && r && r.search) {
                await this.queue.add('wt' + r.search);
                await this.queue.flush();
            }
        }
        else {
            try {
                this.requestURL = new URL(rURL);
            } catch (e) {
                // do nothing
            }

            await this.track();
        }
    }
}
