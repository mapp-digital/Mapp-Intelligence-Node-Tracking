import {ILogger} from './ILogger';
import {Messages} from './Messages';
import {LogLevel} from './LogLevel';

export class DebugLogger implements ILogger {
    private static readonly MESSAGE_FORMAT: string = '${0} ${1} [${2}]: ';

    /**
     * Mapp Intelligence logger.
     */
    private readonly logger: ILogger;
    /**
     * Defined the debug log level.
     */
    private readonly logLevel: number;

    /**
     * @param l Mapp Intelligence logger.
     * @param ll Debug log level.
     */
    public constructor(l: ILogger, ll: number) {
        this.logger = l;
        this.logLevel = ll;
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
     * @param ll Debug log level
     *
     * @return Message prefix
     */
    private static getMessagePrefix(ll: string): string {
        return DebugLogger.format(
            DebugLogger.MESSAGE_FORMAT,
            (new Date()).toISOString(),
            ll,
            Messages.MAPP_INTELLIGENCE
        );
    }

    /**
     * @param prefix Message prefix
     * @param msg Debug message
     */
    private logMessage(prefix: string, ...msg: Array<any>): void {
        if (this.logger) {
            msg[0] = prefix + msg[0];
            this.log(...msg);
        }
    }

    /**
     * @param msg Debug message
     */
    public log(...msg: Array<any>): void {
        if (this.logger) {
            const format: string = msg.shift();

            if (msg.length === 0) {
                this.logger.log(format);
            }
            else {
                this.logger.log(DebugLogger.format(format, ...msg));
            }
        }
    }

    /**
     * @param msg Debug message
     */
    public fatal(...msg: Array<any>): void {
        if (LogLevel.FATAL <= this.logLevel) {
            this.logMessage(DebugLogger.getMessagePrefix('FATAL'), ...msg);
        }
    }

    /**
     * @param msg Debug message
     */
    public error(...msg: Array<any>): void {
        if (LogLevel.ERROR <= this.logLevel) {
            this.logMessage(DebugLogger.getMessagePrefix('ERROR'), ...msg);
        }
    }

    /**
     * @param msg Debug message
     */
    public warn(...msg: Array<any>): void {
        if (LogLevel.WARN <= this.logLevel) {
            this.logMessage(DebugLogger.getMessagePrefix('WARN'), ...msg);
        }
    }

    /**
     * @param msg Debug message
     */
    public info(...msg: Array<any>): void {
        if (LogLevel.INFO <= this.logLevel) {
            this.logMessage(DebugLogger.getMessagePrefix('INFO'), ...msg);
        }
    }

    /**
     * @param msg Debug message
     */
    public debug(...msg: Array<any>): void {
        if (LogLevel.DEBUG <= this.logLevel) {
            this.logMessage(DebugLogger.getMessagePrefix('DEBUG'), ...msg);
        }
    }
}
