import { defineConfig } from 'tsdown';

import type { UserConfig } from 'tsdown';

export const defineConfiguration = (opts: Partial<UserConfig>) =>
  defineConfig({
    format: ['cjs', 'esm'],
    target: [
      'chrome108',
      'firefox101',
      'edge108',
      'safari15',
      'ios16',
      'opera94',
    ],
    outDir: 'dist',
    dts: true,
    clean: true,
    treeshake: true,
    deps: {
      neverBundle: ['react', 'react-dom', 'next'],
      ...opts.deps,
    },
    fixedExtension: false,
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
