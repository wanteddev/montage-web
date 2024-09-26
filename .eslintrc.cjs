/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['react', 'react-hooks', 'import', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: { version: 'detect' },
    'prettier/prettier': 'warn',
    'import/resolver': {
      typescript: {
        project: [__dirname + '/tsconfig.json'],
      },
    },
  },
  rules: {
    'import/no-cycle': 'off',
    'prettier/prettier': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'no-warning-comments': [
      'warn',
      {
        terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
        location: 'anywhere',
      },
    ],
    'no-implicit-coercion': 'error',

    'import/default': 'off',
    'import/export': 'off',
    'import/namespace': 'off',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unused-modules': ['off', { unusedExports: true }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
    'no-redeclare': 'off',
    'no-shadow': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-unnecessary-condition': 'off',
      },
    },
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      plugins: ['@typescript-eslint'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'import/no-cycle': 'off',
        '@typescript-eslint/array-type': [
          'error',
          { default: 'generic', readonly: 'generic' },
        ],
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports' },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            selector: 'variable',
            leadingUnderscore: 'allow',
          },
          { format: ['camelCase', 'PascalCase'], selector: 'function' },
          { format: ['PascalCase'], selector: 'interface' },
          { format: ['PascalCase'], selector: 'typeAlias' },
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'public-static-field',
              'private-static-field',
              'public-instance-field',
              'private-instance-field',
              'public-constructor',
              'private-constructor',
              'public-instance-method',
              'private-instance-method',
            ],
          },
        ],
      },
    },
  ],
};
