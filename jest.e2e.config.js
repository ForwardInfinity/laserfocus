/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jest-environment-puppeteer',
    transform: {},
    extensionsToTreatAsEsm: ['.js'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    // Specify that tests are in the e2e directory
    testMatch: ['**/tests/e2e/**/*.e2e.test.js'],
};

export default config; 