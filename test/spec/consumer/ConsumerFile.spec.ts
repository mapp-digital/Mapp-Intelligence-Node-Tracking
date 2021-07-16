import {EOL} from 'os';
import {promises as fs} from 'fs';
import {MappIntelligenceUnitUtil, CustomLogger} from '../_utils/MappIntelligenceUnitUtil'
import {MappIntelligenceConfig} from '../../../src/MappIntelligence';
import {ConsumerFile} from '../../../src/consumer/ConsumerFile';

function getTimestamp(): number {
    return Date.now();
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('ConsumerFile', () => {
    let testDir: string = process.cwd() + '/test';

    let customLogger: CustomLogger;
    let contentMaxBatchSize: Array<string> = [];
    let maxPayloadSize: Array<string> = [];
    let tempFilePath: string = testDir + '/resources';
    let tempFilePathFail: string = testDir + '/resources/foo';
    let tempFilePrefix: string = 'mapp_intelligence_test';

    beforeAll(() => {
        let longText: string = '';
        longText += 'Lorem%20ipsum%20dolor%20sit%20amet%2C%20consetetur%20sadipscing%20elitr%2C%20sed%20diam%20';
        longText += 'nonumy%20eirmod%20tempor%20invidunt%20ut%20labore%20et%20dolore%20magna%20aliquyam%20erat%';
        longText += '2C%20sed%20diam%20voluptua.%20At%20vero%20eos%20et%20accusam%20et%20justo%20duo%20dolores%';
        longText += '20et%20ea%20rebum.%20Stet%20clita%20kasd%20gubergren%2C%20no%20sea%20takimata%20sanctus%20';
        longText += 'est%20Lorem%20ipsum%20dolor%20sit%20amet.%20Lorem%20ipsum%20dolor%20sit%20amet%2C%20conset';
        longText += 'etur%20sadipscing%20elitr%2C%20sed%20diam%20nonumy%20eirmod%20tempor%20invidunt%20ut%20lab';
        longText += 'ore%20et%20dolore%20magna%20aliquyam%20erat%2C%20sed%20diam%20voluptua.%20At%20vero%20eos%';
        longText += '20et%20accusam%20et%20justo%20duo%20dolores%20et%20ea%20rebum.%20Stet%20clita%20kasd%20gub';
        longText += 'ergren%2C%20no%20sea%20takimata%20sanctus%20est%20Lorem%20ipsum%20dolor%20sit%20amet.%20Lo';
        longText += 'rem%20ipsum%20dolor%20sit%20amet%2C%20consetetur%20sadipscing%20elitr%2C%20sed%20diam%20no';
        longText += 'numy%20eirmod%20tempor%20invidunt%20ut%20labore%20et%20dolore%20magna%20aliquyam%20erat%2C';
        longText += '%20sed%20diam%20voluptua.%20At%20vero%20eos%20et%20accusam%20et%20justo%20duo%20dolores%20';
        longText += 'et%20ea%20rebum.%20Stet%20clita%20kasd%20gubergren%2C%20no%20sea%20takimata%20sanctus%20es';
        longText += 't%20Lorem%20ipsum%20dolor%20sit%20amet.%20Duis%20autem%20vel%20eum%20iriure%20dolor%20in%2';
        longText += '0hendrerit%20in%20vulputate%20velit%20esse%20molestie%20consequat%2C%20vel%20illum%20dolor';
        longText += 'e%20eu%20feugiat%20nulla%20facilisis%20at%20vero%20eros%20et%20accumsan%20et%20iusto%20odi';
        longText += 'o%20dignissim%20qui%20blandit%20praesent%20luptatum%20zzril%20delenit%20augue%20duis%20dol';
        longText += 'ore%20te%20feugait%20nulla%20facilisi.%20Lorem%20ipsum%20dolor%20sit%20amet%2C%20consectet';
        longText += 'uer%20adipiscing%20elit%2C%20sed%20diam%20nonummy%20nibh%20euismod%20tincidunt%20ut%20laor';
        longText += 'eet%20dolore%20magna%20aliquam%20erat%20volutpat.%20Ut%20wisi%20enim%20ad%20minim%20veniam';
        longText += '%2C%20quis%20nostrud%20exerci%20tation%20ullamcorper%20suscipit%20lobortis%20nisl%20ut%20a';
        longText += 'liquip%20ex%20ea%20commodo%20consequat.%20Duis%20autem%20vel%20eum%20iriure%20dolor%20in%2';
        longText += '0hendrerit%20in%20vulputate%20velit%20esse%20molestie%20consequat%2C%20vel%20illum%20dolor';
        longText += 'e%20eu%20feugiat%20nulla%20facilisis%20at%20vero%20eros%20et%20accumsan%20et%20iusto%20odi';
        longText += 'o%20dignissim%20qui%20blandit%20praesent%20luptatum%20zzril%20delenit%20augue%20duis%20dol';
        longText += 'ore%20te%20feugait%20nulla%20facilisi.%20Nam%20liber%20tempor%20cum%20soluta%20nobis%20ele';
        longText += 'ifend%20option%20congue%20nihil%20imperdiet%20doming%20id%20quod%20mazim%20placerat%20face';
        longText += 'r%20possim%20assum.%20Lorem%20ipsum%20dolor%20sit%20amet%2C%20consectetuer%20adipiscing%20';
        longText += 'elit%2C%20sed%20diam%20nonummy%20nibh%20euismod%20tincidunt%20ut%20laoreet%20dolore%20magn';
        longText += 'a%20aliquam%20erat%20volutpat.%20Ut%20wisi%20enim%20ad%20minim%20veniam%2C%20quis%20nostru';
        longText += 'd%20exerci%20tation%20ullamcorper%20suscipit%20lobortis%20nisl%20ut%20aliquip%20ex%20ea%20';
        longText += 'commodo%20consequat.%20Duis%20autem%20vel%20eum%20iriure%20dolor%20in%20hendrerit%20in%20v';
        longText += 'ulputate%20velit%20esse%20molestie%20consequat%2C%20vel%20illum%20dolore%20eu%20feugiat%20';
        longText += 'nulla%20facilisis.%20At%20vero%20eos%20et%20accusam%20et%20justo%20duo%20dolores%20et%20ea';
        longText += '%20rebum.%20Stet%20clita%20kasd%20gubergren%2C%20no%20sea%20takimata%20sanctus%20est%20Lor';
        longText += 'em%20ipsum%20dolor%20sit%20amet.%20Lorem%20ipsum%20dolor%20sit%20amet%2C%20consetetur%20sa';
        longText += 'dipscing%20elitr%2C%20sed%20diam%20nonumy%20eirmod%20tempor%20invidunt%20ut%20labore%20et%';
        longText += '20dolore%20magna%20aliquyam%20erat%2C%20sed%20diam%20voluptua.%20At%20vero%20eos%20et%20ac';
        longText += 'cusam%20et%20justo%20duo%20dolores%20et%20ea%20rebum.%20Stet%20clita%20kasd%20gubergren%2C';
        longText += '%20no%20sea%20takimata%20sanctus%20est%20Lorem%20ipsum%20dolor%20sit%20amet.%20Lorem%20ips';
        longText += 'um%20dolor%20sit%20amet%2C%20consetetur%20sadipscing%20elitr%2C%20At%20accusam%20aliquyam%';
        longText += '20diam%20diam%20dolore%20dolores%20duo%20eirmod%20eos%20erat%2C%20et%20nonumy%20sed%20temp';
        longText += 'or%20et%20et%20invidunt%20justo%20labore%20Stet%20clita%20ea%20et%20gubergren%2C%20kasd%20';
        longText += 'magna%20no%20rebum.%20sanctus%20sea%20sed%20takimata%20ut%20vero%20voluptua.%20est%20Lorem';
        longText += '%20ipsum%20dolor%20sit%20amet.%20Lorem%20ipsum%20dolor%20sit%20ame.';

        for (let i = 0; i < 11 * 1000; i++) {
            contentMaxBatchSize.push('wt?p=300,0');
        }

        for (let i = 0; i < 9 * 1000; i++) {
            maxPayloadSize.push('wt?p=300,0&cp1=' + longText);
        }
    });

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();
    });

    afterEach(async () => {
        await MappIntelligenceUnitUtil.deleteFiles(tempFilePath, tempFilePrefix, '.tmp');
        await MappIntelligenceUnitUtil.deleteFiles(tempFilePath, tempFilePrefix, '.log');
    });

    it('new consumer file', async () => {
        const consumer = new ConsumerFile({
            filePath: tempFilePathFail,
            filePrefix: tempFilePrefix,
            logger: customLogger
        });

        expect(await consumer.sendBatch([])).toBeFalsy();
        expect(customLogger.getMessages()).toContain('Directory not exist');
    });

    it('failed to send batch', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePathFail)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0'];
        expect(await consumer.sendBatch(data)).toBeFalsy();
        expect(customLogger.getMessages()).toContain('Directory not exist');
    });

    it('max batch size', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        expect(await consumer.sendBatch(contentMaxBatchSize)).toBeFalsy();
        expect(customLogger.getMessages()).toContain('Batch size is larger than 10000 req. (11000 req.)');
    });

    it('max payload size', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        expect(await consumer.sendBatch(maxPayloadSize)).toBeFalsy();
        expect(customLogger.getMessages()).toContain('Payload size is larger than 24MB (34.7MB)');
    });

    // it('closed file', async () => {
    //     await MappIntelligenceUnitUtil.createFile(`${tempFilePath}/${tempFilePrefix}-${getTimestamp()}.tmp`);
    //
    //     const mic = (new MappIntelligenceConfig())
    //         .setFilePath(tempFilePath)
    //         .setFilePrefix(tempFilePrefix)
    //         .setLogger(customLogger);
    //     const consumer = new ConsumerFile(mic.build());
    //
    //     await consumer.sendBatch([]);
    //
    //     try {
    //         const fileHandle: fs.FileHandle = MappIntelligenceUnitUtil.getFileHandle(consumer);
    //         await fileHandle.close();
    //     } catch (e) {
    //         // do nothing
    //     }
    //
    //     const data = ['wt?p=300,0'];
    //     expect(await consumer.sendBatch(data)).toBeTruthy();
    //     expect(customLogger.getMessages().search(/error\s\(.+\)/ig)).toBeGreaterThan(-1);
    //     expect(customLogger.getMessages().search(/error\s\(.+\)/ig)).toBeGreaterThan(-1);
    // });

    it('write batch request in new file', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0'];
        expect(await consumer.sendBatch(data)).toBeTruthy();

        const message = customLogger.getMessages();
        expect(message).toContain('Create new file mapp_intelligence_test');
        expect(message).toContain('Write batch data in mapp_intelligence_test');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toBe('wt?p=300,0' + EOL);
    });

    it('write batch request in existing new file - 1', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1', 'wt?p=300,2'];
        expect(await consumer.sendBatch(data)).toBeTruthy();

        const data2 = ['wt?p=300,3', 'wt?p=300,4'];
        expect(await consumer.sendBatch(data2)).toBeTruthy();

        expect(customLogger.getMessages()).toContain('Write batch data in mapp_intelligence_test');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toBe(data.join(EOL) + EOL + data2.join(EOL) + EOL);
    });

    it('write batch request in existing new file - 2', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1', 'wt?p=300,2'];
        expect(await consumer.sendBatch(data)).toBeTruthy();

        const consumer2 = new ConsumerFile(mic.build());
        const data2 = ['wt?p=300,3', 'wt?p=300,4'];
        expect(await consumer2.sendBatch(data2)).toBeTruthy();

        expect(customLogger.getMessages()).toContain('Write batch data in mapp_intelligence_test');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toBe(data.join(EOL) + EOL + data2.join(EOL) + EOL);
    });

    it('file limit reached file lines', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileLines(5)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        for (let i = 0; i < 10; i++) {
            await consumer.sendBatch(["wt?p=300," + i]);
        }

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(1);
        expect(log.length).toBe(1);
        expect(customLogger.getMessages()).toContain('Write batch data in mapp_intelligence_test');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.log'))
            .toBe(`wt?p=300,0${EOL}wt?p=300,1${EOL}wt?p=300,2${EOL}wt?p=300,3${EOL}wt?p=300,4${EOL}`);
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toBe(`wt?p=300,5${EOL}wt?p=300,6${EOL}wt?p=300,7${EOL}wt?p=300,8${EOL}wt?p=300,9${EOL}`);
    });

    it('file limit reached file duration', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileDuration(1000)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        expect(await consumer.sendBatch(data)).toBeTruthy();

        await delay(2000);

        const data2 = ['wt?p=300,2', 'wt?p=300,3'];
        expect(await consumer.sendBatch(data2)).toBeTruthy();

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(1);
        expect(log.length).toBe(1);
        expect(customLogger.getMessages()).toContain('Write batch data in mapp_intelligence_test');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.log'))
            .toBe(`wt?p=300,0${EOL}wt?p=300,1${EOL}`);
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toBe(`wt?p=300,2${EOL}wt?p=300,3${EOL}`);
    });

    it('file limit reached file size', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileSize(10)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        expect(await consumer.sendBatch(data)).toBeTruthy();

        const data2 = ['wt?p=300,2', 'wt?p=300,3'];
        expect(await consumer.sendBatch(data2)).toBeTruthy();

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(1);
        expect(log.length).toBe(1);
        expect(customLogger.getMessages()).toContain('Write batch data in mapp_intelligence_test');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.log'))
            .toBe(`wt?p=300,0${EOL}wt?p=300,1${EOL}`);
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toBe(`wt?p=300,2${EOL}wt?p=300,3${EOL}`);
    });

    it('extract timestamp', async () => {
        const fileName: string = `${tempFilePath}/${tempFilePrefix}-5${getTimestamp()}.tmp`;
        const file: fs.FileHandle = await MappIntelligenceUnitUtil.createFile(fileName);
        await file.close();

        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileLines(5)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        await consumer.sendBatch(data);

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(1);
        expect(log.length).toBe(1);
    });

    it('file limit reached', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileSize(10)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        for (let i = 0; i < 25; i++) {
            await consumer.sendBatch(["wt?p=300," + i]);

            await delay(5);
        }

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(1);
        expect(log.length).toBe(24);
    });

    it('permission denied for directory', async () => {
        await fs.mkdir(tempFilePath + '/foobar', {mode: 0o444});

        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath + '/foobar')
            .setFilePrefix(tempFilePrefix)
            .setMaxFileLines(5)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        await consumer.sendBatch(data);

        expect(customLogger.getMessages()).toContain('EACCES: permission denied');

        await fs.rmdir(tempFilePath + '/foobar');
    });

    it('create file handle failed', async () => {
        const fileName: string = `${tempFilePath}/${tempFilePrefix}-${getTimestamp()}.tmp`;
        const file: fs.FileHandle = await MappIntelligenceUnitUtil.createFile(fileName);
        await file.chmod(0o444);
        await file.close();

        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileLines(5)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        await consumer.sendBatch(data);

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(1);
        expect(log.length).toBe(0);
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp')).toBe('');
    });

    it('current file lines', async () => {
        const fileName: string = `${tempFilePath}/${tempFilePrefix}-${getTimestamp()}.tmp`;
        const file: fs.FileHandle = await MappIntelligenceUnitUtil.createFile(fileName);
        await file.chmod(0o222);
        await file.close();

        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileLines(5)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        await consumer.sendBatch(data);

        expect(customLogger.getMessages()).toContain('Directory not exist');
    });

    it('cannot rename file', async () => {
        const mic = (new MappIntelligenceConfig())
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setMaxFileDuration(1000)
            .setLogger(customLogger);
        const consumer = new ConsumerFile(mic.build());

        const data = ['wt?p=300,0', 'wt?p=300,1'];
        expect(await consumer.sendBatch(data)).toBeTruthy();

        await delay(2000);
        (ConsumerFile as any).LOG_FILE_EXTENSION = '.tmp';

        const data2 = ['wt?p=300,2', 'wt?p=300,3'];
        expect(await consumer.sendBatch(data2)).toBeTruthy();

        const tmp: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".tmp");
        const log: Array<string> = await MappIntelligenceUnitUtil.getFiles(tempFilePath, tempFilePrefix, ".log");

        expect(tmp.length).toBe(2);
        expect(log.length).toBe(0);
        expect(customLogger.getMessages()).toContain('Create new file, because cannot rename temporary file');

        (ConsumerFile as any).LOG_FILE_EXTENSION = '.log';
    });
});
