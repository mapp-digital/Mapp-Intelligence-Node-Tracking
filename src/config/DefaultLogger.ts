import {ILogger} from '../ILogger';

export class DefaultLogger implements ILogger {
    /**
     * @param msg Debug message
     */
    public log(msg: string): void {
        console.log(msg);
    }
}
