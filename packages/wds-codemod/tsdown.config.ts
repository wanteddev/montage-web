import { defineConfiguration } from '../../.tsdown/define-configuration.ts';

export default defineConfiguration({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  format: ['cjs'],
  deps: { neverBundle: ['path'] },
});
