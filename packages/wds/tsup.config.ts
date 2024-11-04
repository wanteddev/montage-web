import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/define-configuration';
import { injectUseClient } from '../../.tsup/inject-use-client';

export default defineConfig(
  defineConfiguration({
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    dts: 'src/index.ts',
    onSuccess: () =>
      injectUseClient([
        './dist/components/*/*.{js,mjs}',
        './dist/hooks/*.{js,mjs}',
        './dist/stores/*.{js,mjs}',
        './dist/theme-provider/*.{js,mjs}',
      ]),
  }),
);
