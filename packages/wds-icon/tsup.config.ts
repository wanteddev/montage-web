import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
});
