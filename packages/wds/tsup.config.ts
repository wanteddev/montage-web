import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  minify: true,
  dts: {
    entry: ['src/index.ts', 'src/declare.ts'],
  },
  format: ['cjs', 'esm'],
});
