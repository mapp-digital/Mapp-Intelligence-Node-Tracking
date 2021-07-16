export class ParameterMap {
    /**
     * Tracking data.
     */
    private readonly data: {[key: string]: string} = {};

    /**
     * @param key Add key to map
     * @param value Add value to map
     *
     * @return MappIntelligenceParameterMap
     */
    public add(key: string, value: string): ParameterMap {
        this.data[key] = value;
        return this;
    }

    /**
     * @return Map(String, String)
     */
    public build(): {[key: string]: string} {
        return this.data;
    }
}
