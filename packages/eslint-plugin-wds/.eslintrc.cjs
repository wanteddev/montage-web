const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    path.join(__dirname, '../../.eslintrc.cjs'),
    'plugin:eslint-plugin/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          __dirname + '/tsconfig.json',
          __dirname + '/tsconfig.test.json',
        ],
      },
    },
  },
  overrides: [
    {
      files: ['tests/**.ts', 'src/**/*.test.ts', 'tsup.config.ts'],
      parserOptions: {
        project: ['./tsconfig.test.json'],
      },
    },
  ],
};
