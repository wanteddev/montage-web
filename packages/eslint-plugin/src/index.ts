import { name, version } from '../package.json';

import rules from './rules';

import type { ESLint, Linter } from 'eslint';

const recommendedRules = {
  '@montage-ui/icon-button-uses-name': 'warn',
  '@montage-ui/image-uses-alt': 'warn',
} satisfies Record<`@montage-ui/${keyof typeof rules}`, Linter.RuleEntry>;

const strictRules = {
  '@montage-ui/icon-button-uses-name': 'error',
  '@montage-ui/image-uses-alt': 'error',
} satisfies Record<`@montage-ui/${keyof typeof rules}`, Linter.RuleEntry>;

const configs = {
  recommended: {
    plugins: ['@montage-ui'],
    rules: recommendedRules,
  },
  strict: {
    plugins: ['@montage-ui'],
    rules: strictRules,
  },
} satisfies ESLint.Plugin['configs'];

const plugin = {
  rules,
  configs,
  meta: {
    name,
    version,
  },
} satisfies ESLint.Plugin;

const flatConfig: Record<keyof typeof configs, Linter.FlatConfig> = {
  recommended: {
    name: '@montage-ui/recommended',
    plugins: {
      '@montage-ui': plugin,
    },
    rules: recommendedRules,
  } as Linter.FlatConfig,
  strict: {
    name: '@montage-ui/strict',
    plugins: {
      '@montage-ui': plugin,
    },
    rules: strictRules,
  } as Linter.FlatConfig,
};

export default plugin;
export { flatConfig, rules, configs, plugin };
