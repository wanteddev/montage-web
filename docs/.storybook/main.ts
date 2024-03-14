import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: getAbsolutePath('@storybook/addon-storysource'),
      options: {
        rule: {
          test: [/\.stories\.(tsx|mdx)?$/],
          include: [resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  viteFinal: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@emotion/react': getAbsolutePath('@emotion/react'),
      },
    };

    return config;
  },

  typescript: {
    // react-docgen-typescript not working atm
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: join(__dirname, '../tsconfig.json'),
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        return prop.parent
          ? !/node_modules\/(?!@wanted-frontend)/.test(prop.parent.fileName)
          : true;
      },
    },
  },

  docs: {
    autodocs: true,
  },
};

export default config;
