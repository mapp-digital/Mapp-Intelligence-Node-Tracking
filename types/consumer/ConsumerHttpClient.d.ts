import { AConsumer } from './AConsumer';
export declare class ConsumerHttpClient extends AConsumer {
    constructor(config: {
        [key: string]: any;
    });
    sendBatch(batchContent: Array<string>): Promise<boolean>;
}
