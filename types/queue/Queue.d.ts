import { Enrichment } from './Enrichment';
export declare class Queue extends Enrichment {
    private readonly maxBatchSize;
    private readonly maxAttempt;
    private readonly attemptTimeout;
    private queue;
    private readonly consumer;
    constructor(config: {
        [key: string]: any;
    });
    private static buildQueryString;
    private static addQueryParameterToMap;
    private static addNotExistingQueryParameterToMap;
    private sendBatch;
    private flushQueue;
    private delay;
    getQueue(): Array<string>;
    addRequestAsString(d: string): string;
    addRequestAsObject(data: {
        [key: string]: string;
    }): string;
    add(data: any): Promise<void>;
    flush(): Promise<boolean>;
}
