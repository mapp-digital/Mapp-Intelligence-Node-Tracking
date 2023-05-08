import {MappIntelligenceUnitUtil, CustomLogger} from '../_utils/MappIntelligenceUnitUtil';
import {
    MappIntelligenceConfig,
    MappIntelligenceLogLevel,
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
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('null config', async () => {
        const mic = new MappIntelligenceConfig(null, null);

        mic.setTrackId(null)
            .setTrackDomain(null)
            .setUserAgent(null)
            .setClientHintUserAgent(null)
            .setClientHintUserAgentFullVersionList(null)
            .setClientHintUserAgentMobile(null)
            .setClientHintUserAgentModel(null)
            .setClientHintUserAgentPlatform(null)
            .setClientHintUserAgentPlatformVersion(null)
            .setRemoteAddress(null)
            .setReferrerURL(null)
            .setRequestURL(null)
            .setCookie(null).addCookie(null, null).addCookie('', null).addCookie(null, '')
            .setDomain(null).addDomain(null)
            .setLogger(null)
            .setLogLevel(null)
            .setConsumerType(null)
            .setConsumer(null)
            .setFilePath(null)
            .setFilePrefix(null)
            .setUseParamsForDefaultPageName(null).addUseParamsForDefaultPageName(null)
            .setContainsInclude(null).addContainsInclude(null)
            .setContainsExclude(null).addContainsExclude(null)
            .setMatchesInclude(null).addMatchesInclude(null)
            .setMatchesExclude(null).addMatchesExclude(null);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect('').toBe(config['clientHintUserAgent']);
        expect('').toBe(config['clientHintUserAgentFullVersionList']);
        expect('').toBe(config['clientHintUserAgentModel']);
        expect('').toBe(config['clientHintUserAgentMobile']);
        expect('').toBe(config['clientHintUserAgentPlatform']);
        expect('').toBe(config['clientHintUserAgentPlatformVersion']);
        expect('').toBe(config['remoteAddress']);
        expect('').toBe(config['referrerURL']);
        expect(config['requestURL']).toBeUndefined();
        expect('').toBe(config['filePath']);
        expect('').toBe(config['filePrefix']);
        expect(34).toBe(config['statistics']);
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('invalid config file', async () => {
        const configFile: string = testDir + '/resources/foo.bar';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('empty config file', async () => {
        const configFile: string = testDir + '/resources/config_empty.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('JSON config file - 1', async () => {
        const configFile: string = testDir + '/resources/config.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('JSON config file - 2', async () => {
        const configFile: string = testDir + '/resources/config_test.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('123451234512345').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(2).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.DEBUG).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(2).toBe(config['containsInclude'].length);
        expect(1).toBe(config['containsExclude'].length);
        expect(2).toBe(config['matchesInclude'].length);
        expect(1).toBe(config['matchesExclude'].length);
    });

    it('JSON config file - 3', async () => {
        const configFile: string = testDir + '/resources/config_test2.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('JSON config file - 4', async () => {
        const configFile: string = testDir + '/resources/config_test3.json';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
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
            .addUseParamsForDefaultPageName('bar')
            .setContainsInclude([])
            .addContainsInclude('foo')
            .addContainsInclude('bar');

        const config: { [key: string]: any } = mic.build();
        expect('111111111111111').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(2).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('JS config file - 1', async () => {
        const configFile: string = testDir + '/resources/config.js';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('').toBe(config['trackId']);
        expect('').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(0).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
    });

    it('JS config file - 2', async () => {
        const configFile: string = testDir + '/resources/config_test.js';
        const mic = new MappIntelligenceConfig(configFile);
        const config: { [key: string]: any } = mic.build();

        expect('123451234512345').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(3).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.DEBUG).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(2).toBe(config['containsInclude'].length);
        expect(1).toBe(config['containsExclude'].length);
        expect(2).toBe(config['matchesInclude'].length);
        expect(1).toBe(config['matchesExclude'].length);
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
            .addUseParamsForDefaultPageName('bar')
            .setContainsInclude([])
            .addContainsInclude('foo')
            .addContainsInclude('bar');

        const config: { [key: string]: any } = mic.build();
        expect('111111111111111').toBe(config['trackId']);
        expect('analytics01.wt-eu02.net').toBe(config['trackDomain']);
        expect(1).toBe(config['domain'].length);
        expect(config['logger']).toBeUndefined();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config['logLevel']);
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
        expect(false).toBe(config['deactivate']);
        expect(false).toBe(config['deactivateByInAndExclude']);
        expect(2).toBe(config['containsInclude'].length);
        expect(0).toBe(config['containsExclude'].length);
        expect(0).toBe(config['matchesInclude'].length);
        expect(0).toBe(config['matchesExclude'].length);
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
            .setClientHintUserAgent("%22Chromium%22%3Bv%3D%22112%22%2C%20%22Google%20Chrome%22%3Bv%3D%22112%22%2C%20%22Not%3AA-Brand%22%3Bv%3D%2299%22")
            .setClientHintUserAgentFullVersionList("%22Chromium%22%3Bv%3D%22110.0.5481.65%22%2C%20%22Not%20A(Brand%22%3Bv%3D%2224.0.0.0%22%2C%20%22Google%20Chrome%22%3Bv%3D%22110.0.5481.65%22")
            .setClientHintUserAgentMobile("?1")
            .setClientHintUserAgentModel("%22SM-A715F%22")
            .setClientHintUserAgentPlatform("%22macOS%22")
            .setClientHintUserAgentPlatformVersion("%2213.0.0%22")
            .setRemoteAddress('127.0.0.1')
            .setReferrerURL('https://sub.domain.tld/path/to/previous/page.html')
            .setRequestURL('https://sub.domain.tld/path/to/page.html?foo=bar&test=123#abc');

        const config: { [key: string]: any } = mic.build();
        expect('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0').toBe(config['userAgent']);
        expect("\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"").toBe(config["clientHintUserAgent"]);
        expect("\"Chromium\";v=\"110.0.5481.65\", \"Not A(Brand\";v=\"24.0.0.0\", \"Google Chrome\";v=\"110.0.5481.65\"").toBe(config["clientHintUserAgentFullVersionList"]);
        expect("?1").toBe(config["clientHintUserAgentMobile"]);
        expect("\"SM-A715F\"").toBe(config["clientHintUserAgentModel"]);
        expect("\"macOS\"").toBe(config["clientHintUserAgentPlatform"]);
        expect("\"13.0.0\"").toBe(config["clientHintUserAgentPlatformVersion"]);
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

    it('testConfigWithContainsInclude', async () => {
        const mappIntelligenceConfig = new MappIntelligenceConfig();
        mappIntelligenceConfig.setContainsInclude([])
            .addContainsInclude('foo.bar.com')
            .addContainsInclude('www.mappIntelligence.com')
            .addContainsInclude('sub.domain.tld');

        const config: { [key: string]: any } = mappIntelligenceConfig.build();
        expect('foo.bar.com').toBe(config['containsInclude'][0]);
        expect('www.mappIntelligence.com').toBe(config['containsInclude'][1]);
        expect('sub.domain.tld').toBe(config['containsInclude'][2]);
    });

    it('testConfigWithContainsExclude', async () => {
        const mappIntelligenceConfig = new MappIntelligenceConfig();
        mappIntelligenceConfig.setContainsExclude([])
            .addContainsExclude('foo.bar.com')
            .addContainsExclude('www.mappIntelligence.com')
            .addContainsExclude('sub.domain.tld');

        const config: { [key: string]: any } = mappIntelligenceConfig.build();
        expect('foo.bar.com').toBe(config['containsExclude'][0]);
        expect('www.mappIntelligence.com').toBe(config['containsExclude'][1]);
        expect('sub.domain.tld').toBe(config['containsExclude'][2]);
    });

    it('testConfigWithMatchesInclude', async () => {
        const mappIntelligenceConfig = new MappIntelligenceConfig();
        mappIntelligenceConfig.setMatchesInclude([])
            .addMatchesInclude(/foo\.bar\.com/)
            .addMatchesInclude(/www\.mappIntelligence\.com/)
            .addMatchesInclude(/sub\.domain\.tld/);

        const config: { [key: string]: any } = mappIntelligenceConfig.build();
        expect(/foo\.bar\.com/.toString()).toBe(config['matchesInclude'][0].toString());
        expect(/www\.mappIntelligence\.com/.toString()).toBe(config['matchesInclude'][1].toString());
        expect(/sub\.domain\.tld/.toString()).toBe(config['matchesInclude'][2].toString());
    });

    it('testConfigWithMatchesExclude', async () => {
        const mappIntelligenceConfig = new MappIntelligenceConfig();
        mappIntelligenceConfig.setMatchesExclude([])
            .addMatchesExclude(/foo\.bar\.com/)
            .addMatchesExclude(/www\.mappIntelligence\.com/)
            .addMatchesExclude(/sub\.domain\.tld/);

        const config: { [key: string]: any } = mappIntelligenceConfig.build();
        expect(/foo\.bar\.com/.toString()).toBe(config['matchesExclude'][0].toString());
        expect(/www\.mappIntelligence\.com/.toString()).toBe(config['matchesExclude'][1].toString());
        expect(/sub\.domain\.tld/.toString()).toBe(config['matchesExclude'][2].toString());
    });

    it('testRequestWithContainsInclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsInclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain1.tld')
            .addContainsInclude('sub.domain2.tld')
            .addContainsInclude('sub.domain3.tld')
            .addContainsInclude('sub.domain.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsInclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain1.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesInclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesInclude(/sub\.domain\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesInclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesInclude(/sub\.domain1\.tld/)
            .addMatchesInclude(/sub\.domain2\.tld/)
            .addMatchesInclude(/sub\.domain3\.tld/)
            .addMatchesInclude(/sub\.domain\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesInclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesInclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsAndMatchesInclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain.tld')
            .addMatchesInclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsAndMatchesInclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain1.tld')
            .addMatchesInclude(/sub\.domain\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsAndMatchesInclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain1.tld')
            .addMatchesInclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsExclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsExclude('sub.domain.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsExclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsExclude('sub.domain1.tld')
            .addContainsExclude('sub.domain2.tld')
            .addContainsExclude('sub.domain3.tld')
            .addContainsExclude('sub.domain.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsExclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsExclude('sub.domain1.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesExclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesExclude(/sub\.domain\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesExclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesExclude(/sub\.domain1\.tld/)
            .addMatchesExclude(/sub\.domain2\.tld/)
            .addMatchesExclude(/sub\.domain3\.tld/)
            .addMatchesExclude(/sub\.domain\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesExclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesExclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsAndMatchesExclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsExclude('sub.domain.tld')
            .addMatchesExclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsAndMatchesExclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsExclude('sub.domain1.tld')
            .addMatchesExclude(/sub\.domain\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsAndMatchesExclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsExclude('sub.domain1.tld')
            .addMatchesExclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsIncludeAndExclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain.tld')
            .addContainsExclude('.html')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsIncludeAndExclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain.tld')
            .addContainsExclude('sub.domain1.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithContainsIncludeAndExclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addContainsInclude('sub.domain1.tld')
            .addContainsExclude('sub.domain1.tld')
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesIncludeAndExclude1', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesInclude(/sub\.domain\.tld/)
            .addMatchesExclude(/\.html/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesIncludeAndExclude2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesInclude(/sub\.domain\.tld/)
            .addMatchesExclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(false).toBe(config['deactivateByInAndExclude']);
    });

    it('testRequestWithMatchesIncludeAndExclude3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .addMatchesInclude(/sub\.domain1\.tld/)
            .addMatchesExclude(/sub\.domain1\.tld/)
            .setRequestURL('https://sub.domain.tld:80/path/to/page.html?foo=bar&test=123#abc');

        const config = mappIntelligenceConfig.build();
        expect(true).toBe(config['deactivateByInAndExclude']);
    });

    it('set log level int', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .setLogLevel(MappIntelligenceLogLevel.INFO);

        const config = mappIntelligenceConfig.build();
        expect(MappIntelligenceLogLevel.INFO).toBe(config["logLevel"]);
    });

    it('set log level int 2', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .setLogLevel(7);

        const config = mappIntelligenceConfig.build();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config["logLevel"]);
    });

    it('set log level int 3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .setLogLevel(-7);

        const config = mappIntelligenceConfig.build();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config["logLevel"]);
    });

    it('set log level string', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .setLogLevel("INFO");

        const config = mappIntelligenceConfig.build();
        expect(MappIntelligenceLogLevel.INFO).toBe(config["logLevel"]);
    });

    it('set log level string 2 ', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .setLogLevel("info");

        const config = mappIntelligenceConfig.build();
        expect(MappIntelligenceLogLevel.INFO).toBe(config["logLevel"]);
    });

    it('set log level string 3', async () => {
        const mappIntelligenceConfig = (new MappIntelligenceConfig())
            .setLogLevel("TRACE");

        const config = mappIntelligenceConfig.build();
        expect(MappIntelligenceLogLevel.ERROR).toBe(config["logLevel"]);
    });
});
