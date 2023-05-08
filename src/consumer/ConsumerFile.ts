import {EOL} from 'os';
import {promises as fs} from 'fs';
import {AConsumer} from './AConsumer';
import {Messages} from '../Messages';

export class ConsumerFile extends AConsumer {
    private static readonly TEMPORARY_FILE_EXTENSION: string = '.tmp';
    private static readonly LOG_FILE_EXTENSION: string = '.log';

    /**
     * The path to your request logging file.
     */
    private readonly filePath: string;
    /**
     * The prefix name for your request logging file.
     */
    private readonly filePrefix: string;
    /**
     * The maximum number of maximal lines per file.
     */
    private readonly maxFileLines: number;
    /**
     * The maximum number of maximal file duration.
     */
    private readonly maxFileDuration: number;
    /**
     * The maximum number of maximal file size.
     */
    private readonly maxFileSize: number;
    /**
     * File name.
     */
    private fileName: string = '';
    /**
     * Timestamp for file creation.
     */
    private timestamp: number;

    /**
     * @param config Mapp Intelligence configuration
     */
    public constructor(config: {[key: string]: any}) {
        super(config);

        this.filePath = config['filePath'];
        this.filePrefix = config['filePrefix'];
        this.maxFileLines = config['maxFileLines'] ? config['maxFileLines'] : ConsumerFile.DEFAULT_MAX_FILE_LINES;
        this.maxFileDuration = config['maxFileDuration'] ? config['maxFileDuration'] : ConsumerFile.DEFAULT_MAX_FILE_DURATION;
        this.maxFileSize = config['maxFileSize'] ? config['maxFileSize'] : ConsumerFile.DEFAULT_MAX_FILE_SIZE;
    }

    /**
     * @return number
     */
    private static getTimestamp(): number {
        return Date.now();
    }

    /**
     * Create new temporary file.
     */
    private async getNewTempFile(): Promise<fs.FileHandle> {
        this.timestamp = ConsumerFile.getTimestamp();

        const newTempFileName: string = `${this.filePrefix}-${this.timestamp}${ConsumerFile.TEMPORARY_FILE_EXTENSION}`;
        const newTempFilePath: string = `${this.filePath}/${newTempFileName}`;
        try {
            let message: string = Messages.USE_EXISTING_LOG_FILE;
            try {
                await fs.stat(newTempFilePath);
            } catch (e) {
                message = Messages.CREATE_NEW_LOG_FILE;
            }

            this.logger.debug(
                message,
                `${this.filePrefix}-${this.timestamp}${ConsumerFile.TEMPORARY_FILE_EXTENSION}`,
                this.filePath
            );

            this.fileName = newTempFileName;
            return await fs.open(newTempFilePath, 'a+');
        } catch (e) {
            this.logger.error(Messages.GENERIC_ERROR, e.name, e.message);
        }

        return null;
    }

    /**
     * @return Content of current file.
     */
    private async getCurrentFileContent(file: fs.FileHandle): Promise<string> {
        let content: string = '';

        try {
            content = (await file.readFile()).toString();
        } catch (e) {
            /* istanbul ignore next */
            this.logger.error(Messages.GENERIC_ERROR, e.name, e.message);
        }

        return content;
    }

    /**
     * @return Extract timestamp from file name.
     */
    private extractTimestamp(): number {
        let defaultTimestamp: number = 0;
        const readTimestamp = this.fileName.replace(/^.+-(\d{13})\..+$/, '$1');

        if (readTimestamp && !isNaN(parseInt(readTimestamp))) {
            defaultTimestamp = parseInt(readTimestamp);
        }

        return defaultTimestamp;
    }

    /**
     * Search for writeable file.
     */
    private async getWriteableFile(): Promise<fs.FileHandle> {
        const that = this;
        let file = null;

        try {
            await fs.stat(this.filePath);

            const f: Array<string> = await fs.readdir(this.filePath);
            const files: Array<string> = f.filter(function(value: string) {
                const regex = new RegExp(`^${that.filePrefix}.*${ConsumerFile.TEMPORARY_FILE_EXTENSION}$`);
                return regex.test(value);
            });

            if (!files || files.length <= 0) {
                file = await this.getNewTempFile();
            }
            else {
                this.fileName = files[0];
                file = await fs.open(`${this.filePath}/${this.fileName}`, 'a+');
                this.timestamp = this.extractTimestamp();
                this.logger.debug(Messages.USE_EXISTING_LOG_FILE, files[0], this.filePath);
            }
        } catch (e) {
            this.logger.error(Messages.DIRECTORY_NOT_EXIST, this.filePath);
        }

        return file;
    }

    /**
     * Rename temporary file (.tmp to .log).
     */
    private async renameAndCreateNewTempFile(file: fs.FileHandle): Promise<fs.FileHandle> {
        const i: number = this.fileName.lastIndexOf('.');
        const name: string = this.fileName.substring(0, i);

        let fileHandle;
        const oldFileName: string = `${this.filePath}/${this.fileName}`;
        const newFileName: string = `${this.filePath}/${name}${ConsumerFile.LOG_FILE_EXTENSION}`;

        try {
            await this.close(file);
            await fs.rename(oldFileName, newFileName);
        } catch (e) {
            // do nothing
        }

        try {
            await fs.stat(oldFileName);

            this.logger.error(Messages.CANNOT_RENAME_TEMPORARY_FILE);
            fileHandle = await this.getNewTempFile();
        } catch (e) {
            fileHandle = await this.getWriteableFile();
        }

        return fileHandle;
    }

    /**
     * @param file File handle
     * @param batchContentSize Batch content size
     * @return Is file larger than 24MB or more than 10k lines or is older than 30min.
     */
    private async isFileLimitReached(file: fs.FileHandle, batchContentSize: number): Promise<boolean> {
        const fileContent = await this.getCurrentFileContent(file);
        const fileLines = fileContent.split(EOL).length;

        const fileLinesReached = fileLines + batchContentSize - 1 > this.maxFileLines;
        const fileDurationReached = ConsumerFile.getTimestamp() > this.timestamp + this.maxFileDuration;
        const fileSizeReached = fileContent.length > this.maxFileSize;

        return fileLinesReached || fileDurationReached || fileSizeReached;
    }

    /**
     * @param file File handle
     * @return Promise<void>
     */
    protected async close(file: fs.FileHandle): Promise<void> {
        try {
            await file.close();
        } catch (e) {
            /* istanbul ignore next */
            this.logger.error(Messages.GENERIC_ERROR, e.name, e.message);
        }
    }

    /**
     * @param batchContent List of tracking requests
     * @return boolean
     */
    public sendBatch(batchContent: Array<string>): Promise<boolean> {
        const that = this;
        return new Promise(async function(resolve) {
            let file: fs.FileHandle = await that.getWriteableFile();

            if (!file) {
                return resolve(false);
            }

            let payload: string = that.verifyPayload(batchContent);
            if (!payload) {
                await that.close(file);
                return resolve(false);
            }
            payload += EOL;

            const bcs: number = batchContent.length;
            if (await that.isFileLimitReached(file, bcs)) {
                file = await that.renameAndCreateNewTempFile(file);
            }

            try {
                await file.appendFile(payload);

                const currentBatchSize: number = batchContent.length;
                that.logger.debug(Messages.WRITE_BATCH_DATA, that.fileName, currentBatchSize);
            } catch (e) {
                /* istanbul ignore next */
                that.logger.error(Messages.GENERIC_ERROR, e.name, e.message);
            }

            await that.close(file);

            return resolve(true);
        });
    }
}
