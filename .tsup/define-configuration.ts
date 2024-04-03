import { esbuildPluginFilePathExtensions } from './esbuild-plugin-file-path-extensions';
import { Options } from 'tsup';

export const defineConfiguration = (opts: Pick<Options, 'entry'>): Options => {
  return {
    entry: opts.entry,
    format: ['cjs', 'esm'],
    target: ['chrome91', 'firefox90', 'edge91', 'safari15', 'ios15', 'opera77'],
    outDir: 'dist',
    dts: true,
    clean: true,
    bundle: true,
    external: ['react', 'react-dom', 'react-hook-form'],
    esbuildPlugins: [
      esbuildPluginFilePathExtensions({ cjsExtension: 'js' }),
    ],
  };
};
