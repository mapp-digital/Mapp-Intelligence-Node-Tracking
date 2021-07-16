export declare class CLICronjob {
    private static readonly EXIT_STATUS_SUCCESS;
    private mic;
    private filePath;
    private filePrefix;
    private deactivate;
    private logger;
    constructor(config: any);
    private initWithConfig;
    private static getOptions;
    private static getMappIntelligenceConfig;
    private static isOptionInvalid;
    private validateOptions;
    run(): Promise<number>;
}
