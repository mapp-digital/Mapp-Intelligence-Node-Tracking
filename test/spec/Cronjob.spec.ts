import {promises as fs} from "fs";
import {EOL, tmpdir} from "os";

import {MappIntelligenceUnitUtil, CustomLogger} from './_utils/MappIntelligenceUnitUtil'
import {
    MappIntelligenceConsumerType,
    MappIntelligenceConfig,
    MappIntelligenceCronjob,
    MappIntelligenceHybrid
} from '../../src/MappIntelligence';

import {Messages} from "../../src/Messages";
import {CLIFile} from "../../src/cronjob/CLIFile";

describe('MappIntelligenceCronjob', () => {
    let testDir: string = process.cwd() + '/test';

    let customLogger: CustomLogger;
    let exitCode: any = null;
    let consoleLogMessages: Array<string> = [];
    let filePath: string = testDir + '/resources';
    let filePrefix: string = 'MappIntelligenceRequests';
    let temporaryFileExtension: string = '.tmp';
    let logFileExtension: string = '.log';
    let configFile: string = filePath + '/config_test.json';

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();

        jest.spyOn(process, 'exit').mockImplementation((code?: number): never => {
            exitCode = code;
            throw new Error('process exit call');
        });

        jest.spyOn(console, 'log').mockImplementation((...data: any[]): void => {
            consoleLogMessages.push(...data);
        });
    });

    afterEach(async () => {
        jest.restoreAllMocks();
        exitCode = null;
        consoleLogMessages = [];

        await MappIntelligenceUnitUtil.deleteFiles(filePath, filePrefix, temporaryFileExtension);
        await MappIntelligenceUnitUtil.deleteFiles(filePath, filePrefix, logFileExtension);
    });

    it('null config', async () => {
        expect(() => {
            new MappIntelligenceCronjob(null);
        }).toThrowError(Messages.UNSUPPORTED_OPTION);
    });

    it('config file not found', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '-c', filePath + '/foo/config.json'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_ID);
    });

    it('trackId is required - 1', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '-d', 'q3.webtrekk.net'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_ID);
    });

    it('trackId is required - 2', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--trackDomain', 'q3.webtrekk.net'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_ID);
    });

    it('trackId is required - 3', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--trackDomain=q3.webtrekk.net'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_ID);
    });

    it('trackDomain is required - 1', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '-i', '111111111111111'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_DOMAIN);
    });

    it('trackDomain is required - 2', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--trackId', '111111111111111'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_DOMAIN);
    });

    it('trackDomain is required - 3', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--trackId=111111111111111'
            ]);
        }).toThrowError(Messages.REQUIRED_TRACK_DOMAIN);
    });

    it('default config - 1', async () => {
        const mic = new MappIntelligenceCronjob(new MappIntelligenceConfig('111111111111111', 'q3.webtrekk.net'));

        const options = MappIntelligenceUnitUtil.getProperty(mic, 'mic');
        expect(options['trackId']).toBe('111111111111111');
        expect(options['trackDomain']).toBe('q3.webtrekk.net');
        expect(options['filePath']).toBe(tmpdir());
        expect(options['filePrefix']).toBe('MappIntelligenceRequests');
        expect(options['logger'].logger).toBeUndefined();
        expect(options['consumerType']).toBe(MappIntelligenceConsumerType.HTTP_CLIENT);
        expect(options['deactivate']).toBe(false);
        expect(options['maxBatchSize']).toBe(1000);
        expect(options['maxQueueSize']).toBe(100000);
    });

    it('default config - 2', async () => {
        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net'
        ]);

        const options = MappIntelligenceUnitUtil.getProperty(mic, 'mic');
        expect(options['trackId']).toBe('111111111111111');
        expect(options['trackDomain']).toBe('q3.webtrekk.net');
        expect(options['filePath']).toBe(tmpdir());
        expect(options['filePrefix']).toBe('MappIntelligenceRequests');
        expect(options['logger'].logger).toBeUndefined();
        expect(options['consumerType']).toBe(MappIntelligenceConsumerType.HTTP_CLIENT);
        expect(options['deactivate']).toBe(false);
        expect(options['maxBatchSize']).toBe(1000);
        expect(options['maxQueueSize']).toBe(100000);
    });

    it('config file', async () => {
        const mic = new MappIntelligenceCronjob([
            '-c', filePath + '/config.json',
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', tmpdir(),
            '-p', 'MappIntelligenceRequests'
        ]);

        const options = MappIntelligenceUnitUtil.getProperty(mic, 'mic');
        expect(options['trackId']).toBe('111111111111111');
        expect(options['trackDomain']).toBe('q3.webtrekk.net');
        expect(options['filePath']).toBe(tmpdir());
        expect(options['filePrefix']).toBe('MappIntelligenceRequests');
        expect(options['logger'].logger).toBeUndefined();
        expect(options['consumerType']).toBe(MappIntelligenceConsumerType.HTTP_CLIENT);
        expect(options['deactivate']).toBe(false);
        expect(options['maxBatchSize']).toBe(1000);
        expect(options['maxQueueSize']).toBe(100000);
    });

    it('default log file path and prefix', async () => {
        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net'
        ]);

        const options = MappIntelligenceUnitUtil.getProperty(mic, 'mic');
        expect(options['filePath']).toBe(tmpdir());
        expect(options['filePrefix']).toBe('MappIntelligenceRequests');
    });

    it('own log file path and prefix', async () => {
        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug'
        ]);

        const options = MappIntelligenceUnitUtil.getProperty(mic, 'mic');
        expect(options['filePath']).toBe(filePath);
        expect(options['filePrefix']).toBe('webtrekk');
    });

    it('tracking is deactivated', async () => {
        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug',
            '--deactivate'
        ]);

        expect(await mic.run()).toBe(0);
        expect(consoleLogMessages.join(EOL)).toContain(Messages.TRACKING_IS_DEACTIVATED);
    });

    it('print version', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--version'
            ]);
        }).toThrowError('process exit call');

        expect(consoleLogMessages.join(EOL)).toMatch(/^v.+/);
        expect(exitCode).toBeUndefined();
    });

    it('print help', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--help'
            ]);
        }).toThrowError('process exit call');

        const message = consoleLogMessages.join(EOL);
        expect(message).toContain('Usage:');
        expect(message).toContain(Messages.HELP_SYNTAX);
        expect(message).toContain('Options:');
        expect(exitCode).toBeUndefined();
    });

    it('unsupported option - 1', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--foo', 'bar'
            ]);
        }).toThrowError('process exit call');

        expect(consoleLogMessages.join(EOL)).toContain(Messages.UNSUPPORTED_OPTION + ' (foo=bar)');
        expect(exitCode).toBeUndefined();
    });


    it('unsupported option - 2', async () => {
        expect(() => {
            new MappIntelligenceCronjob([
                '--foo=',
                '-abc', // -a=true -b=true -c=true
                '-a-', // -a=-
                '-a=foo-b=bar', // -a=boo-b
                '-a-123', // -a=-123
                '-a--', // -a=--
                'abc' // unsupported
            ]);
        }).toThrowError('process exit call');

        expect(consoleLogMessages.join(EOL)).toContain(Messages.UNSUPPORTED_OPTION + ' (a=--)');
        expect(exitCode).toBeUndefined();
    });


    it('request log file not found - 1', async () => {
        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug'
        ]);

        expect(await mic.run()).toBe(1);
        expect(consoleLogMessages.join(EOL)).toContain(`Request log files "${filePath}" not found`);
    });

    it('request log file not found - 2', async () => {
        const file: fs.FileHandle = await MappIntelligenceUnitUtil.createFile(`${filePath}/webtrekk-1400000000000${logFileExtension}`);
        await file.close();

        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug'
        ]);

        expect(await mic.run()).toBe(0);

        const message = consoleLogMessages.join(EOL);
        expect(message).toContain('Sent batch requests, current queue size is 0 req.');
        expect(message).toContain('MappIntelligenceQueue is empty');
    });

    it('request log file not found - 3', async () => {
        const file: fs.FileHandle = await MappIntelligenceUnitUtil.createFile(`${filePath}/webtrekk-123abc456def${temporaryFileExtension}`);
        await file.close();

        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug'
        ]);

        expect(await mic.run()).toBe(0);

        const message = consoleLogMessages.join(EOL);
        expect(message).toContain('Sent batch requests, current queue size is 0 req.');
        expect(message).toContain('MappIntelligenceQueue is empty');
    });

    it('file path not exist', async () => {
        const mic = new MappIntelligenceCronjob([
            '-i', '111111111111111',
            '-d', 'q3.webtrekk.net',
            '-f', filePath + '/foo',
            '--debug'
        ]);

        expect(await mic.run()).toBe(1);
        expect(consoleLogMessages.join(EOL)).toContain(`Request log files "${filePath}/foo" not found`);
    });

    it('cannot rename temporary files', async () => {
        const file = await MappIntelligenceUnitUtil.createFile(`${filePath}/webtrekk-100000000000${temporaryFileExtension}`);
        await file.close();

        (CLIFile as any).LOG_FILE_EXTENSION = '.tmp';

        const mic = new MappIntelligenceCronjob([
            '-c', configFile,
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug'
        ]);

        expect(await mic.run()).toBe(0);

        const logFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, 'webtrekk', logFileExtension);
        expect(logFiles.length).toBe(0);

        const temporaryFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, 'webtrekk', temporaryFileExtension);
        expect(temporaryFiles.length).toBe(0);

        (CLIFile as any).LOG_FILE_EXTENSION = '.log';
    });

    it('rename temporary files', async () => {
        for (let i = 0, t = 1400000000000, file: fs.FileHandle; i < 10; i++) {
            t += i * 10;
            file = await MappIntelligenceUnitUtil.createFile(`${filePath}/webtrekk-${t}${temporaryFileExtension}`);
            await file.close();
        }

        const mic = new MappIntelligenceCronjob([
            '-c', configFile,
            '-f', filePath,
            '-p', 'webtrekk',
            '--debug'
        ]);

        expect(await mic.run()).toBe(0);

        const logFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, 'webtrekk', logFileExtension);
        expect(logFiles.length).toBe(0);

        const temporaryFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, 'webtrekk', temporaryFileExtension);
        expect(temporaryFiles.length).toBe(0);

        const message = consoleLogMessages.join(EOL);
        expect(message).toContain(Messages.RENAME_EXPIRED_TEMPORARY_FILE);
    });

    it('request log file not expired', async () => {
        const mic = new MappIntelligenceConfig(configFile);
        mic.setTrackId('111111111111111');
        mic.setFilePath(filePath);
        mic.setFilePrefix(filePrefix);

        const tracking = new MappIntelligenceHybrid(mic);
        for (let i = 0; i < 100; i++) {
            await tracking.track('https://sub.domain.tld/pix?p=400,' + i);
        }

        const cron = new MappIntelligenceCronjob(mic);
        expect(await cron.run()).toBe(1);

        const logFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, filePrefix, logFileExtension);
        expect(logFiles.length).toBe(0);

        const temporaryFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, filePrefix, temporaryFileExtension);
        expect(temporaryFiles.length).toBe(1);
    });

    it('send batch fail', async () => {
        const mic = new MappIntelligenceConfig(configFile);
        mic.setTrackId('111111111111111');
        mic.setFilePath(filePath);
        mic.setFilePrefix(filePrefix);
        mic.setMaxFileLines(25);

        const tracking = new MappIntelligenceHybrid(mic);
        for (let i = 0; i < 101; i++) {
            await tracking.track('https://sub.domain.tld/pix?p=400,' + i);
        }

        const cron = new MappIntelligenceCronjob(mic);
        expect(await cron.run()).toBe(1);

        const logFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, filePrefix, logFileExtension);
        expect(logFiles.length).toBe(4);

        const temporaryFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, filePrefix, temporaryFileExtension);
        expect(temporaryFiles.length).toBe(1);
    });

    it('send batch success', async () => {
        const mic = new MappIntelligenceConfig(configFile);
        mic.setTrackId('123451234512345');
        mic.setFilePath(filePath);
        mic.setFilePrefix(filePrefix);
        mic.setMaxFileLines(25);

        const tracking = new MappIntelligenceHybrid(mic);
        for (let i = 0; i < 101; i++) {
            await tracking.track('https://sub.domain.tld/pix?p=400,' + i);
        }

        const cron = new MappIntelligenceCronjob(mic);
        expect(await cron.run()).toBe(0);

        const logFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, filePrefix, logFileExtension);
        expect(logFiles.length).toBe(0);

        const temporaryFiles: Array<string> = await MappIntelligenceUnitUtil.getFiles(filePath, filePrefix, temporaryFileExtension);
        expect(temporaryFiles.length).toBe(1);
    });
});
