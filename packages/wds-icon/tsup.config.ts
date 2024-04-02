import { defineConfig } from 'tsup';

import { defineConfiguration } from '../../.tsup/defineConfiguration.mjs';

export default defineConfig([
  defineConfiguration({ entry: ['src/**/*.ts', 'src/**/*.tsx'] }),
]);
