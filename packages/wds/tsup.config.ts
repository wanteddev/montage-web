import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  treeshake: true,
  dts: {
    entry: ['src/index.ts'],
  },
  format: ['cjs', 'esm'],
});
