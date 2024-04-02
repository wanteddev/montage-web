import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string[]} opts.entry - The entry array.
 * @returns {import('tsup').Options}
 */
export const defineConfiguration = (opts) => {
  return {
    entry: opts.entry,
    format: ['cjs', 'esm'],
    target: ['chrome91', 'firefox90', 'edge91', 'safari15', 'ios15', 'opera77'],
    outDir: 'dist',
    dts: true,
    clean: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
  };
};
