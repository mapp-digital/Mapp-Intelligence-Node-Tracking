import {AConsumer} from './AConsumer';
import {Messages} from '../Messages';
import {DebugLogger} from '../DebugLogger';

export class ConsumerHttpClient extends AConsumer {
    /**
     * @param config Mapp Intelligence configuration
     */
    public constructor(config: {[key: string]: any}) {
        super(config);
    }

    /**
     * @param batchContent List of tracking requests
     * @return boolean
     */
    public sendBatch(batchContent: Array<string>): Promise<boolean> {
        const that = this;
        return new Promise(function(resolve) {
            const payload: string = that.verifyPayload(batchContent);
            if (!payload) {
                return resolve(false);
            }

            const logger: DebugLogger = that.logger;
            const httpOptions: {[key: string]: any} = that.getHTTPOptions();
            const currentBatchSize: number = batchContent.length;
            logger.debug(Messages.SEND_BATCH_DATA, httpOptions['hostname'], currentBatchSize);

            const request = that.getHTTPClient(httpOptions, function(response) {
                const httpStatus: number = response.statusCode;
                logger.debug(Messages.BATCH_REQUEST_STATUS, httpStatus);

                if (httpStatus >= 400) {
                    return resolve(false);
                }

                return resolve(true);
            });

            request.on('timeout', function() {
                request.destroy();
            });

            request.on('error', function(error) {
                logger.error(Messages.GENERIC_ERROR, error.name, error.message);
                resolve(false);
            });

            request.write(payload);
            request.end();
        });
    }
}
