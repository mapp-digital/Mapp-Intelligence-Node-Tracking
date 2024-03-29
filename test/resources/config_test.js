import {MappIntelligenceConsumerType, MappIntelligenceLogLevel} from '../../src/MappIntelligence';

module.exports = {
    tracking: {
        trackId: '123451234512345',
        trackDomain: 'analytics01.wt-eu02.net',
        deactivate: false,
        debug: false,
        logLevel: MappIntelligenceLogLevel.DEBUG,
        domain: ['sub.domain.tld', 'foo.bar', /test\.test\.com/],
        useParamsForDefaultPageName: ['aa', 'bb', 'cc', null, 8],
        containsInclude: ["foo", null, 8, "bar"],
        containsExclude: [null, 8, "test"],
        matchesInclude: [".*foo.*", null, 8, /.*bar.*/],
        matchesExclude: [".*test.*", null, 8]
    },
    consumer: {
        consumerType: MappIntelligenceConsumerType.FILE,
        filePath: '',
        filePrefix: '',
        maxAttempt: 1,
        attemptTimeout: 100,
        maxBatchSize: 50,
        maxQueueSize: 1000,
        maxFileLines: 1000,
        maxFileDuration: 180000,
        maxFileSize: 24576,
        forceSSL: true
    }
};
