import {CLIOptions} from "./CLIOptions";
import {CLIFile} from "./CLIFile";

import {Queue} from "../queue/Queue";
import {Messages} from "../Messages";
import {DebugLogger} from "../DebugLogger";

export class CLIFileRotationTransmitter {
    /**
     * Constant for exit status successful.
     */
    private static readonly EXIT_STATUS_SUCCESS: number = 0;
    /**
     * Constant for exit status successful.
     */
    private static readonly EXIT_STATUS_FAIL: number = 1;

    /**
     * Mapp Intelligence config map
     */
    private readonly mic: {[key: string]: any};
    /**
     * The path to your request logging file.
     */
    private readonly filePath: string;
    /**
     * The prefix name for your request logging file.
     */
    private readonly filePrefix: string;
    /**
     * Activates the debug mode.
     */
    private logger: DebugLogger;

    /**
     * @param config Mapp Intelligence config or command line arguments
     * @throws CLIException Mapp Intelligence configuration exception
     */
    public constructor(config: {[key: string]: any}) {
        this.mic = config;
        this.filePath = this.mic[CLIOptions.FILE_PATH];
        this.filePrefix = this.mic[CLIOptions.FILE_PREFIX];
        this.logger = this.mic[CLIOptions.LOGGER];
    }

    /**
     * @param files List of files
     * @return number exit status
     */
    private async sendRequests(files: Array<string>): Promise<number> {
        for (let file of files) {
            const fileLines: Array<string> = await CLIFile.getFileContent(this.filePath + '/' + file);

            const requestQueue = new Queue(this.mic);
            for (let fileLine of fileLines) {
                if (!fileLine.trim()) {
                    continue;
                }

                await requestQueue.add(fileLine);
            }

            if (!(await requestQueue.flush())) {
                return CLIFileRotationTransmitter.EXIT_STATUS_FAIL;
            }

            await CLIFile.deleteFile(this.filePath + '/' + file);
        }

        return CLIFileRotationTransmitter.EXIT_STATUS_SUCCESS;
    }

    /**
     * @return number
     */
    public async send(): Promise<number> {
        if (await CLIFile.checkTemporaryFiles(this.filePath, this.filePrefix)) {
            this.logger.debug(Messages.RENAME_EXPIRED_TEMPORARY_FILE);
        }

        let files;
        try {
            files = await CLIFile.getLogFiles(this.filePath, this.filePrefix);
            if (files.length <= 0) {
                this.logger.info(Messages.REQUEST_LOG_FILES_NOT_FOUND, this.filePath);
                return CLIFileRotationTransmitter.EXIT_STATUS_FAIL;
            }
        } catch (e) {
            this.logger.error(e.message);
            return CLIFileRotationTransmitter.EXIT_STATUS_FAIL;
        }

        return this.sendRequests(files);
    }
}
