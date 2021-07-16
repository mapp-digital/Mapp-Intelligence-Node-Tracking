import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Action extends AData {
    /**
     * Unique identification of the action.
     */
    private name: string = '';
    /**
     * You can use parameters to enrich analytical data with your own website-specific information and/or metrics.
     * Observe the syntax guidelines when defining parameters.
     */
    private readonly parameter: {[key: number]: string} = {};
    /**
     * Needed when website goals are based on events.
     */
    private readonly goal: {[key: number]: string} = {};

    /**
     * @param [n] Unique identification of the action
     */
    public constructor(n?: string) {
        super();

        if (n) {
            this.name = n;
        }
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
        queryList['name'] = Parameter.ACTION_NAME;
        queryList['parameter'] = Parameter.CUSTOM_ACTION_PARAMETER;
        queryList['goal'] = Parameter.CUSTOM_PRODUCT_PARAMETER;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['name'] = this.name;
        data['parameter'] = this.parameter;
        data['goal'] = this.goal;

        return data;
    }

    /**
     * @param n Unique identification of the action
     *
     * @return MappIntelligenceAction
     */
    public setName(n: string): Action {
        this.name = n;

        return this;
    }

    /**
     * You can use parameters to enrich analytical data with your own website-specific information and/or metrics.
     * Observe the syntax guidelines when defining parameters.
     *
     * @param id    ID of the parameter
     * @param value Value of the parameter
     *
     * @return MappIntelligenceAction
     */
    public setParameter(id: number, value: string): Action {
        this.parameter[id] = value;

        return this;
    }

    /**
     * Needed when website goals are based on events.
     *
     * @param id    ID of the parameter
     * @param value Value of the parameter
     *
     * @return MappIntelligenceAction
     */
    public setGoal(id: number, value: string): Action {
        this.goal[id] = value;

        return this;
    }
}
