import {tmpdir} from 'os';
import {ILogger} from '../ILogger';
import {IConsumer} from '../IConsumer';
import {ConsumerType} from '../consumer/ConsumerType';
import {ConfigProperties} from './ConfigProperties';
import {Properties} from './Properties';
import {DefaultLogger} from './DefaultLogger';

export class Config {
    /**
     * Constant for port 80.
     */
    private readonly PORT_80: string = '80';
    /**
     * Constant for port 443.
     */
    private readonly PORT_443: string = '443';
    /**
     * Constant for the default value of max attempt timeout.
     */
    public static readonly DEFAULT_ATTEMPT_TIMEOUT: number = 100;
    /**
     * Constant for the default value of max batch size.
     */
    public static readonly DEFAULT_MAX_BATCH_SIZE: number = 50;
    /**
     * Constant for the default value of max queue size.
     */
    public static readonly DEFAULT_MAX_QUEUE_SIZE: number = 1000;
    /**
     * Constant for the default value of max lines per file.
     */
    public static readonly DEFAULT_MAX_FILE_LINES: number = 10 * 1000;
    /**
     * Constant for the default value of max file duration (30 min).
     */
    public static readonly DEFAULT_MAX_FILE_DURATION: number = 30 * 60 * 1000;
    /**
     * Constant for the default value of max file size (24 MB).
     */
    public static readonly DEFAULT_MAX_FILE_SIZE: number = 24 * 1024 * 1024;
    /**
     * Constant for max attempt.
     */
    private readonly MAX_ATTEMPT: number = 5;
    /**
     * Constant for max attempt timeout.
     */
    private readonly MAX_ATTEMPT_TIMEOUT: number = 500;

    /**
     * Your Mapp Intelligence track ID provided by Mapp.
     */
    private trackId: string = '';
    /**
     * Your Mapp Intelligence tracking domain.
     */
    private trackDomain: string = '';
    /**
     * The domains you do not want to identify as an external referrer (e.g. your subdomains).
     */
    private domain: Array<string | RegExp> = [];
    /**
     * Deactivate the tracking functionality.
     */
    private deactivate: boolean = false;
    /**
     * Activates the debug mode.
     */
    private logger: ILogger;
    /**
     * The consumer to use for data transfer to Intelligence.
     */
    private consumer: IConsumer;
    /**
     * The consumer type to use for data transfer to Intelligence.
     */
    private consumerType: string = ConsumerType.HTTP_CLIENT;
    /**
     * The path to your request logging file.
     */
    private filePath: string = '';
    /**
     * The prefix name for your request logging file.
     */
    private filePrefix: string = '';
    /**
     * The number of resend attempts.
     */
    private maxAttempt = 1;
    /**
     * The interval of request resend in milliseconds.
     */
    private attemptTimeout: number = Config.DEFAULT_ATTEMPT_TIMEOUT;
    /**
     * The maximum request number per batch.
     */
    private maxBatchSize: number = Config.DEFAULT_MAX_BATCH_SIZE;
    /**
     * The maximum number of requests saved in the queue.
     */
    private maxQueueSize: number = Config.DEFAULT_MAX_QUEUE_SIZE;
    /**
     * The maximum number of maximal lines per file.
     */
    private maxFileLines: number = Config.DEFAULT_MAX_FILE_LINES;
    /**
     * The maximum number of maximal file duration.
     */
    private maxFileDuration: number = Config.DEFAULT_MAX_FILE_DURATION;
    /**
     * The maximum number of maximal file size.
     */
    private maxFileSize: number = Config.DEFAULT_MAX_FILE_SIZE;
    /**
     * Sends every request via SSL.
     */
    private forceSSL: boolean = true;
    /**
     * Specific URL parameter(s) in the default page name.
     */
    private useParamsForDefaultPageName: Array<string> = [];
    /**
     * HTTP user agent string.
     */
    private userAgent: string = '';
    /**
     * Remote address (ip) from the client.
     */
    private remoteAddress: string = '';
    /**
     * HTTP referrer URL.
     */
    private referrerURL: string = '';
    /**
     * HTTP request URL.
     */
    private requestURL: URL;
    /**
     * Map with cookies.
     */
    private cookie: {[key: string]: string} = {};

