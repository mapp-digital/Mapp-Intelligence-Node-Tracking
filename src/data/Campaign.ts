import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Campaign extends AData {
    /**
     * Constant for the campaign action.
     */
    private static readonly ACTION: string = 'c';

    /**
     * A campaign ID consists of a media code name and its value, separated by '%3D'.
     */
    private id: string = '';
    /**
     * If you use media codes as a data source for your campaign tracking, entering their name can raise the accuracy
     * of the measurement. Otherwise, accuracy may be reduced by up to 10% if certain firewalls are used, for example.
     */
    private mediaCode: Array<string> = ['mc', 'wt_mc'];
    /**
     * Identifier to send a campaign once per session.
     */
    private oncePerSession: boolean = false;
    /**
     * Campaign parameters always refer to an advertising medium.
     */
    private readonly parameter: {[key: number]: string} = {};

    /**
     * @param [i] A campaign ID consists of a media code name and its value, separated by '%3D'
     */
    public constructor(i?: string) {
        super();

        if (i) {
            this.id = i;
        }
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
        queryList['id'] = Parameter.CAMPAIGN_ID;
        queryList['action'] = Parameter.CAMPAIGN_ACTION;
        queryList['parameter'] = Parameter.CUSTOM_CAMPAIGN_PARAMETER;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['id'] = this.id;
        data['action'] = Campaign.ACTION;
        data['mediaCode'] = this.mediaCode;
        data['oncePerSession'] = this.oncePerSession;
        data['parameter'] = this.parameter;

        return data;
    }

    /**
     * @param i A campaign ID consists of a media code name and its value, separated by '%3D'
     *
     * @return MappIntelligenceCampaign
     */
    public setId(i: string): Campaign {
        this.id = i;

        return this;
    }

    /**
     * @param mc If you use media codes as a data source for your campaign tracking, entering their name can
     *           raise the accuracy of the measurement. Otherwise, accuracy may be reduced by up to 10% if
     *           certain firewalls are used, for example
     * @return MappIntelligenceCampaign
     */
    public setMediaCode(mc: Array<string>): Campaign {
        this.mediaCode = mc;

        return this;
    }

    /**
     * @param ops A campaign ID is tracked only once per session
     *
     * @return MappIntelligenceCampaign
     */
    public setOncePerSession(ops: boolean): Campaign {
        this.oncePerSession = ops;

        return this;
    }

    /**
     * Campaign parameters always refer to an advertising medium.
     *
     * @param i    ID of the parameter
     * @param value Value of the parameter
     *
     * @return MappIntelligenceCampaign
     */
    public setParameter(i: number, value: string): Campaign {
        this.parameter[i] = value;

        return this;
    }
}
