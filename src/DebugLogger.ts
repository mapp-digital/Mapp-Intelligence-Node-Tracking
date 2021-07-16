import {ILogger} from './ILogger';
import {Messages} from './Messages';

export class DebugLogger implements ILogger {
    /**
     * Mapp Intelligence logger.
     */
    private readonly logger;

    /**
     * @param l Mapp Intelligence logger.
     */
    public constructor(l: ILogger) {
        this.logger = l;
    }

    /**
     * @param format
     * @param val
     */
    private static format(format: string, ...val: Array<any>): string {
        let str = format;
        for (let index = 0; index < val.length; index++) {
            str = str.replace('${' + index + '}', val[index]);
        }

        return str;
    }

    /**
     * @param msg Debug message
     */
    public log(...msg: Array<any>): void {
        if (this.logger) {
            const format: string = Messages.MAPP_INTELLIGENCE + msg.shift();

            if (msg.length === 0) {
                this.logger.log(format);
            }
            else {
                this.logger.log(DebugLogger.format(format, ...msg));
            }
        }
    }
}
