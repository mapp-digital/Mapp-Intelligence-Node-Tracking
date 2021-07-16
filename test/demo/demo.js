const MappIntelligence = require('./../../index');

(async function() {
    const config = new MappIntelligence.MappIntelligenceConfig('123451234512345', 'analytics01.webtrekk.net');
    config.setConsumerType(MappIntelligence.MappIntelligenceConsumerType.FILE);
    config.setDebug(true);

    const tracking = new MappIntelligence.MappIntelligenceTracking(config);

    console.log('############# tracking > track');
    for (let i = 0; i < 10; i++) {
        await tracking.track();
    }

    console.log('############# tracking > flush');
    await tracking.flush();
})();
