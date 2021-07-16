import {EOL} from 'os';
import {promises as fs} from "fs";
import {CLIException} from "./CLIException";

import {Messages} from "../Messages";

export class CLIFile {
    /**
     * Constant for temporary file extension name.
     */
    private static readonly TEMPORARY_FILE_EXTENSION: string = ".tmp";
    /**
     * Constant for logfile extension name.
     */
    private static readonly LOG_FILE_EXTENSION: string = ".log";
    /**
     * Constant for the default value of max file duration (30 min).
     */
    private static readonly DEFAULT_MAX_FILE_DURATION: number = 30 * 60 * 1000;

    /**
     * @return number
     */
    private static getTimestamp(): number {
        return Date.now();
    }

    /**
     * @param fileName Name of the file
     * @return Extract timestamp from file name.
     */
    private static extractTimestamp(fileName: string): number {
        let defaultTimestamp: number = 0;
        const readTimestamp = fileName.replace(/^.+-(\d{13})\..+$/, '$1');

        if (readTimestamp && !isNaN(parseInt(readTimestamp))) {
            defaultTimestamp = parseInt(readTimestamp);
        }

        return defaultTimestamp;
    }

    /**
     * @param fileName File
     * @param filePath Path to the file directory
     *
     * @return Promise<boolean> Rename status
     */
    private static async renameFile(fileName: string, filePath: string): Promise<boolean> {
        const i: number = fileName.lastIndexOf('.');
        const name: string = fileName.substring(0, i);

        const oldFileName: string = `${filePath}/${fileName}`;
        const newFileName: string = `${filePath}/${name}${CLIFile.LOG_FILE_EXTENSION}`;

        try {
            await fs.rename(oldFileName, newFileName);
        } catch (e) {
            // do nothing
        }

        try {
            await fs.stat(oldFileName);

            return false;
        } catch (e) {
            // do nothing
        }

        return true;
    }

    /**
     * @param filePath Path to the file directory
     * @param filePrefix Name of the file prefix
     * @param ext Name of the file extension
     *
     * @return Array<string>
     */
    public static async getFiles(filePath: string, filePrefix: string, ext: string): Promise<Array<string>> {
        try {
            await fs.stat(filePath);

            const f: Array<string> = await fs.readdir(filePath);
            return f.filter(function(value: string) {
                const regex = new RegExp(`^${filePrefix}.*${ext}$`);
                return regex.test(value);
            });
        } catch (e) {
            return [];
        }
    }

    /**
     * @param filePath Path to the file directory
     * @param filePrefix Name of the file prefix
     *
     * @return Promise<boolean>
     */
    public static async checkTemporaryFiles(filePath: string, filePrefix: string): Promise<boolean> {
        let renameStatus: boolean = false;
        const tmpFiles = await CLIFile.getFiles(filePath, filePrefix, CLIFile.TEMPORARY_FILE_EXTENSION);
        if (tmpFiles && tmpFiles.length > 0) {
            for (let tmpFile of tmpFiles) {
                if (CLIFile.getTimestamp() > CLIFile.extractTimestamp(tmpFile) + CLIFile.DEFAULT_MAX_FILE_DURATION) {
                    renameStatus = await CLIFile.renameFile(tmpFile, filePath);
                }
            }
        }

        return renameStatus;
    }

    /**
     * @param filePath Path to the file directory
     * @param filePrefix Name of the file prefix
     *
     * @return Promise<Array<string>>
     * @throws CLIException
     */
    public static async getLogFiles(filePath: string, filePrefix: string): Promise<Array<string>> {
        const files = await CLIFile.getFiles(filePath, filePrefix, CLIFile.LOG_FILE_EXTENSION);
        if (!files || files.length === 0) {
            const msg: string = Messages.REQUEST_LOG_FILES_NOT_FOUND.replace(/\$\{0}/, filePath);
            throw new CLIException(msg);
        }
        else {
            files.sort();
        }

        return files;
    }

    /**
     * @param file File
     * @return Promise<Array<string>>
     */
    public static async getFileContent(file: string): Promise<Array<string>> {
        let content: string = '';

        try {
            content = (await fs.readFile(file)).toString();
        } catch (e) {
            // do nothing
        }

        return content.split(EOL);
    }

    /**
     * @param filename File which should be deleted
     */
    public static async deleteFile(filename: string): Promise<void> {
        try {
            await fs.unlink(filename);
        } catch (e) {
            // do nothing
        }
    }
}
