export interface IConsumer {
    /**
     * @param batchContent List of tracking requests
     *
     * @return boolean
     */
    sendBatch(batchContent: Array<string>): Promise<boolean>;
}
