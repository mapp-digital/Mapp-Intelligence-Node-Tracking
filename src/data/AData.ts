export abstract class AData {
    /**
     * Filter query parameter.
     */
    protected filterQueryParameter: boolean = true;

    /**
     * @param queryParameters
     */
    private static removeEmptyQueryParameter(queryParameters: { [key: string]: string }): { [key: string]: string } {
        const data: { [key: string]: string } = {};
        for (const entry in queryParameters) {
            const paramValue = queryParameters[entry];
            if (paramValue && paramValue !== 'false' && paramValue !== '0' && paramValue !== '0.0') {
                data[entry] = paramValue;
            }
        }

        return data;
    }

    /**
     * @param params Category or parameter map
     * @param key    Category or parameter query parameter (e.g. cg, cp, uc, ...)
     * @return Map(String, String)
     */
    protected getParameterList(params: { [key: number]: string }, key: string): { [key: string]: string } {
        const data: { [key: string]: string } = {};
        for (const entry in params) {
            data[key + entry] = params[entry];
        }

        return data;
    }

    /**
     * @return Map(String, Object)
     */
    public getData(): { [key: string]: any } {
        return this.toMap();
    }

    /**
     * @return Map(String, String)
     */
    public getQueryParameter(): { [key: string]: string } {
        const queryList: { [key: string]: string } = this.getQueryList();
        const data: { [key: string]: any } = this.getData();
        let queryParameters: { [key: string]: string } = {};

        let property: string;
        let queryParameter: string;
        for (const entry in queryList) {
            property = entry;
            queryParameter = queryList[entry];

            if (typeof data[property] !== 'undefined' && data[property] !== null) {
                if (typeof data[property] === 'object') {
                    const dataMerge: { [key: number]: string } = data[property];
                    Object.assign(queryParameters, this.getParameterList(dataMerge, queryParameter));
                } else {
                    queryParameters[queryParameter] = data[property].toString();
                }
            }
        }

        if (this.filterQueryParameter) {
            queryParameters = AData.removeEmptyQueryParameter(queryParameters);
        }

        return queryParameters;
    }

    /**
     * @return Map(String, String)
     */
    protected abstract getQueryList(): { [key: string]: string };

    /**
     * @return Map(String, Object)
     */
    protected abstract toMap(): { [key: string]: any };
}
