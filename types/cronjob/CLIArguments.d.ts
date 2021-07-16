export declare class CLIArguments {
    private readonly args;
    constructor(args: Array<string>);
    private setArg;
    private parseArgs;
    getArgs(): {
        [key: string]: string;
    };
}
