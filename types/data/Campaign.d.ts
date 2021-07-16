import { AData } from './AData';
export declare class Campaign extends AData {
    private static readonly ACTION;
    private id;
    private mediaCode;
    private oncePerSession;
    private readonly parameter;
    constructor(i?: string);
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setId(i: string): Campaign;
    setMediaCode(mc: Array<string>): Campaign;
    setOncePerSession(ops: boolean): Campaign;
    setParameter(i: number, value: string): Campaign;
}
