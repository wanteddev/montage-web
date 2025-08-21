import rules from './rules';

import type { ESLint, Linter } from 'eslint';

const recommendedRules = {
  '@wanteddev/wds/icon-button-uses-name': 'error',
  '@wanteddev/wds/image-uses-alt': 'error',
} satisfies Record<`@wanteddev/wds/${keyof typeof rules}`, Linter.RuleEntry>;

const configs = {
  recommended: {
    plugins: ['@wanteddev/wds'],
    rules: recommendedRules,
  },
} satisfies ESLint.Plugin['configs'];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../package.json') as {
  name: string;
  version: string;
};

const plugin = {
  rules,
  configs,
  meta: {
    name,
    version,
  },
} satisfies ESLint.Plugin;

const flatConfig = {
  recommended: {
    name: '@wanteddev/wds/recommended',
    plugins: {
      '@wanteddev/wds': plugin,
    },
    rules: recommendedRules,
  } as Linter.FlatConfig,
};

export default plugin;
export { flatConfig, rules, configs, plugin };
