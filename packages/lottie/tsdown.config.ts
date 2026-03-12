import { defineConfiguration } from '../../.tsdown/define-configuration.ts';
import { injectUseClient } from '../../.tsdown/inject-use-client.ts';

export default defineConfiguration({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  onSuccess: () => injectUseClient(['./dist/loading/index.{js,mjs}']),
});
