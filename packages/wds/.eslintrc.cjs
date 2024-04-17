const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [path.join(__dirname, '../../.eslintrc.cjs')],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          __dirname + '/tsconfig.json',
          __dirname + '/tsconfig.node.json',
        ],
      },
    },
  },
  rules: {
    'react/no-unknown-property': [
      'error',
      {
        ignore: [
          'wds-component',
          'wds-ignore-first-focus',
          'wds-ignore-dismissable-layer',
          'css',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['scripts/**.ts', 'tsup.config.ts'],
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
    },
  ],
};
