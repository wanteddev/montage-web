// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

const typescriptProject = [
  '.github/actions/*/tsconfig.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'docs/tsconfig.json',
  'docs/tsconfig.node.json',
  'packages/*/tsconfig.json',
  'packages/*/tsconfig.node.json',
  'tests/*/tsconfig.json',
  'tests/*/tsconfig.node.json',
  'scripts/api-generator/tsconfig.json',
  'scripts/design-docs-sync/tsconfig.json',
];

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat['recommended'],
  reactHooks.configs.flat['recommended'],
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: typescriptProject,
          noWarnOnMultipleProjects: true,
        },
        node: true,
      },
    },

    rules: {
      'import/no-cycle': 'off',
      'prettier/prettier': 'warn',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/refs': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],

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

      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
        },
      ],

      'no-fallthrough': 'off',

      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
          location: 'anywhere',
        },
      ],

      'no-prototype-builtins': 'off',
      'no-case-declarations': 'off',

      'no-extra-boolean-cast': 'off',
      'no-implicit-coercion': 'error',
      'import/default': 'off',
      'import/export': 'off',
      'import/namespace': 'off',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      'import/no-unused-modules': [
        'off',
        {
          unusedExports: true,
        },
      ],

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

      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  },

  {
    files: ['packages/wds-mcp/**/*.ts'],
    rules: {
      'import/no-unresolved': [
        'error',
        { ignore: ['@modelcontextprotocol/sdk/.*'] },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    extends: [importPlugin.flatConfigs.typescript],
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
          readonly: 'generic',
        },
      ],

      '@typescript-eslint/no-empty-object-type': 'off',

      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
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
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'function',
        },
        {
          format: ['PascalCase'],
          selector: 'interface',
        },
        {
          format: ['PascalCase'],
          selector: 'typeAlias',
        },
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

  prettierRecommended,

  {
    languageOptions: {
      parserOptions: {
        project: typescriptProject,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  globalIgnores([
    '.nx',
    '**/node_modules',
    '**/dist',
    'packages/**/bin',
    'docs/src/data.json',
    'docs/next-env.d.ts',
    'docs/.next',
    'docs/out',
    'figma/icons/index.figma.tsx',
  ]),
);
