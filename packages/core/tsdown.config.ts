import { defineConfiguration } from '../../.tsdown/define-configuration.ts';
import { injectUseClient } from '../../.tsdown/inject-use-client.ts';

export default defineConfiguration({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  onSuccess: () =>
    injectUseClient([
      './dist/components/*/*.{js,mjs}',
      './dist/hooks/*.{js,mjs}',
      './dist/stores/*.{js,mjs}',
      './dist/theme-provider/*.{js,mjs}',
      './dist/utils/layout.{js,mjs}',
      './dist/utils/responsive-props.{js,mjs}',
      './dist/utils/typography.{js,mjs}',
      './dist/utils/children.{js,mjs}',
    ]),
});
