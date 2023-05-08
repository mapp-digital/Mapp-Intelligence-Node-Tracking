export declare class CLIOptions {
    static readonly TRACK_ID: string;
    static readonly TRACK_DOMAIN: string;
    static readonly CONSUMER_TYPE: string;
    static readonly CONFIG: string;
    static readonly FILE_PATH: string;
    static readonly FILE_PREFIX: string;
    static readonly DEACTIVATE: string;
    static readonly LOGGER: string;
    static readonly LOG_LEVEL: string;
    static readonly HELP: string;
    static readonly DEBUG: string;
    static readonly VERSION: string;
    private static readonly ARG;
    private readonly args;
    private readonly options;
    private readonly validOptions;
    constructor(args: Array<string>);
    private isOptionValid;
    private getUsage;
    parse(): void;
    addOption(short: string, long: string, withArg: boolean, description: string): CLIOptions;
    hasOption(name: string): boolean;
    getOptionValue(name: string): string;
    printCLI(message: string, withExit?: boolean): void;
    printHelp(): void;
}
