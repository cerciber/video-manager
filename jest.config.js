// jest.config.js
module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
  },
  globalSetup: './src/utils/testConfig/setup.js',
  globalTeardown: './src/utils/testConfig/teardown.js',
};
