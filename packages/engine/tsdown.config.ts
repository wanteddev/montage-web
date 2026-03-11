import { defineConfiguration } from '../../.tsdown/define-configuration.ts';
import { injectUseClient } from '../../.tsdown/inject-use-client.ts';

export default defineConfiguration({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  onSuccess: () =>
    injectUseClient([
      './dist/components/*/index.{js,mjs}',
      './dist/context/**/index.{js,mjs}',
      './dist/hooks/**/*.{js,mjs}',
      './dist/global/**/index.{js,mjs}',
      './dist/utils/**/emotion.{js,mjs}',
    ]),
});
