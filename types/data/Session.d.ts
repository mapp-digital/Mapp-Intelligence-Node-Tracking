import { AData } from './AData';
export declare class Session extends AData {
    private loginStatus;
    private readonly parameter;
    constructor();
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setLoginStatus(lStatus: string): Session;
    setParameter(i: number, v: string): Session;
}
