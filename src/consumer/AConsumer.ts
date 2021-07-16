import {EOL} from 'os';
import * as http from 'http';
import * as https from 'https';
import {IConsumer} from '../IConsumer';
import {DebugLogger} from '../DebugLogger';
import {Messages} from '../Messages';

export abstract class AConsumer implements IConsumer {
    /**
     * Constant for max payload size.
     */
    private static readonly MAX_PAYLOAD_SIZE: number = 24 * 1024 * 1024;
    /**
     * Constant for max batch size.
     */
    private static readonly MAX_BATCH_SIZE: number = 10 * 1000;
    /**
     * Constant for one hundred as double.
     */
    private static readonly DOUBLE_100: number = 100;
    /**
     * Constant for one hundred as double.
     */
    private static readonly INTEGER_1024: number = 1024;
    /**
     * Constant for the default value of max lines per file.
     */
    protected static readonly DEFAULT_MAX_FILE_LINES: number = 10 * 1000;
    /**
     * Constant for the default value of max file duration (30 min).
     */
    protected static readonly DEFAULT_MAX_FILE_DURATION: number = 30 * 60 * 1000;
    /**
     * Constant for the default value of max file size (24 MB).
     */
    protected static readonly DEFAULT_MAX_FILE_SIZE: number = 24 * 1024 * 1024;
    /**
     * Constant for default connection timeout.
     */
    protected static readonly DEFAULT_CONNECT_TIMEOUT: number = 30 * 1000;

    /**
     * Mapp Intelligence debug logger.
     */
    protected readonly logger: DebugLogger;
    /**
     * Your Mapp Intelligence track ID provided by Mapp.
     */
    private readonly trackId: string;
    /**
     * Your Mapp Intelligence tracking domain.
     */
    private readonly trackDomain: string;
    /**
     * Sends every request via SSL.
     */
    private readonly forceSSL: boolean;

    /**
     * @param config Mapp Intelligence configuration
     */
    protected constructor(config: {[key: string]: any}) {
        this.forceSSL = ((typeof config['forceSSL'] === 'boolean') ? config['forceSSL'] : true);
        this.trackDomain = ((config['trackDomain']) ? config['trackDomain'] : '');
        this.trackId = ((config['trackId']) ? config['trackId'] : '');

        this.logger = new DebugLogger(config['logger']);
    }

    /**
     * @return number
     */
    private getPort(): number {
        const trackDomainSplit = this.trackDomain.split(':');

        if (typeof trackDomainSplit[1] !== 'undefined') {
            return parseInt(trackDomainSplit[1]);
        }

        return ((this.forceSSL) ? 443 : 80);
    }

    /**
     * @return string
     */
    protected getUrl(): string {
        let url: string = ((this.forceSSL) ? "https://" : "http://");
        url += `${this.trackDomain}/${this.trackId}/batch`;

        return url;
    }

    /**
     * @return {[key: string]: any}
     */
    protected getHTTPOptions(): {[key: string]: any} {
        return {
            hostname: this.trackDomain.split(':')[0],
            port: this.getPort(),
            path: `/${this.trackId}/batch`,
            method: 'POST',
            timeout: AConsumer.DEFAULT_CONNECT_TIMEOUT,
            headers: {
                'Content-Type': 'text/plain; utf-8'
            }
        };
    }

    /**
     * @return (options: {[key: string]: any}, callback: (res: http.IncomingMessage) => void) => http.ClientRequest
     */
    protected getHTTPClient(options: {[key: string]: any }, callback?: (res: http.IncomingMessage) => void): http.ClientRequest {
        return ((this.forceSSL) ? https.request(options, callback) : http.request(options, callback));
    }

    /**
     * @param batchContent List of tracking requests
     * @return string
     */
    protected verifyPayload(batchContent: Array<string>): string {
        const currentBatchSize: number = batchContent.length;
        if (currentBatchSize > AConsumer.MAX_BATCH_SIZE) {
            this.logger.log(Messages.TO_LARGE_BATCH_SIZE, AConsumer.MAX_BATCH_SIZE, currentBatchSize);
            return '';
        }

        const payload: string = batchContent.join(EOL);
        if (payload.length >= AConsumer.MAX_PAYLOAD_SIZE) {
            const length: number = payload.length;
            const div = length / AConsumer.INTEGER_1024 / AConsumer.INTEGER_1024 * AConsumer.DOUBLE_100;
            const currentPayloadSize: number = Math.round(div) / AConsumer.DOUBLE_100;
            this.logger.log(Messages.TO_LARGE_PAYLOAD_SIZE, currentPayloadSize);
            return '';
        }

        return payload;
    }

    /**
     * @param batchContent List of tracking requests
     *
     * @return boolean
     */
    abstract sendBatch(batchContent: Array<string>): Promise<boolean>;
}
