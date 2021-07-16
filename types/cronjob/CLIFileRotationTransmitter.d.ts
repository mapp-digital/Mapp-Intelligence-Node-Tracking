export declare class CLIFileRotationTransmitter {
    private static readonly EXIT_STATUS_SUCCESS;
    private static readonly EXIT_STATUS_FAIL;
    private readonly mic;
    private readonly filePath;
    private readonly filePrefix;
    private logger;
    constructor(config: {
        [key: string]: any;
    });
    private sendRequests;
    send(): Promise<number>;
}
