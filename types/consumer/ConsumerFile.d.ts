/// <reference types="node" />
import { promises as fs } from 'fs';
import { AConsumer } from './AConsumer';
export declare class ConsumerFile extends AConsumer {
    private static readonly TEMPORARY_FILE_EXTENSION;
    private static readonly LOG_FILE_EXTENSION;
    private readonly filePath;
    private readonly filePrefix;
    private readonly maxFileLines;
    private readonly maxFileDuration;
    private readonly maxFileSize;
    private fileName;
    private timestamp;
    constructor(config: {
        [key: string]: any;
    });
    private static getTimestamp;
    private getNewTempFile;
    private getCurrentFileContent;
    private extractTimestamp;
    private getWriteableFile;
    private renameAndCreateNewTempFile;
    private isFileLimitReached;
    protected close(file: fs.FileHandle): Promise<void>;
    sendBatch(batchContent: Array<string>): Promise<boolean>;
}
