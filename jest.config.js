/** @type {import('jest').Config} */
module.exports = {
  preset: './jest.preset',
  testTimeout: 1000000,
  setupFiles: ['<rootDir>/jest.env.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(tsx?)$': ['ts-jest', { tsConfig: 'tsconfig.node.json' }],
  },
  testMatch: [
    '**/test/**/__tests__/**/*.ts?(x)',
    '**/test/**/?(*.)+(spec|test).ts?(x)',
  ],
};
