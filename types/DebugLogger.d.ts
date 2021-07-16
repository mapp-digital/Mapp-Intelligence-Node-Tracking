import { ILogger } from './ILogger';
export declare class DebugLogger implements ILogger {
    private readonly logger;
    constructor(l: ILogger);
    private static format;
    log(...msg: Array<any>): void;
}
