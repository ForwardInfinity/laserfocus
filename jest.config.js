/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  transform: {},
  // Tells Jest to look for .js files as ES modules
  extensionsToTreatAsEsm: ['.js'],
  // Helps Jest resolve ES modules correctly
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // Specify that tests are in the unit directory
  testMatch: ['**/tests/unit/**/*.test.js'],
};

export default config; 