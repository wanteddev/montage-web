import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  minify: true,
  dts: {
    entry: ['src/index.ts'],
  },
  format: ['cjs', 'esm'],
});
