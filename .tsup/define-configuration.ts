import { esbuildPluginFilePathExtensions } from './esbuild-plugin-file-path-extensions';

import type { Options } from 'tsup';

export const defineConfiguration = (opts: Partial<Options>): Options => {
  return {
    format: ['cjs', 'esm'],
    target: ['chrome91', 'firefox90', 'edge91', 'safari15', 'ios15', 'opera77'],
    outDir: 'dist',
    dts: true,
    clean: true,
    treeshake: true,
    bundle: true,
    silent: true,
    external: ['react', 'react-dom', 'next'],
    esbuildPlugins: [esbuildPluginFilePathExtensions({ cjsExtension: 'js' })],
    ...opts,
    entry: Array.isArray(opts.entry)
      ? opts.entry.concat(['!src/**/*.test.*'])
      : {
          ...opts.entry,
          test: '!src/**/*.test.*',
        },
  };
};
