import { defineConfig } from 'tsdown';

import type { Options } from 'tsdown';

export const defineConfiguration = (opts: Partial<Options>) =>
  defineConfig({
    format: ['cjs', 'esm'],
    target: ['chrome91', 'firefox90', 'edge91', 'safari15', 'ios15', 'opera77'],
    outDir: 'dist',
    dts: true,
    clean: true,
    treeshake: true,
    bundle: true,
    external: ['react', 'react-dom', 'next'],
    cjsDefault: false,
    ...opts,
    outputOptions: {
      preserveModules: true,
      ...opts.outputOptions,
    },
    entry: Array.isArray(opts.entry)
      ? opts.entry.concat(['!src/**/*.test.*'])
      : {
          ...(typeof opts.entry === 'string'
            ? { [opts.entry]: opts.entry }
            : opts.entry),
          test: '!src/**/*.test.*',
        },
  });
