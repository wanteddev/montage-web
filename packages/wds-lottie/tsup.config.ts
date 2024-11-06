import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/define-configuration';
import { injectUseClient } from '../../.tsup/inject-use-client';

export default defineConfig(
  defineConfiguration({
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    dts: 'src/index.ts',
    onSuccess: () => injectUseClient(['./dist/loading/index.{js,mjs}']),
  }),
);
