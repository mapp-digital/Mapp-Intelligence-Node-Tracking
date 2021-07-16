import {MappIntelligenceConsumerType} from '../../src/MappIntelligence';

module.exports = {
    tracking: {
        trackId: '123451234512345',
        trackDomain: 'analytics01.wt-eu02.net',
        deactivate: false,
        debug: false,
        domain: ['sub.domain.tld', 'foo.bar', /test\.test\.com/],
        useParamsForDefaultPageName: ['aa', 'bb', 'cc']
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
