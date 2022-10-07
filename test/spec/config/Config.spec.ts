import {MappIntelligenceUnitUtil, CustomLogger} from '../_utils/MappIntelligenceUnitUtil';
import {
    MappIntelligenceConfig,
    MappIntelligenceConsumerType
} from '../../../src/MappIntelligence';

describe('MappIntelligenceConfig', () => {
    let testDir: string = `${process.cwd()}/test`;
    let customLogger: CustomLogger;

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();
    });

    it('default config', async () => {
        const mic = new MappIntelligenceConfig();
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('null config', async () => {
        const mic = new MappIntelligenceConfig(null, null);

        mic.setTrackId(null)
            .setTrackDomain(null)
            .setUserAgent(null)
            .setRemoteAddress(null)
            .setReferrerURL(null)
            .setRequestURL(null)
            .setCookie(null).addCookie(null, null).addCookie('', null).addCookie(null, '')
            .setDomain(null).addDomain(null)
            .setLogger(null)
            .setConsumerType(null)
            .setConsumer(null)
            .setFilePath(null)
            .setFilePrefix(null)
            .setUseParamsForDefaultPageName(null).addUseParamsForDefaultPageName(null);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('invalid config file', async () => {
        const configFile: string = testDir + '/resources/foo.bar';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('empty config file', async () => {
        const configFile: string = testDir + '/resources/config_empty.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('JSON config file - 1', async () => {
        const configFile: string = testDir + '/resources/config.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('JSON config file - 2', async () => {
        const configFile: string = testDir + '/resources/config_test.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('123451234512345').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(2).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.FILE).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(1).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 100).toBe(config['maxFileLines']);
        expect(30 * 60 * 100).toBe(config['maxFileDuration']);
        expect(24 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(3).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect(config['filePath']).toMatch(/^.+$/);
        expect('MappIntelligenceRequests').toBe(config['filePrefix']);
        expect(131).toBe(config['statistics']);
    });

    it('JSON config file - 3', async () => {
        const configFile: string = testDir + '/resources/config_test2.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.FORK_CURL).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(18).toBe(config['statistics']);
    });

    it('JSON config file - 4', async () => {
        const configFile: string = testDir + '/resources/config_test3.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('overwrite JSON config file', async () => {
        const configFile: string = testDir + '/resources/config.json';
        const mic = new MappIntelligenceConfig(configFile);
        mic.setTrackId('111111111111111')
            .setTrackDomain('analytics01.wt-eu02.net')
            .setMaxAttempt(3)
            .setAttemptTimeout(200)
            .setMaxBatchSize(1000)
            .setMaxQueueSize(100000)
            .setMaxFileLines(300)
            .setMaxFileDuration(60000)
            .setMaxFileSize(12 * 1024 * 1024)
            .setForceSSL(false)
            .setUseParamsForDefaultPageName([])
            .addUseParamsForDefaultPageName('foo')
            .addUseParamsForDefaultPageName('bar');

        const config: { [key: string]: any } = mic.build();
        expect('111111111111111').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(3).toBe(config['maxAttempt']);
        expect(200).toBe(config['attemptTimeout']);
        expect(1000).toBe(config['maxBatchSize']);
        expect(100000).toBe(config['maxQueueSize']);
        expect(300).toBe(config['maxFileLines']);
        expect(60000).toBe(config['maxFileDuration']);
        expect(12 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(false).toBe(config['forceSSL']);
        expect(2).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(33).toBe(config['statistics']);
    });

    it('JS config file - 1', async () => {
        const configFile: string = testDir + '/resources/config.js';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(50).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 1000).toBe(config['maxFileLines']);
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(0).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
    });

    it('JS config file - 2', async () => {
        const configFile: string = testDir + '/resources/config_test.js';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('123451234512345').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(3).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.FILE).toBe(config['consumerType']);
        expect(1).toBe(config['maxAttempt']);
        expect(100).toBe(config['attemptTimeout']);
        expect(1).toBe(config['maxBatchSize']);
        expect(1000).toBe(config['maxQueueSize']);
        expect(10 * 100).toBe(config['maxFileLines']);
        expect(30 * 60 * 100).toBe(config['maxFileDuration']);
        expect(24 * 1024).toBe(config['maxFileSize']);
        expect(true).toBe(config['forceSSL']);
        expect(3).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect(config['filePath']).toMatch(/^.+$/);
        expect('MappIntelligenceRequests').toBe(config['filePrefix']);
        expect(131).toBe(config['statistics']);
    });

    it('overwrite JS config file', async () => {
        const configFile: string = testDir + '/resources/config.js';
        const mic = new MappIntelligenceConfig(configFile);
        mic.setTrackId('111111111111111')
            .setTrackDomain('analytics01.wt-eu02.net')
            .setMaxAttempt(3)
            .setAttemptTimeout(200)
            .setMaxBatchSize(1000)
            .setMaxQueueSize(100000)
            .setMaxFileLines(300)
            .setMaxFileDuration(60000)
            .setMaxFileSize(12 * 1024 * 1024)
            .setForceSSL(false)
            .setUseParamsForDefaultPageName([])
            .addUseParamsForDefaultPageName('foo')
            .addUseParamsForDefaultPageName('bar');

        const config: { [key: string]: any } = mic.build();
        expect('111111111111111').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceConsumerType.HTTP_CLIENT).toBe(config['consumerType']);
        expect(3).toBe(config['maxAttempt']);
        expect(200).toBe(config['attemptTimeout']);
        expect(1000).toBe(config['maxBatchSize']);
        expect(100000).toBe(config['maxQueueSize']);
        expect(300).toBe(config['maxFileLines']);
        expect(60000).toBe(config['maxFileDuration']);
        expect(12 * 1024 * 1024).toBe(config['maxFileSize']);
        expect(false).toBe(config['forceSSL']);
        expect(2).toBe(config['useParamsForDefaultPageName'].length);
        expect('').toBe(config['userAgent']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(33).toBe(config['statistics']);
    });

    it('config with trackId and trackDomain', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const config: { [key: string]: any } = mic.build();

        expect('111111111111111').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
    });

    it('config with domain', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setDomain([])
            .addDomain('foo.bar.com')
            .addDomain('www.mappIntelligence.com')
            .addDomain('sub.domain.tld');

        const config: { [key: string]: any } = mic.build();
        expect('foo.bar.com').toBe(config['domain'][0]);
        expect('www.mappIntelligence.com').toBe(config['domain'][1]);
        expect('sub.domain.tld').toBe(config['domain'][2]);
    });

    it('config with file', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setConsumerType(MappIntelligenceConsumerType.FILE)
            .setFilePath('/dev/')
            .setFilePrefix('null')
            .setLogger(customLogger);

        const config: { [key: string]: any } = mic.build();
        expect('/dev/').toBe(config['filePath']);
        expect('null').toBe(config['filePrefix']);
        expect(MappIntelligenceConsumerType.FILE).toBe(config['consumerType']);
        expect(1).toBe(config['maxBatchSize']);
        expect(134).toBe(config['statistics']);
    });

    it('header data', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0')
            .setRemoteAddress('127.0.0.1')
            .setReferrerURL('https://sub.domain.tld/path/to/previous/page.html')
            .setRequestURL('https://sub.domain.tld/path/to/page.html?foo=bar&test=123#abc');

        const config: { [key: string]: any } = mic.build();
        expect('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0').toBe(config['userAgent']);
        expect('127.0.0.1').toBe(config['remoteAddress']);
        expect('https://sub.domain.tld/path/to/previous/page.html').toBe(config['referrerURL']);
        expect('sub.domain.tld').toBe(config['domain'][0]);
    });

    it('request URL invalid', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('sub.domain.tld:8080/path/to/page.html?foo=bar&test=123#abc');

        const config: { [key: string]: any } = mic.build();
        expect('').toBe(config['domain'][0]);
    });

    it('request URL with 8080', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld:8080/path/to/page.html?foo=bar&test=123#abc');

        const config: { [key: string]: any } = mic.build();
        expect('sub.domain.tld:8080').toBe(config['domain'][0]);
    });

    it('request URL with 443', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld:443/path/to/page.html?foo=bar&test=123#abc');

        const config: { [key: string]: any } = mic.build();
        expect('sub.domain.tld').toBe(config['domain'][0]);
    });

    it('request URL with 80', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config: { [key: string]: any } = mic.build();
        expect('sub.domain.tld').toBe(config['domain'][0]);
    });

    it('invalid max attempt - 1', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxAttempt(12);

        const config: { [key: string]: any } = mic.build();
        expect(1).toBe(config['maxAttempt']);
    });

    it('invalid max attempt - 2', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxAttempt(-12);

        const config: { [key: string]: any } = mic.build();
        expect(1).toBe(config['maxAttempt']);
    });

    it('invalid attempt timeout - 1', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setAttemptTimeout(750);

        const config: { [key: string]: any } = mic.build();
        expect(100).toBe(config['attemptTimeout']);
    });

    it('invalid attempt timeout - 2', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setAttemptTimeout(-750);

        const config: { [key: string]: any } = mic.build();
        expect(100).toBe(config['attemptTimeout']);
    });

    it('invalid max file lines - 1', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxFileLines(11000);

        const config: { [key: string]: any } = mic.build();
        expect(10000).toBe(config['maxFileLines']);
    });

    it('invalid max file lines - 2', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxFileLines(-1000);

        const config: { [key: string]: any } = mic.build();
        expect(10000).toBe(config['maxFileLines']);
    });

    it('invalid max file duration - 1', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxFileDuration(31 * 60 * 1000);

        const config: { [key: string]: any } = mic.build();
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
    });

    it('invalid max file duration - 2', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxFileDuration(-30 * 1000);

        const config: { [key: string]: any } = mic.build();
        expect(30 * 60 * 1000).toBe(config['maxFileDuration']);
    });

    it('invalid max file size - 1', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxFileSize(25 * 1024 * 1024);

        const config: { [key: string]: any } = mic.build();
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
    });

    it('invalid max file size - 2', async () => {
        const mic = new MappIntelligenceConfig();
        mic.setMaxFileSize(-24 * 1024);

        const config: { [key: string]: any } = mic.build();
        expect(24 * 1024 * 1024).toBe(config['maxFileSize']);
    });

    it('cookie', async () => {
        const mic = (new MappIntelligenceConfig())
            .setCookie({})
            .addCookie('foo', 'bar')
            .addCookie('test', '123')
            .addCookie('abc', 'cba');

        const config: { [key: string]: any } = mic.build();
        expect('bar').toBe(config['cookie']['foo']);
        expect('123').toBe(config['cookie']['test']);
        expect('cba').toBe(config['cookie']['abc']);
    });
});
