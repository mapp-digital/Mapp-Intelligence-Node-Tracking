import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Session extends AData {
    /**
     * Pass the current users login status here.
     */
    private loginStatus: string = '';
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
        queryList['parameter'] = Parameter.CUSTOM_SESSION_PARAMETER;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['loginStatus'] = this.loginStatus;
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
}