    /**
     * @param [tId] Enter your Mapp Intelligence track ID provided by Mapp or path to the configuration file (*.json).
     * @param [tDomain] Enter your Mapp Intelligence tracking URL
     */
    public constructor(tId?: string, tDomain?: string) {
        if (arguments.length === 2) {
            this.trackId = (tId) ? tId : this.trackId;
            this.trackDomain = (tDomain) ? tDomain : this.trackDomain;
        }

        if (arguments.length === 1 && typeof arguments[0] === 'string') {
            const prop: ConfigProperties = new ConfigProperties(tId);

            this.setTrackId(prop.getStringProperty(Properties.TRACK_ID, this.trackId))
                .setTrackDomain(prop.getStringProperty(Properties.TRACK_DOMAIN, this.trackDomain))
                .setDeactivate(prop.getBooleanProperty(Properties.DEACTIVATE, false))
                .setDebug(prop.getBooleanProperty(Properties.DEBUG, false))
                .setDomain(prop.getListProperty(Properties.DOMAIN, this.domain))
                .setUseParamsForDefaultPageName(prop.getListProperty(
                    Properties.USE_PARAMS_FOR_DEFAULT_PAGE_NAME,
                    this.useParamsForDefaultPageName
                ))
                .setConsumerType(prop.getConsumerTypeProperty(Properties.CONSUMER_TYPE, this.consumerType))
                .setFilePath(prop.getStringProperty(Properties.FILE_PATH, this.filePath))
                .setFilePrefix(prop.getStringProperty(Properties.FILE_PREFIX, this.filePrefix))
                .setMaxAttempt(prop.getIntegerProperty(Properties.MAX_ATTEMPT, this.maxAttempt))
                .setAttemptTimeout(prop.getIntegerProperty(Properties.ATTEMPT_TIMEOUT, this.attemptTimeout))
                .setMaxBatchSize(prop.getIntegerProperty(Properties.MAX_BATCH_SIZE, this.maxBatchSize))
                .setMaxQueueSize(prop.getIntegerProperty(Properties.MAX_QUEUE_SIZE, this.maxQueueSize))
                .setMaxFileLines(prop.getIntegerProperty(Properties.MAX_FILE_LINES, this.maxFileLines))
                .setMaxFileDuration(prop.getIntegerProperty(Properties.MAX_FILE_DURATION, this.maxFileDuration))
                .setMaxFileSize(prop.getIntegerProperty(Properties.MAX_FILE_SIZE, this.maxFileSize))
                .setForceSSL(prop.getBooleanProperty(Properties.FORCE_SSL, true));
        }
    }

    /**
     * @return String
     */
    private getOwnDomain(): string {
        if (!this.requestURL) {
            return '';
        }

        const serverPort: string = this.requestURL.port;
        if (serverPort === this.PORT_80 || serverPort === this.PORT_443 || !serverPort) {
            return this.requestURL.hostname;
        }

        return this.requestURL.host;
    }

    /**
     * @param str String to decoding
     */
    private static decode(str: string): string {
        if (str) {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return unescape(str);
            }
        }

