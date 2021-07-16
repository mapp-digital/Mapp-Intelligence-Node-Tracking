const exec = require('child_process').exec;
const promisify = require('util').promisify;

const executeCommand = promisify(exec);

const packages = require('./packages');
const packageFolderDir = packages.root;
const releaseFolderDir = packages.release;
const files = packages.files;

(async function() {
    await executeCommand(`rm -r ${releaseFolderDir}`).catch(function(reason) {
        console.error(reason.stdout);
    });

    await executeCommand(`mkdir ${releaseFolderDir}`).catch(function(reason) {
        console.error(reason.stdout);
    });

    for (let file of files) {
        await executeCommand(`cp -avr ${packageFolderDir}${file} ${releaseFolderDir}${file}`).catch(function(reason) {
            console.error(reason.stdout);
        });
    }
})();
