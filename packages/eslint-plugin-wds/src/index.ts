import { name, version } from '../package.json';

import rules from './rules';

import type { ESLint, Linter } from 'eslint';

const recommendedRules = {
  '@wanteddev/wds/icon-button-uses-name': 'warn',
  '@wanteddev/wds/image-uses-alt': 'warn',
} satisfies Record<`@wanteddev/wds/${keyof typeof rules}`, Linter.RuleEntry>;

const strictRules = {
  '@wanteddev/wds/icon-button-uses-name': 'error',
  '@wanteddev/wds/image-uses-alt': 'error',
} satisfies Record<`@wanteddev/wds/${keyof typeof rules}`, Linter.RuleEntry>;

const configs = {
  recommended: {
    plugins: ['@wanteddev/wds'],
    rules: recommendedRules,
  },
  strict: {
    plugins: ['@wanteddev/wds'],
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
    name: '@wanteddev/wds/recommended',
    plugins: {
      '@wanteddev/wds': plugin,
    },
    rules: recommendedRules,
  } as Linter.FlatConfig,
  strict: {
    name: '@wanteddev/wds/strict',
    plugins: {
      '@wanteddev/wds': plugin,
    },
  } as Linter.FlatConfig,
};

export default plugin;
export { flatConfig, rules, configs, plugin };
