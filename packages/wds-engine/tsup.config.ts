import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/define-configuration';
import { injectUseClient } from '../../.tsup/inject-use-client';

export default defineConfig([
  {
    ...defineConfiguration({ entry: ['src/**/*.ts', 'src/**/*.tsx'] }),
    onSuccess: () =>
      injectUseClient([
        './dist/box/**/index.{js,mjs}',
        './dist/theme-provider/**/index.{js,mjs}',
        './dist/global/**/index.{js,mjs}',
      ]),
  },
]);
