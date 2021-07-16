const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');
const replace = require('rollup-plugin-replace');
const version = require('./../../package').version;

const FORMAT = {
    ESM: 'es',
    ESM2: 'esm',
    UMD: 'umd',
    AMD: 'amd',
    CJS: 'cjs',
    IIFE: 'iife',
    SYS: 'system'
};

module.exports = [
    {
        packagePath: '.',
        packageName: '@mapp-intelligence/node',
        outputPath: 'dist',
        outputName: 'mapp-intelligence-node',
        input: 'src/MappIntelligence.ts',
        plugins: [
            typescript({
                tsconfig: './tsconfig.build.json'
            }),
            babel({
                exclude: 'node_modules/**'
            }),
            replace({
                'project.version': version,
                delimiters: ['${', '}']
            })
        ],
        external: [
            'os', 'child_process', 'util', 'http', 'https', 'fs'
        ],
        global: {
            os: 'os',
            child_process: 'child_process',
            util: 'util',
            http: 'http',
            https: 'https',
            fs: 'fs'
        },
        format: [FORMAT.UMD]
    }
];
