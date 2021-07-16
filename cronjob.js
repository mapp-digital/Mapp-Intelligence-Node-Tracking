#!/usr/bin/env node

const MappIntelligence = require('./dist/mapp-intelligence-node.umd');

(async function() {
    var status = 1;
    try {
        var cronjob = new MappIntelligence.MappIntelligenceCronjob(process.argv);
        status = await cronjob.run();
    } catch (e) {
        // do nothing
    }

    process.exit(status);
})();
