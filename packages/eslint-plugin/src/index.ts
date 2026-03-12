import { name, version } from '../package.json';

import rules from './rules';

import type { ESLint, Linter } from 'eslint';

const recommendedRules = {
  '@montage-ui/core/icon-button-uses-name': 'warn',
  '@montage-ui/core/image-uses-alt': 'warn',
} satisfies Record<`@montage-ui/core/${keyof typeof rules}`, Linter.RuleEntry>;

const strictRules = {
  '@montage-ui/core/icon-button-uses-name': 'error',
  '@montage-ui/core/image-uses-alt': 'error',
} satisfies Record<`@montage-ui/core/${keyof typeof rules}`, Linter.RuleEntry>;

const configs = {
  recommended: {
    plugins: ['@montage-ui/core'],
    rules: recommendedRules,
  },
  strict: {
    plugins: ['@montage-ui/core'],
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
    name: '@montage-ui/core/recommended',
    plugins: {
      '@montage-ui/core': plugin,
    },
    rules: recommendedRules,
  } as Linter.FlatConfig,
  strict: {
    name: '@montage-ui/core/strict',
    plugins: {
      '@montage-ui/core': plugin,
    },
  } as Linter.FlatConfig,
};

export default plugin;
export { flatConfig, rules, configs, plugin };
