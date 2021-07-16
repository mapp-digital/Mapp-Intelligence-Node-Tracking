export declare class ConfigFile {
    private readonly tracking;
    private readonly consumer;
    constructor(propertyFile: string);
    build(): {
        [key: string]: any;
    };
}
