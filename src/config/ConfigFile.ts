/**
 * @param that Property instance
 * @param data Property data
 * @param properties Property names
 * @param type Datatype
 */
function addProperties(that: any, data: any, properties: Array<string>, type: string) {
    for (let prop of properties) {
        if (typeof data[prop] === type) {
            that[prop] = data[prop];
        }
    }
}

class Tracking {
    private static readonly STRING_PROPERTIES: Array<string> = ['trackId', 'trackDomain'];
    private static readonly BOOLEAN_PROPERTIES: Array<string> = ['deactivate', 'debug'];

    private readonly trackId: string;
    private readonly trackDomain: string;
    private readonly deactivate: boolean;
    private readonly debug: boolean;
    private readonly domain: Array<string | RegExp>;
    private readonly useParamsForDefaultPageName: Array<string | RegExp>;

    /**
     * @param data Tracking properties
     */
    public constructor(data: any) {
        addProperties(this, data, Tracking.STRING_PROPERTIES, 'string');
        addProperties(this, data, Tracking.BOOLEAN_PROPERTIES, 'boolean');

        if (data.domain instanceof Array) {
            this.domain = data.domain.filter(function(value: any) {
                return typeof value === 'string' || value instanceof RegExp;
            });
        }

        if (data.useParamsForDefaultPageName instanceof Array) {
            this.useParamsForDefaultPageName = data.useParamsForDefaultPageName.filter(function(value: any) {
                return typeof value === 'string';
            });
        }
    }

    /**
     * @returns {[key: string]: any}
     */
    public build(): {[key: string]: any} {
        return {
            trackId: this.trackId,
            trackDomain: this.trackDomain,
            deactivate: this.deactivate,
            debug: this.debug,
            domain: this.domain,
            useParamsForDefaultPageName: this.useParamsForDefaultPageName
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
