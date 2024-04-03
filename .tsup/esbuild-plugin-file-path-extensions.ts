import type {
  BuildOptions,
  OnLoadOptions,
  OnResolveArgs,
  OnResolveResult,
  Plugin,
  PluginBuild,
} from 'esbuild';
import { extname, join } from 'node:path';
import { existsSync, lstatSync } from 'node:fs';

export interface PluginOptions {
  /**
   * The [esbuild filter](https://esbuild.github.io/plugins/#filters) to
   * apply for the filtering of files to parse with this plugin
   *
   * @default /.*​/
   */
  filter?: OnLoadOptions['filter'];
  /**
   * The [esbuild namespace](https://esbuild.github.io/plugins/#namespaces) to
   * which the plugin should apply
   *
   * @default undefined
   */
  namespace?: OnLoadOptions['namespace'];
  /**
   * Whether the current build is for ESM or not.
   *
   * Accepts either a boolean value or a function that returns a boolean value.
   * The function may also return a Promise which will be resolved first.
   *
   * In order to account for the cross-target capabilities of `tsup` the default is:
   * @default build.initialOptions?.define?.TSUP_FORMAT === '"esm"'
   *
   */
  esm?: boolean | ((initialOptions: BuildOptions) => Awaitable<boolean>);
  /**
   * The extension to apply for CJS code.
   * @remark Make sure to **NOT** start with a leading `.`.
   *
   * @default 'js'
   */
  cjsExtension?: string | ((initialOptions: BuildOptions) => Awaitable<string>);
  /**
   * The extension to apply for ESM code.
   * @remark Make sure to **NOT** start with a leading `.`.
   *
   * @default 'mjs'
   */
  esmExtension?: string | ((initialOptions: BuildOptions) => Awaitable<string>);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(input: unknown): input is Function {
  return typeof input === 'function';
}

function getFilter(options: PluginOptions): RegExp {
  if (!options.filter) {
    return /.*/;
  }

  if (Object.prototype.toString.call(options.filter) !== '[object RegExp]') {
    console.warn(
      `Plugin "esbuild-plugin-file-path-extensions": Options.filter must be a RegExp object, but gets an '${typeof options.filter}' type. \nThis request will match ANY file!`,
    );
    return /.*/;
  }

  return options.filter ?? /.*/;
}

async function getIsEsm(
  build: PluginBuild,
  options: PluginOptions,
): Promise<boolean> {
  if (typeof options.esm === 'undefined') {
    return build.initialOptions.define?.TSUP_FORMAT === '"esm"';
  }

  if (typeof options.esm === 'boolean') {
    return options.esm;
  }

  return isFunction(options.esm)
    ? options.esm(build.initialOptions)
    : options.esm;
}

async function getEsmExtension(
  build: PluginBuild,
  options: PluginOptions,
): Promise<string> {
  if (typeof options.esmExtension === 'undefined') {
    return 'mjs';
  }

  if (typeof options.esmExtension === 'string') {
    return options.esmExtension;
  }

  return isFunction(options.esmExtension)
    ? options.esmExtension(build.initialOptions)
    : options.esmExtension;
}

async function getCjsExtension(
  build: PluginBuild,
  options: PluginOptions,
): Promise<string> {
  if (typeof options.cjsExtension === 'undefined') {
    return 'cjs';
  }

  if (typeof options.cjsExtension === 'string') {
    return options.cjsExtension;
  }

  return isFunction(options.cjsExtension)
    ? options.cjsExtension(build.initialOptions)
    : options.cjsExtension;
}

function pathExtIsJsLikeExtension(path: string): boolean {
  const ext = extname(path);

  if (
    // Regular extensions
    ext === '.js' ||
    ext === '.cjs' ||
    ext === '.mjs' ||
    // TypeScript extensions
    ext === '.ts' ||
    ext === '.cts' ||
    ext === '.mts' ||
    // JSX JavaScript extensions
    ext === 'jsx' ||
    ext === '.cjsx' ||
    ext === '.mjsx' ||
    // JSX TypeScript extensions
    ext === '.tsx' ||
    ext === '.ctsx' ||
    ext === '.mtsx'
  ) {
    return true;
  }

  return false;
}

function resolvePathIsDirectory(path: string): boolean {
  if (
    // Regular extensions
    path.endsWith('.js') ||
    path.endsWith('.cjs') ||
    path.endsWith('.mjs') ||
    // TypeScript extensions
    path.endsWith('.ts') ||
    path.endsWith('.cts') ||
    path.endsWith('.mts') ||
    // JSX JavaScript extensions
    path.endsWith('jsx') ||
    path.endsWith('.cjsx') ||
    path.endsWith('.mjsx') ||
    // JSX TypeScript extensions
    path.endsWith('.tsx') ||
    path.endsWith('.ctsx') ||
    path.endsWith('.mtsx')
  ) {
    return false;
  }

  const extensions = [
    '.js',
    '.cjs',
    '.mjs',
    '.ts',
    '.cts',
    '.mts',
    '.jsx',
    '.cjsx',
    '.mjsx',
    '.tsx',
    '.ctsx',
    '.mtsx',
  ] as const;

  const fileNotFound = !extensions
    .map((extension) => existsSync(path + extension))
    .some(Boolean);

  try {
    return fileNotFound && lstatSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

async function handleResolve(
  args: OnResolveArgs,
  build: PluginBuild,
  options: PluginOptions,
): Promise<OnResolveResult | undefined> {
  if (args.kind === 'import-statement') {
    const isEsm = await getIsEsm(build, options);
    const esmExtension = await getEsmExtension(build, options);
    const cjsExtension = await getCjsExtension(build, options);

    if (typeof isEsm !== 'boolean') {
      throw new TypeError(
        `isEsm must be a boolean, received ${typeof isEsm} (${isEsm})`,
      );
    }

    if (typeof cjsExtension !== 'string') {
      throw new TypeError(
        `cjsExtension must be a string, received ${typeof cjsExtension} (${cjsExtension})`,
      );
    }

    if (typeof esmExtension !== 'string') {
      throw new TypeError(
        `esmExtension must be a string, received ${typeof esmExtension} (${esmExtension})`,
      );
    }

    if (args.importer) {
      const pathAlreadyHasExt = pathExtIsJsLikeExtension(args.path);

      const isDirectory = resolvePathIsDirectory(
        join(args.resolveDir, args.path),
      );

      if (!pathAlreadyHasExt) {
        return {
          path: `${isDirectory ? args.path + '/index' : args.path}.${isEsm ? esmExtension : cjsExtension}`,
          external: true,
          namespace: options.namespace,
        };
      }
    }
  }

  return undefined;
}

export const esbuildPluginFilePathExtensions = (
  options: PluginOptions = {
    filter: /.*/,
    cjsExtension: 'cjs',
    esmExtension: 'mjs',
  },
): Plugin => {
  const filter = getFilter(options);
  const { namespace } = options;

  return {
    name: 'esbuild-plugin-file-path-extensions',
    setup(build) {
      build.onResolve({ filter, namespace }, (args) =>
        handleResolve(args, build, options),
      );
    },
  };
};

/**
 * The [esbuild-plugin-file-path-extensions](https://github.com/favware/esbuild-plugin-file-path-extensions/#readme) version
 * that you are currently using.
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';

type Awaitable<T> = PromiseLike<T> | T;
