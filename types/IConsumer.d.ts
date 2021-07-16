export interface IConsumer {
    sendBatch(batchContent: Array<string>): Promise<boolean>;
}
