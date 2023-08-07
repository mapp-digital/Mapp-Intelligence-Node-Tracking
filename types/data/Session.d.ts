import { AData } from './AData';
export declare class Session extends AData {
    private readonly TEMPORARY_SESSION_ID_TYPE;
    private loginStatus;
    private temporarySessionId;
    private temporarySessionIdType;
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
    setTemporarySessionId(tSessionId: string): Session;
}
