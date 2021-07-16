import {MappIntelligenceConsumerType} from '../../src/MappIntelligence';

module.exports = {
    tracking: {
        trackId: '',
        trackDomain: '',
        deactivate: false,
        debug: false,
        domain: [],
        useParamsForDefaultPageName: []
    },
    consumer: {
        consumerType: MappIntelligenceConsumerType.HTTP_CLIENT,
        filePath: '',
        filePrefix: '',
        maxAttempt: 1,
        attemptTimeout: 100,
        maxBatchSize: 50,
        maxQueueSize: 1000,
        maxFileLines: 10000,
        maxFileDuration: 1800000,
        maxFileSize: 25165824,
        forceSSL: true
    }
};
