import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Session extends AData {
    private readonly TEMPORARY_SESSION_ID_TYPE: string = '2.0.0';

    /**
     * Pass the current users login status here.
     */
    private loginStatus: string = '';
    /**
     * In order to keep the session and the user during a single session, we offer the possibility to set a temporary
     * session ID that keeps the session together but is not permanently stored on a device.
     */
    private temporarySessionId: string = '';
    /**
     * In order to keep the session and the user during a single session, we offer the possibility to set a temporary
     * session ID that keeps the session together but is not permanently stored on a device.
     */
    private temporarySessionIdType: string = '';
    /**
     * Session parameters always refer to a complete session (visit). If the value for the parameter is transmitted
     * during a visit several times, only the first or last value is evaluated, based on the configuration of the
     * Webtrekk GUI.
     */
    private readonly parameter: {[key: number]: string} = {};

    /**
     * Default constructor.
     */
    public constructor() {
        super();
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
        queryList['loginStatus'] = Parameter.LOGIN_STATUS;
        queryList['temporarySessionId'] = Parameter.TEMPORARY_SESSION_ID;
        queryList['temporarySessionIdType'] = Parameter.TEMPORARY_SESSION_ID_TYPE;
        queryList['parameter'] = Parameter.CUSTOM_SESSION_PARAMETER;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['loginStatus'] = this.loginStatus;
        data['temporarySessionId'] = this.temporarySessionId;
        data['temporarySessionIdType'] = this.temporarySessionIdType;
        data['parameter'] = this.parameter;

        return data;
    }

    /**
     * @param lStatus Pass the current users login status here
     *
     * @return MappIntelligenceSession
     */
    public setLoginStatus(lStatus: string): Session {
        this.loginStatus = lStatus;

        return this;
    }

    /**
     * Session parameters always refer to a complete session (visit). If the value for the parameter is transmitted
     * during a visit several times, only the first or last value is evaluated, based on the configuration of the
     * Webtrekk GUI
     *
     * @param i ID of the parameter
     * @param v Value of the parameter
     *
     * @return MappIntelligenceSession
     */
    public setParameter(i: number, v: string): Session {
        this.parameter[i] = v;

        return this;
    }

    /**
     * In order to keep the session and the user during a single session, we offer the possibility to set a temporary
     * session ID that keeps the session together but is not permanently stored on a device.
     *
     * @param tSessionId Pass the temporary session ID here
     *
     * @return MappIntelligenceSession
     */
    public setTemporarySessionId(tSessionId: string): Session {
        this.temporarySessionId = tSessionId;
        this.temporarySessionIdType = this.TEMPORARY_SESSION_ID_TYPE;

        return this;
    }
}
