import {Enrichment} from './Enrichment';
import {IConsumer} from '../IConsumer';
import {ConsumerType} from '../consumer/ConsumerType';
import {ConsumerHttpClient} from '../consumer/ConsumerHttpClient';
import {ConsumerFile} from '../consumer/ConsumerFile';
import {ConsumerForkCurl} from '../consumer/ConsumerForkCurl';
import {Messages} from '../Messages';
import {Parameter} from '../Parameter';

export class Queue extends Enrichment {
    /**
     * The maximum request number per batch.
     */
    private readonly maxBatchSize: number;
    /**
     * The number of resend attempts.
     */
    private readonly maxAttempt: number;
    /**
     * The interval of request resend in milliseconds.
     */
    private readonly attemptTimeout: number;
    /**
     * Mapp Intelligence request queue.
     */
    private queue: Array<string> = [];
    /**
     * Mapp Intelligence consumer.
     */
    private readonly consumer: IConsumer;

    /**
     * @param config Mapp Intelligence configuration
     */
    public constructor(config: {[key: string]: any}) {
        super(config);

        const consumerType: string = config['consumerType'];
        this.maxAttempt = config['maxAttempt'];
        this.attemptTimeout = config['attemptTimeout'];
        this.maxBatchSize = config['maxBatchSize'];
        this.consumer = config['consumer'];

        if (!this.consumer) {
            if (consumerType === ConsumerType.HTTP_CLIENT) {
                this.consumer = new ConsumerHttpClient(config);
            }
            else if (consumerType === ConsumerType.FILE) {
                this.consumer = new ConsumerFile(config);
            }
            else if (consumerType === ConsumerType.FORK_CURL) {
                this.consumer = new ConsumerForkCurl(config);
            }
        }
    }

    /**
     * @param data Tracking request data
     * @return String
     */
    private static buildQueryString(data: {[key: string]: string}): string {
        const queryString: Array<string> = [];
        for (const entry in data) {
            const encodedKey: string = Queue.encode(entry);
            if (encodedKey) {
                queryString.push(`${Queue.encode(entry)}=${Queue.encode(data[entry])}`);
            }
        }

        return queryString.join('&');
    }

    /**
     * @param data Query parameter map
     * @param key Query parameter key
     * @param value Query parameter value
     */
    private static addQueryParameterToMap(data: {[key: string]: string}, key: string, value: string): void {
        if (value) {
            data[key] = value;
        }
    }

    /**
     * @param str Tracking request data
     * @param data Query parameter map
     * @param key Query parameter key
     * @param value Query parameter value
     */
    private static addNotExistingQueryParameterToMap(str: string, data: {[key: string]: string}, key: string, value: string): void {
        if (str.indexOf(key) === -1) {
            Queue.addQueryParameterToMap(data, key, value);
        }
    }

    /**
     * @param batchContent List of tracking requests
     *
     * @return boolean
     */
    private sendBatch(batchContent: Array<string>): Promise<boolean> {
        const consumer = this.consumer;
        return new Promise(function(resolve, reject) {
            if (consumer) {
                consumer.sendBatch(batchContent).then(
                    function(value) {
                        return resolve(value);
                    },
                    function(reason) {
                        return resolve(reason);
                    }
                ).catch(/* istanbul ignore next */ function(reason) {
                    return reject(reason);
                });
            }
            else {
                return reject(false);
            }
        });
    }

    /**
     * @return boolean
     */
    private async flushQueue(): Promise<boolean> {
        let currentQueueSize: number = this.queue.length;
        let wasRequestSuccessful: boolean = true;
        this.logger.debug(Messages.SENT_BATCH_REQUESTS, currentQueueSize);

        while (currentQueueSize > 0 && wasRequestSuccessful) {
            const batchSize: number = Math.min(this.maxBatchSize, currentQueueSize);
            const batchContent: Array<string> = this.queue.slice(0, batchSize);
            this.queue = this.queue.slice(batchSize, currentQueueSize);
            wasRequestSuccessful = await this.sendBatch(batchContent);

            if (!wasRequestSuccessful) {
                this.logger.warn(Messages.BATCH_REQUEST_FAILED);

                this.queue.splice(0, 0, ...batchContent);
            }

            currentQueueSize = this.queue.length;
            this.logger.debug(Messages.CURRENT_QUEUE_STATUS, batchSize, currentQueueSize);
        }

        if (currentQueueSize === 0) {
            this.logger.debug(Messages.QUEUE_IS_EMPTY);
        }

        return wasRequestSuccessful;
    }

