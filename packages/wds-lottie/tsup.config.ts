import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/define-configuration';
import { injectUseClient } from '../../.tsup/inject-use-client';

export default defineConfig([
  {
    ...defineConfiguration({ entry: ['src/**/*.ts', 'src/**/*.tsx'] }),
    onSuccess: () =>
      injectUseClient([
        './dist/loading/index.{js,mjs}',
        './dist/index.{js,mjs}',
      ]),
  },
]);
