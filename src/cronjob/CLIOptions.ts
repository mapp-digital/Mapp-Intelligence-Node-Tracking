import {EOL} from "os";

import {CLIArguments} from "./CLIArguments";
import {CLIException} from "./CLIException";
import {CLITable} from "./CLITable";

import {Messages} from "../Messages";
import {DefaultLogger} from "../config/DefaultLogger";

export class CLIOptions {
    public static readonly TRACK_ID: string = "trackId";
    public static readonly TRACK_DOMAIN: string = "trackDomain";
    public static readonly CONSUMER_TYPE: string = "consumerType";
    public static readonly CONFIG: string = "config";
    public static readonly FILE_PATH: string = "filePath";
    public static readonly FILE_PREFIX: string = "filePrefix";
    public static readonly DEACTIVATE: string = "deactivate";
    public static readonly LOGGER: string = "logger";
    public static readonly HELP: string = "help";
    public static readonly DEBUG: string = "debug";
    public static readonly VERSION: string = "version";

    private static readonly ARG: string = " <arg>";

    private readonly args: {[key: string]: string};
    private readonly options: {
        [key: string]: {
            short: string,
            long: string,
            withArg: boolean,
            description: string
        }
    } = {};
    private readonly validOptions: {[key: string]: boolean} = {};

    /**
     * @param args Command line arguments
     */
    public constructor(args: Array<string>) {
        this.args = (new CLIArguments(args)).getArgs();
    }

    /**
     * @param short
     * @param long
     * @return boolean
     */
    private isOptionValid(short: string, long: string): boolean {
        return typeof this.args[short] !== 'undefined' || typeof this.args[long] !== 'undefined';
    }

    /**
     * @return string
     */
    private getUsage(): string {
        let usage = '';
        for(let key in this.options) {
            usage += ` [--${this.options[key].long}${this.options[key].withArg ? CLIOptions.ARG : ''}]`;
        }
        return usage;
    }

    /**
     * @throws CLIException
     */
    public parse(): void {
        for (let key in this.args) {
            if (typeof this.validOptions[key] === 'undefined') {
                const message = `${Messages.UNSUPPORTED_OPTION} (${key}=${this.args[key]})`;
                throw new CLIException(message + EOL);
            }
        }
    }

    /**
     * @param short
     * @param long
     * @param withArg
     * @param description
     */
    public addOption(short: string, long: string, withArg: boolean, description: string): CLIOptions {
        this.options[long] = {
            short: short,
            long: long,
            withArg: withArg,
            description: description
        };

        this.validOptions[long] = true;

        if (short !== '') {
            this.validOptions[short] = true;
        }

        return this;
    }

    /**
     * @param name
     * @return boolean
     */
    public hasOption(name: string): boolean {
        return typeof this.options[name] !== 'undefined' && this.isOptionValid(this.options[name].short, name);
    }

    /**
     * @param name
     * @return string
     */
    public getOptionValue(name: string): string {
        const short = this.options[name]['short'];
        return typeof this.args[short] !== 'undefined' ? this.args[short] : this.args[name];
    }

    /**
     * @param message
     * @param [withExit]
     */
    public printCLI(message: string, withExit: boolean = true): void {
        (new DefaultLogger()).log(message);

        if (withExit) {
            process.exit();
        }
    }

    /**
     *
     */
    public printHelp(): void {
        const table = new CLITable();

        table.addRow('Usage:', 2, '', 16);
        table.addRow('', 1, Messages.HELP_SYNTAX + '' + this.getUsage(), 17);
        table.addEmptyRow();
        table.addRow('', 1, Messages.HELP_HEADER, 17);
        table.addEmptyRow();
        table.addRow('Options:', 2, '', 16);

        for (let key in this.options) {
            let option = this.options[key];
            let line = ' ';

            if (option.short) {
                line += `-${option.short}, `;
            }
            else {
                line += '    ';
            }

            line += `--${option.long}`;

            if (option.withArg) {
                line += CLIOptions.ARG;
            }

            table.addRow(line, 7, option.description, 11);
        }

        table.addRow('', 2, Messages.HELP_FOOTER, 16);

        this.printCLI(table.build());
    }
}