        return '';
    }

    /**
     * @param value Origin value
     * @param def Default value
     *
     * @return String
     */
    private static getOrDefault(value: any, def: any): any {
        return (value) ? value : def;
    }

    /**
     * @param tId Enter your Mapp Intelligence track ID provided by Mapp
     *
     * @return Config
     */
    public setTrackId(tId: string): Config {
        this.trackId = Config.getOrDefault(tId, this.trackId);
        return this;
    }

    /**
     * @param tDomain Enter your Mapp Intelligence tracking URL
     *
     * @return Config
     */
    public setTrackDomain(tDomain: string): Config {
        this.trackDomain = Config.getOrDefault(tDomain, this.trackDomain);
        return this;
    }

    /**
     * @param ua HTTP user agent string
     *
     * @return Config
     */
    public setUserAgent(ua: string): Config {
        this.userAgent = Config.getOrDefault(Config.decode(ua), this.userAgent);
        return this;
    }

    /**
     * @param ra Remote address (ip) from the client
     *
     * @return Config
     */
    public setRemoteAddress(ra: string): Config {
        this.remoteAddress = Config.getOrDefault(Config.decode(ra), this.remoteAddress);
        return this;
    }

    /**
     * @param refURL HTTP referrer URL
     *
     * @return Config
     */
    public setReferrerURL(refURL: string): Config {
        this.referrerURL = Config.getOrDefault(refURL, this.referrerURL);
        return this;
    }

    /**
     * @param rURL HTTP request URL
     *
     * @return Config
     */
    public setRequestURL(rURL: string): Config {
        try {
            this.requestURL = new URL(rURL);
        } catch (e) {
            // do nothing
        }

        return this;
    }

    /**
     * @param name Name of the cookie
     * @param value Value of the cookie
     *
     * @return Config
     */
    public addCookie(name: string, value: string): Config {
        if (name && value) {
            this.cookie[Config.decode(name)] = Config.decode(value);
        }

        return this;
    }

    /**
     * @param cookies Map with cookies
     *
     * @return Config
     */
    public setCookie(cookies: {[key: string]: string}): Config {
        const c: {[key: string]: string} = Config.getOrDefault(cookies, {});
        for (const key in c) {
            this.addCookie(key, c[key]);

        }
        return this;
    }

    /**
     * @param d Specify the domains you do not want to identify as an external referrer (e.g. your subdomains)
     *
     * @return Config
     */
    public setDomain(d: Array<string | RegExp>): Config {
        this.domain = Config.getOrDefault(d, this.domain);
        return this;
    }

    /**
     * @param d Specify the domains you do not want to identify as an external referrer (e.g. your subdomains)
     *
     * @return Config
     */
    public addDomain(d: string | RegExp): Config {
        if (d) {
            this.domain.push(d);
        }
        return this;
    }

    /**
     * @param l Activates the debug mode. The debug mode sends messages to the custom logger class
     *
     * @return Config
     */
    public setLogger(l: ILogger): Config {
        this.logger = Config.getOrDefault(l, this.logger);
        return this;
    }

    /**
     * @param d
     *
     * @return Config
     */
    public setDebug(d: boolean): Config {
        if (d) {
            this.setLogger(new DefaultLogger());
        }
        return this;
    }

    /**
     * @param d Deactivate the tracking functionality
     *
     * @return Config
     */
    public setDeactivate(d: boolean): Config {
        this.deactivate = d;
        return this;
    }

    /**
     * @param cType Specify the consumer to use for data transfer to Intelligence
     *
     * @return Config
     */
    public setConsumerType(cType: string): Config {
        this.consumerType = Config.getOrDefault(cType, this.consumerType);
        return this;
    }

    /**
     * @param c Specify the consumer to use for data transfer to Intelligence
     *
     * @return Config
     */
    public setConsumer(c: IConsumer): Config {
        this.consumer = Config.getOrDefault(c, this.consumer);
        return this;
    }

    /**
     * @param f Enter the path to your request logging file. This is only relevant when using file consumer
     *
     * @return Config
     */
    public setFilePath(f: string): Config {
        this.filePath = Config.getOrDefault(f, this.filePath);
        return this;
    }

    /**
     * @param f Enter the file prefix for your request logging file. This is only relevant when using file consumer
     *
     * @return Config
     */
    public setFilePrefix(f: string): Config {
        this.filePrefix = Config.getOrDefault(f, this.filePrefix);
        return this;
    }

    /**
     * @param mAttempt Specify the number of resend attempts. After the maxAttempts have been reached, the requests
     *                   will be deleted even if the sending failed
     *
     * @return Config
     */
    public setMaxAttempt(mAttempt: number): Config {
        if (mAttempt >= 1 && mAttempt <= this.MAX_ATTEMPT) {
            this.maxAttempt = mAttempt;
        }

        return this;
    }

    /**
     * @param aTimeout Specify the interval of request resend in milliseconds
     *
     * @return Config
     */
    public setAttemptTimeout(aTimeout: number): Config {
        if (aTimeout >= 1 && aTimeout <= this.MAX_ATTEMPT_TIMEOUT) {
            this.attemptTimeout = aTimeout;
        }

        return this;
    }

    /**
     * @param mBatchSize Specify the maximum request number per batch
     *
     * @return Config
     */
    public setMaxBatchSize(mBatchSize: number): Config {
        this.maxBatchSize = mBatchSize;
        return this;
    }

    /**
     * @param mQueueSize Specify the maximum number of requests saved in the queue
     *
     * @return Config
     */
    public setMaxQueueSize(mQueueSize: number): Config {
        this.maxQueueSize = mQueueSize;
        return this;
    }

    /**
     * @param mFileLines Specify the number of maximal lines per file.
     *
     * @return Config
     */
    public setMaxFileLines(mFileLines: number): Config {
        if (mFileLines >= 1 && mFileLines <= Config.DEFAULT_MAX_FILE_LINES) {
            this.maxFileLines = mFileLines;
        }

        return this;
    }

    /**
     * @param mFileDuration Specify the number of maximal file duration.
     *
     * @return Config
     */
    public setMaxFileDuration(mFileDuration: number): Config {
        if (mFileDuration >= 1 && mFileDuration <= Config.DEFAULT_MAX_FILE_DURATION) {
            this.maxFileDuration = mFileDuration;
        }

        return this;
    }

    /**
     * @param mFileSize Specify the number of maximal file size.
     *
     * @return Config
     */
    public setMaxFileSize(mFileSize: number): Config {
        if (mFileSize >= 1 && mFileSize <= Config.DEFAULT_MAX_FILE_SIZE) {
            this.maxFileSize = mFileSize;
        }

        return this;
    }

    /**
     * @param fSSL Sends every request via SSL
     *
     * @return Config
     */
    public setForceSSL(fSSL: boolean): Config {
        this.forceSSL = fSSL;
        return this;
    }

    /**
     * @param uParamsForDefaultPageName Includes specific URL parameter(s) in the default page name
     *
     * @return Config
     */
    public setUseParamsForDefaultPageName(uParamsForDefaultPageName: Array<string | RegExp>): Config {
        this.useParamsForDefaultPageName = Config.getOrDefault(uParamsForDefaultPageName, this.useParamsForDefaultPageName);
        return this;
    }

    /**
     * @param uParamsForDefaultPageName Includes specific URL parameter(s) in the default page name
     *
     * @return Config
     */
    public addUseParamsForDefaultPageName(uParamsForDefaultPageName: string): Config {
        if (uParamsForDefaultPageName) {
            this.useParamsForDefaultPageName.push(uParamsForDefaultPageName);
        }
        return this;
    }

    /**
     * @return {[key: string]: any}
     */
    public build(): {[key: string]: any} {
        if (this.domain.length === 0) {
            this.domain.push(this.getOwnDomain());
        }

        if (this.consumerType === ConsumerType.FILE) {
            if (!this.filePath) {
                this.filePath = tmpdir();
            }

            if (!this.filePrefix) {
                this.filePrefix = 'MappIntelligenceRequests';
            }

            this.maxBatchSize = 1;
        }

        return {
            trackId: this.trackId,
            trackDomain: this.trackDomain,
            domain: this.domain,
            deactivate: this.deactivate,
            logger: this.logger,
            consumer: this.consumer,
            consumerType: this.consumerType,
            filePath: this.filePath,
            filePrefix: this.filePrefix,
            maxAttempt: this.maxAttempt,
            attemptTimeout: this.attemptTimeout,
            maxBatchSize: this.maxBatchSize,
            maxQueueSize: this.maxQueueSize,
            maxFileLines: this.maxFileLines,
            maxFileDuration: this.maxFileDuration,
            maxFileSize: this.maxFileSize,
            forceSSL: this.forceSSL,
            useParamsForDefaultPageName: this.useParamsForDefaultPageName,
            userAgent: this.userAgent,
            remoteAddress: this.remoteAddress,
            referrerURL: this.referrerURL,
            requestURL: this.requestURL,
            cookie: this.cookie
        };
    }
}
