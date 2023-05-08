/**
 * @param that Property instance
 * @param data Property data
 * @param properties Property names
 * @param type Datatype
 */
function addProperties(that: any, data: any, properties: Array<string>, type: string): void {
    for (let prop of properties) {
        if (!that[prop] && typeof data[prop] === type) {
            that[prop] = data[prop];
        }
    }
}

/**
 * @param that Property instance
 * @param data Property data
 * @param properties Property names
 * @param filter Filter function
 */
function addArrayProperties(that: any, data: any, properties: Array<string>, filter: (value: any) => boolean): void {
    for (let prop of properties) {
        if (data[prop] instanceof Array) {
            that[prop] = data[prop].filter(filter);
        }
    }
}

class Tracking {
    private static readonly STRING_PROPERTIES: Array<string> = ['trackId', 'trackDomain', 'logLevel'];
    private static readonly NUMBER_PROPERTIES: Array<string> = ['logLevel'];
    private static readonly BOOLEAN_PROPERTIES: Array<string> = ['deactivate', 'debug'];
    private static readonly ARRAY_STRING_PROPERTIES: Array<string> = [
        'useParamsForDefaultPageName', 'containsInclude', 'containsExclude'
    ];
    private static readonly ARRAY_STRING_REGEXP_PROPERTIES: Array<string> = [
        'domain', 'matchesInclude', 'matchesExclude'
    ];

    private readonly trackId: string = "";
    private readonly trackDomain: string = "";
    private readonly logLevel: string = "";
    private readonly deactivate: boolean = false;
    private readonly debug: boolean = false;
    private readonly domain: Array<string | RegExp> = [];
    private readonly useParamsForDefaultPageName: Array<string> = [];
    private readonly containsInclude: Array<string> = [];
    private readonly containsExclude: Array<string> = [];
    private readonly matchesInclude: Array<string | RegExp> = [];
    private readonly matchesExclude: Array<string | RegExp> = [];
    private readonly matchesIncludeRegExp: Array<RegExp> = [];
    private readonly matchesExcludeRegExp: Array<RegExp> = [];

    /**
     * @param data Tracking properties
     */
    public constructor(data: any) {
        addProperties(this, data, Tracking.STRING_PROPERTIES, 'string');
        addProperties(this, data, Tracking.NUMBER_PROPERTIES, 'number');
        addProperties(this, data, Tracking.BOOLEAN_PROPERTIES, 'boolean');

        addArrayProperties(this, data, Tracking.ARRAY_STRING_PROPERTIES, (value: any) => {
            return typeof value === 'string';
        });

        addArrayProperties(this, data, Tracking.ARRAY_STRING_REGEXP_PROPERTIES, (value: any) => {
            return typeof value === 'string' || value instanceof RegExp;
        });

        Tracking.convertToRegExp(this.matchesInclude, this.matchesIncludeRegExp);
        Tracking.convertToRegExp(this.matchesExclude, this.matchesExcludeRegExp);
    }

    /**
     * @param stringArray
     * @param regexpArray
     */
    private static convertToRegExp(stringArray: Array<string | RegExp>, regexpArray: Array<RegExp>): void {
        for (let str of stringArray) {
            try {
                let val = str;
                if (typeof val === 'string') {
                    val = new RegExp(val);
                }

                regexpArray.push(val);
            }
            catch (e) {
                // do nothing
            }
        }
    }

    /**
     * @returns {[key: string]: any}
     */
    public build(): {[key: string]: any} {
        return {
            trackId: this.trackId,
            trackDomain: this.trackDomain,
            logLevel: this.logLevel,
            deactivate: this.deactivate,
            debug: this.debug,
            domain: this.domain,
            useParamsForDefaultPageName: this.useParamsForDefaultPageName,
            containsInclude: this.containsInclude,
            containsExclude: this.containsExclude,
            matchesInclude: this.matchesIncludeRegExp,
            matchesExclude: this.matchesExcludeRegExp
        };
    }
}

class Consumer {
    private static readonly STRING_PROPERTIES: Array<string> = [
        'consumerType', 'filePath', 'filePrefix'
    ];
    private static readonly NUMBER_PROPERTIES: Array<string> = [
        'maxAttempt', 'attemptTimeout', 'maxBatchSize', 'maxQueueSize', 'maxFileLines', 'maxFileDuration', 'maxFileSize'
    ];
    private static readonly BOOLEAN_PROPERTIES: Array<string> = [
        'forceSSL'
    ];

    private readonly consumerType: string;
    private readonly filePath: string;
    private readonly filePrefix: string;
    private readonly maxAttempt: number;
    private readonly attemptTimeout: number;
    private readonly maxBatchSize: number;
    private readonly maxQueueSize: number;
    private readonly maxFileLines: number;
    private readonly maxFileDuration: number;
    private readonly maxFileSize: number;
    private readonly forceSSL: boolean;

    /**
     * @param data Consumer properties
     */
    public constructor(data: any) {
        addProperties(this, data, Consumer.STRING_PROPERTIES, 'string');
        addProperties(this, data, Consumer.NUMBER_PROPERTIES, 'number');
        addProperties(this, data, Consumer.BOOLEAN_PROPERTIES, 'boolean');
    }

    /**
     * @returns {[key: string]: any}
     */
    public build(): {[key: string]: any} {
        return {
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
            forceSSL: this.forceSSL
        };
    }
}

export class ConfigFile {
    private readonly tracking: Tracking = new Tracking({});
    private readonly consumer: Consumer = new Consumer({});

    /**
     * @param propertyFile Property file path
     */
    public constructor(propertyFile: string) {
        let properties: any = {};
        try {
            properties = require(propertyFile);

            if (properties.tracking) {
                this.tracking = new Tracking(properties.tracking);
            }

            if (properties.consumer) {
                this.consumer = new Consumer(properties.consumer);
            }
        } catch (e) {
            // do nothing
        }
    }

    /**
     * @returns {[key: string]: any}
     */
    public build(): {[key: string]: any} {
        return {
            tracking: this.tracking.build(),
            consumer: this.consumer.build(),
        }
    }
}
