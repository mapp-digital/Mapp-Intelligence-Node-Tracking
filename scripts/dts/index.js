const exec = require('child_process').exec;
const promisify = require('util').promisify;

const executeCommand = promisify(exec);

(async function() {
    await executeCommand('tsc --project ./tsconfig.build.json').catch(function(reason) {
        console.error(reason.stdout);
    });

    await executeCommand('cp -avr ./.build/types/* ./types').catch(function(reason) {
        console.error(reason.stdout);
    });

    await executeCommand('rm -R ./.build');
})();
