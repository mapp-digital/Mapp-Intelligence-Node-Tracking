const rollup = require('rollup');
const packages = require('./packages');

async function buildBundle(pkg) {
    const rollupInputConfig = {
        input: `${pkg.packagePath}/${pkg.input}`,
        plugins: pkg.plugins,
        external: pkg.external
    };

    const rollupOutputConfig = [];
    for (let i = 0, l = pkg.format.length; i < l; i++) {
        rollupOutputConfig.push({
            name: pkg.packageName,
            file: `${pkg.packagePath}/${pkg.outputPath}/${pkg.outputName}.${pkg.format[i]}.js`,
            globals: pkg.global,
            format: pkg.format[i],
            exports: 'named'
        });
    }

    try {
        const bundle = await rollup.rollup(rollupInputConfig);

        for (let i = 0, l = rollupOutputConfig.length; i < l; i++) {
            console.log(`Start processing "${pkg.packageName}" of ${rollupOutputConfig[i].file}.`);
            await bundle.write(rollupOutputConfig[i]).then(() => {
                console.log(`Ends processing "${pkg.packageName}" of ${rollupOutputConfig[i].file}.`);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}

async function build() {
    for (let i = 0, l = packages.length; i < l; i++) {
        await buildBundle(packages[i]);
    }
}

build().then(() => process.exit());
