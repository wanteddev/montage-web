import { defineConfig } from 'tsdown';

import type { UserConfig } from 'tsdown';

export const defineConfiguration = (opts: Partial<UserConfig>) =>
  defineConfig({
    format: ['cjs', 'esm'],
    // Lowest versions that support both CSS `:has()` and `dvh` units, which the
    // styles use without `@supports` fallbacks (see MIGRATION.md "지원 브라우저").
    target: [
      'chrome108',
      'edge108',
      'firefox121',
      'safari15.4',
      'ios15.4',
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
