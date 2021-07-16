import {exec} from 'child_process';
import {AConsumer} from './AConsumer';
import {Messages} from "../Messages";

export class ConsumerForkCurl extends AConsumer {
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
        return new Promise(async function(resolve) {
            const payload: string = that.verifyPayload(batchContent);
            if (!payload) {
                return resolve(false);
            }

            const url: string = that.getUrl();
            const currentBatchSize: number = batchContent.length;
            that.logger.log(Messages.SEND_BATCH_DATA, url, currentBatchSize);

            let command = 'curl -X POST -H "Content-Type: text/plain"';
            command += ` -d "${payload}"`;
            command += ` -m ${ConsumerForkCurl.DEFAULT_CONNECT_TIMEOUT / 1000}`;
            command += ' -s -o /dev/null -w "%{http_code}"';
            command += ` "${url}"`;

            that.logger.log(Messages.EXECUTE_COMMAND, command);

            exec(command, function(error, stdout, stderr) {
                if (error) {
                    that.logger.log(Messages.GENERIC_ERROR, error.name, error.code);
                }

                const httpStatus = parseInt(stdout);
                that.logger.log(Messages.BATCH_REQUEST_STATUS, httpStatus);

                if (httpStatus !== 200) {
                    that.logger.log(Messages.BATCH_RESPONSE_TEXT, httpStatus, stderr);
                    return resolve(false);
                }

                return resolve(true);
            });
        });
    }
}
