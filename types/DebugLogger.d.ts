import { ILogger } from './ILogger';
export declare class DebugLogger implements ILogger {
    private static readonly MESSAGE_FORMAT;
    private readonly logger;
    private readonly logLevel;
    constructor(l: ILogger, ll: number);
    private static format;
    private static getMessagePrefix;
    private logMessage;
    log(...msg: Array<any>): void;
    fatal(...msg: Array<any>): void;
    error(...msg: Array<any>): void;
    warn(...msg: Array<any>): void;
    info(...msg: Array<any>): void;
    debug(...msg: Array<any>): void;
}
