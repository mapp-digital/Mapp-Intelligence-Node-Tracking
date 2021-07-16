export interface ILogger {
    /**
     * @param msg Debug message
     */
    log: (...msg: Array<any>) => void;
}
