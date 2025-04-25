import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/define-configuration';
import { injectUseClient } from '../../.tsup/inject-use-client';

export default defineConfig(
  defineConfiguration({
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    dts: 'src/index.ts',
    onSuccess: () =>
      injectUseClient([
        './dist/components/**/index.{js,mjs}',
        './dist/context/**/index.{js,mjs}',
        './dist/hooks/**/*.{js,mjs}',
        './dist/global/**/index.{js,mjs}',
        './dist/utils/**/emotion.{js,mjs}',
      ]),
  }),
);