    /**
     * @param ms
     */
    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * @return List(String)
     */
    public getQueue(): Array<string> {
        return this.queue;
    }

    /**
     * @param d Tracking request data
     */
    public addRequestAsString(d: string): string {
        let data: string = d;
        if (data) {
            const params: {[key: string]: string} = {};
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.USER_AGENT, this.getUserAgent());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.USER_IP, this.getUserIP());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.CLIENT_HINT_USER_AGENT, this.getClientHintUserAgent());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.CLIENT_HINT_USER_AGENT_FULL_VERSION_LIST, this.getClientHintUserAgentFullVersionList());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.CLIENT_HINT_USER_AGENT_MODEL, this.getClientHintUserAgentModel());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.CLIENT_HINT_USER_AGENT_MOBILE, this.getClientHintUserAgentMobile());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.CLIENT_HINT_USER_AGENT_PLATFORM, this.getClientHintUserAgentPlatform());
            Queue.addNotExistingQueryParameterToMap(data, params, Parameter.CLIENT_HINT_USER_AGENT_PLATFORM_VERSION, this.getClientHintUserAgentPlatformVersion());

            data += ((Object.keys(params).length > 0) ? '&' + Queue.buildQueryString(params) : '');
            this.queue.push(data);

            return data;
        }
    }

    /**
     * @param data Tracking request data
     */
    public addRequestAsObject(data: {[key: string]: string}): string {
        Queue.addQueryParameterToMap(data, Parameter.USER_IP, this.getUserIP());
        Queue.addQueryParameterToMap(data, Parameter.EVER_ID, this.getEverId());
        Queue.addQueryParameterToMap(data, Parameter.USER_AGENT, this.getUserAgent());
        Queue.addQueryParameterToMap(data, Parameter.CLIENT_HINT_USER_AGENT, this.getClientHintUserAgent());
        Queue.addQueryParameterToMap(data, Parameter.CLIENT_HINT_USER_AGENT_FULL_VERSION_LIST, this.getClientHintUserAgentFullVersionList());
        Queue.addQueryParameterToMap(data, Parameter.CLIENT_HINT_USER_AGENT_MODEL, this.getClientHintUserAgentModel());
        Queue.addQueryParameterToMap(data, Parameter.CLIENT_HINT_USER_AGENT_MOBILE, this.getClientHintUserAgentMobile());
        Queue.addQueryParameterToMap(data, Parameter.CLIENT_HINT_USER_AGENT_PLATFORM, this.getClientHintUserAgentPlatform());
        Queue.addQueryParameterToMap(data, Parameter.CLIENT_HINT_USER_AGENT_PLATFORM_VERSION, this.getClientHintUserAgentPlatformVersion());

        const requestURI: string = this.getRequestURI();
        if (requestURI) {
            Queue.addQueryParameterToMap(data, Parameter.PAGE_URL, 'https://' + requestURI);
        }

        const pageName: string = data[Parameter.PAGE_NAME] ? data[Parameter.PAGE_NAME] : this.getDefaultPageName();
        delete data[Parameter.PAGE_NAME];

        const request: string = `wt?p=${this.getMandatoryQueryParameter(pageName)}&${Queue.buildQueryString(data)}`;
        this.queue.push(request);

        return request;
    }

    /**
     * @param data Tracking request data
     */
    public async add(data: any): Promise<void> {
        let request: string = '';
        if (typeof data === 'string') {
            request = this.addRequestAsString(data);
        }
        else if (typeof data === 'object') {
            request = this.addRequestAsObject(data);
        }

        if (request) {
            const currentQueueSize: number = this.queue.length;
            this.logger.debug(Messages.ADD_THE_FOLLOWING_REQUEST_TO_QUEUE, currentQueueSize, request);

            if (currentQueueSize >= this.maxBatchSize) {
                await this.flush();
            }
        }
    }

    /**
     * @return boolean
     */
    public async flush(): Promise<boolean> {
        let currentAttempt: number = 0;
        let wasRequestSuccessful: boolean = false;

        try {
            while (!wasRequestSuccessful && currentAttempt < this.maxAttempt) {
                wasRequestSuccessful = await this.flushQueue();
                currentAttempt++;

                if (!wasRequestSuccessful) {
                    try {
                        await this.delay(this.attemptTimeout);
                    } catch (e) {
                        /* istanbul ignore next */
                        this.logger.error(Messages.GENERIC_ERROR, e.name, e.message);
                    }
                }
            }
        } catch (e) {
            this.logger.error(Messages.GENERIC_ERROR, e.name, e.message);
        }

        return wasRequestSuccessful;
    }
}
