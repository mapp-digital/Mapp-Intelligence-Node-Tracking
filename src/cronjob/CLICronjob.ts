import {tmpdir} from 'os';

import {CLIOptions} from './CLIOptions';
import {CLIException} from './CLIException';
import {CLIFileRotationTransmitter} from './CLIFileRotationTransmitter';

import {ILogger} from '../ILogger';
import {Config} from '../config/Config';
import {ConsumerType} from '../consumer/ConsumerType';
import {Tracking} from '../core/Tracking';

import {DebugLogger} from '../DebugLogger';
import {Messages} from '../Messages';

export class CLICronjob {
    /**
     * Constant for exit status successful.
     */
    private static readonly EXIT_STATUS_SUCCESS: number = 0;

    /**
     * Mapp Intelligence config map
     */
    private mic: {[key: string]: any};
    /**
     * The path to your request logging file.
     */
    private filePath: string;
    /**
     * The prefix name for your request logging file.
     */
    private filePrefix: string;
    /**
     * Deactivate the tracking functionality.
     */
    private deactivate: boolean;
    /**
     * Activates the debug mode.
     */
    private logger: DebugLogger;

    /**
     * @param config Mapp Intelligence config or command line arguments
     * @throws CLIException Mapp Intelligence configuration exception
     */
    public constructor(config: any) {
        if (config && typeof config.build === 'function') {
            this.initWithConfig(config.build());
        }
        else if (config instanceof Array) {
            this.initWithConfig(CLICronjob.getMappIntelligenceConfig(config));
        }
        else {
            throw new CLIException(Messages.UNSUPPORTED_OPTION);
        }
    }

    /**
     * @param config Mapp Intelligence config map
     * @throws CLIException Mapp Intelligence configuration exception
     */
    private initWithConfig(config: {[key: string]: any}) {
        this.mic = config;

        this.validateOptions();

        this.filePath = this.mic[CLIOptions.FILE_PATH];
        this.filePrefix = this.mic[CLIOptions.FILE_PREFIX];
        this.deactivate = this.mic[CLIOptions.DEACTIVATE];

        const l: ILogger = this.mic[CLIOptions.LOGGER];
        this.logger = new DebugLogger(l, config['logLevel']);

        this.mic[CLIOptions.CONSUMER_TYPE] = ConsumerType.HTTP_CLIENT;
        this.mic[CLIOptions.LOGGER] = this.logger;
        this.mic[CLIOptions.DEACTIVATE] = this.deactivate;
        this.mic['maxBatchSize'] = 1000;
        this.mic['maxQueueSize'] = 100000;
    }

    /**
     * @param args Command line arguments
     * @return CLIOptions
     */
    private static getOptions(args: Array<string>): CLIOptions {
        const options = new CLIOptions(args);

        options.addOption('i', CLIOptions.TRACK_ID, true, Messages.OPTION_TRACK_ID)
            .addOption('d', CLIOptions.TRACK_DOMAIN, true, Messages.OPTION_TRACK_DOMAIN)
            .addOption('c', CLIOptions.CONFIG, true, Messages.OPTION_CONFIG)

            .addOption('f', CLIOptions.FILE_PATH, true, Messages.OPTION_FILE_PATH)
            .addOption('p', CLIOptions.FILE_PREFIX, true, Messages.OPTION_FILE_PREFIX)
            .addOption('l', CLIOptions.LOG_LEVEL, true, Messages.OPTION_LOG_LEVEL)

            .addOption('', CLIOptions.DEACTIVATE, false, Messages.OPTION_DEACTIVATE)
            .addOption('', CLIOptions.HELP, false, Messages.OPTION_HELP)
            .addOption('', CLIOptions.DEBUG, false, Messages.OPTION_DEBUG)
            .addOption('', CLIOptions.VERSION, false, Messages.OPTION_VERSION);

        return options;
    }

    /**
     * @param args Command line arguments
     * @throws CLIException Mapp Intelligence configuration exception
     */
    private static getMappIntelligenceConfig(args: Array<string>): {[key: string]: any} {
        let mappConfig = new Config();
        const options: CLIOptions = CLICronjob.getOptions(args);

        try {
            options.parse();
        } catch(e) {
            options.printCLI(e.message, false);
            options.printHelp();
        }

        try {
            if (options.hasOption(CLIOptions.HELP)) {
                options.printHelp();
            }

            if (options.hasOption(CLIOptions.VERSION)) {
                options.printCLI('v' + Tracking.VERSION);
            }

            if (options.hasOption(CLIOptions.CONFIG)) {
                mappConfig = new Config(options.getOptionValue(CLIOptions.CONFIG));
            }

            if (options.hasOption(CLIOptions.LOG_LEVEL)) {
                mappConfig.setLogLevel(options.getOptionValue(CLIOptions.LOG_LEVEL));
            }

            if (options.hasOption(CLIOptions.DEBUG)) {
                mappConfig.setDebug(true);
            }

            if (options.hasOption(CLIOptions.DEACTIVATE)) {
                mappConfig.setDeactivate(true);
            }

            if (options.hasOption(CLIOptions.TRACK_ID)) {
                mappConfig.setTrackId(options.getOptionValue(CLIOptions.TRACK_ID));
            }

            if (options.hasOption(CLIOptions.TRACK_DOMAIN)) {
                mappConfig.setTrackDomain(options.getOptionValue(CLIOptions.TRACK_DOMAIN));
            }

            if (options.hasOption(CLIOptions.FILE_PATH)) {
                mappConfig.setFilePath(options.getOptionValue(CLIOptions.FILE_PATH));
            }

            if (options.hasOption(CLIOptions.FILE_PREFIX)) {
                mappConfig.setFilePrefix(options.getOptionValue(CLIOptions.FILE_PREFIX));
            }
        } catch(e) {
            throw new CLIException(e.message);
        }

        return mappConfig.build();
    }

    /**
     * @param o Object
     * @return boolean
     */
    private static isOptionInvalid(o: string): boolean {
        return o === '' || o === null;
    }

    /**
     * @throws CLIException Mapp Intelligence configuration exception
     */
    private validateOptions(): void {
        if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.TRACK_ID])) {
            throw new CLIException(Messages.REQUIRED_TRACK_ID);
        }

        if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.TRACK_DOMAIN])) {
            throw new CLIException(Messages.REQUIRED_TRACK_DOMAIN);
        }

        if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.FILE_PATH])) {
            this.mic[CLIOptions.FILE_PATH] = tmpdir();
        }

        if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.FILE_PREFIX])) {
            this.mic[CLIOptions.FILE_PREFIX] = 'MappIntelligenceRequests';
        }
    }

    /**
     * @return exit status
     */
    public async run(): Promise<number> {
        if (this.deactivate) {
            this.logger.info(Messages.TRACKING_IS_DEACTIVATED);
            return CLICronjob.EXIT_STATUS_SUCCESS;
        }

        const fileTransmitter: CLIFileRotationTransmitter = new CLIFileRotationTransmitter(this.mic);
        return fileTransmitter.send();
    }
}
