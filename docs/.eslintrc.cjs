const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:@next/next/recommended',
    path.join(__dirname, '../.eslintrc.cjs'),
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
          __dirname + '/tsconfig.node.json',
        ],
      },
    },
  },
  rules: {
    'react/no-unknown-property': [
      'error',
      { ignore: ['wds-component', 'wds-ignore-first-focus', 'css'] },
    ],
  },
};
