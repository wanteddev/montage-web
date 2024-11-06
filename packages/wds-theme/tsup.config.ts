import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/define-configuration';

export default defineConfig(
  defineConfiguration({
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    dts: 'src/index.ts',
  }),
);
