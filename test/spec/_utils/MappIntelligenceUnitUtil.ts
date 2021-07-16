import {promises as fs} from 'fs';
import {ILogger} from '../../../src/ILogger';
import {MappIntelligenceQueue} from '../../../src/MappIntelligence';

export class CustomLogger implements ILogger {
    private messages: Array<string> = [];

    public log(msg: string): void {
        this.messages.push(msg);
    }

    public getMessages(): string {
        return this.messages.join('\n');
    }
}

export class MappIntelligenceUnitUtil {
    /**
     * @returns CustomLogger
     */
    public static getCustomLogger(): CustomLogger {
        return new CustomLogger();
    }

    /**
     * @param instance Mapp Intelligence instance
     * @returns Array<string>
     */
    public static getQueue(instance: any): Array<string> {
        if (instance instanceof MappIntelligenceQueue) {
            return instance.getQueue();
        }

        return instance.queue.getQueue();
    }

    /**
     * @param instance Instance
     * @param prop Name of the property
     * @returns any
     */
    public static getProperty(instance: any, prop: string): any {
        return instance[prop];
    }

    /**
     * @param path Path to file
     * @param prefix Path to file
     * @param extension Path to file
     */
    public static async deleteFiles(path: string, prefix: string, extension: string): Promise<void> {
        try {
            await fs.stat(path);

            const f: Array<string> = await fs.readdir(path);
            const files: Array<string> = f.filter(function(value: string) {
                const regex = new RegExp(`^${prefix}.*${extension}$`);
                return regex.test(value);
            });

            if (files && files.length > 0) {
                for (let file of files) {
                    await fs.unlink(`${path}/${file}`);
                }
            }
        } catch (e) {
            // do nothing
        }
    }

    /**
     * @param path Path to file
     * @param prefix Path to file
     * @param extension Path to file
     * @returns Promise<string>
     */
    public static async getFileContent(path: string, prefix: string, extension: string): Promise<string> {
        try {
            await fs.stat(path);

            const f: Array<string> = await fs.readdir(path);
            const files: Array<string> = f.filter(function(value: string) {
                const regex = new RegExp(`^${prefix}.*${extension}$`);
                return regex.test(value);
            });

            if (files && files.length > 0) {
                const file: fs.FileHandle = await fs.open(`${path}/${files[0]}`, 'a+');
                let content: string = '';

                try {
                    content = (await file.readFile()).toString();
                } catch (e) {
                    // do nothing
                }

                try {
                    await file.close();
                } catch (e) {
                    // do nothing
                }

                return content;
            }
        } catch (e) {
            // do nothing
        }

        return '';
    }

    /**
     * @param path Path to file
     * @param prefix Path to file
     * @param extension Path to file
     * @returns Promise<Array<string>>
     */
    public static async getFiles(path: string, prefix: string, extension: string): Promise<Array<string>> {
        let files: Array<string> = [];
        try {
            await fs.stat(path);

            const f: Array<string> = await fs.readdir(path);
            files = f.filter(function(value: string) {
                const regex = new RegExp(`^${prefix}.*${extension}$`);
                return regex.test(value);
            });
        } catch (e) {
            // do nothing
        }

        return files;
    }

    /**
     * @param filePath Path to file
     * @returns Promise<fs.FileHandle>
     */
    public static async createFile(filePath: string): Promise<fs.FileHandle> {
        return fs.open(filePath, 'a+');
    }
}
