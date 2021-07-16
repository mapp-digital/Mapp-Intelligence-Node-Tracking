export declare class CLIFile {
    private static readonly TEMPORARY_FILE_EXTENSION;
    private static readonly LOG_FILE_EXTENSION;
    private static readonly DEFAULT_MAX_FILE_DURATION;
    private static getTimestamp;
    private static extractTimestamp;
    private static renameFile;
    static getFiles(filePath: string, filePrefix: string, ext: string): Promise<Array<string>>;
    static checkTemporaryFiles(filePath: string, filePrefix: string): Promise<boolean>;
    static getLogFiles(filePath: string, filePrefix: string): Promise<Array<string>>;
    static getFileContent(file: string): Promise<Array<string>>;
    static deleteFile(filename: string): Promise<void>;
}
