const rootDir = `${process.cwd()}`;

module.exports = {
    rootDir: rootDir,
    // roots: [
    //     '<rootDir>/src'
    // ],

    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json'
        }
    },

    testTimeout: 60 * 1000,
    maxWorkers: 1,

    // testMatch: [
    //     '**/test/**/*.+(ts|tsx|js)',
    //     '**/?(*.)+(spec|test).+(ts|tsx|js)'
    // ],
    // transform: {
    //     '^.+\\.(ts|tsx)$': 'ts-jest'
    // },

    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts'
    ],
    coverageDirectory: `<rootDir>/reports/coverage`,
    coverageThreshold: {
        'global': {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
