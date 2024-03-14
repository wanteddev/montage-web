import { ThemeProvider } from '@wanteddev/wds';
import { Global, css } from '@emotion/react';
import prettier from 'prettier/standalone';
import prettierTypeScript from 'prettier/parser-typescript';
import prettierBabel from 'prettier/parser-babel';

import type { Decorator } from '@storybook/react';
import type { PropsWithChildren } from 'react';

import '@wanteddev/wds/global.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      showName: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    disable: true,
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5,
      offsetX: 0,
      offsetY: 0,
    },
  },
  /**
   * https://github.com/storybookjs/storybook/issues/8078#issuecomment-1805883014
   * Biome js api 고려
   */
  docs: {
    transformSource: (input: any) => {
      try {
        return prettier.format(input, {
          parser: 'babel-ts',
          plugins: [prettierBabel, prettierTypeScript],
        });
      } catch (err) {
        return input;
      }
    },
  },
};

const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  return (
    <ThemeProvider forcedTheme={theme || 'light'} enableSystem={false}>
      <ThemeBlock>
        <StoryFn />
      </ThemeBlock>

      <Global
        styles={(theme) => ({
          ['.docs-story']: {
            // @ts-expect-error
            backgroundColor: theme.palette.background.normal.normal,

            ['& > div']: {
              padding: '0',

              ['& > div']: {
                transformOrigin: 'initial',
                transform: 'initial',
              },
            },
          },
          ['.sb-show-main']: {
            // @ts-expect-error
            backgroundColor: theme.palette.background.normal.normal,
          },
        })}
      />
    </ThemeProvider>
  );
};

export const decorators = [withTheme];

const ThemeBlock = ({ children }: PropsWithChildren) => (
  <div
    css={(theme) => css`
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 1rem;
      background: ${theme.palette.background.normal.normal};

      @media (max-width: ${theme.breakpoint.sm}) {
        padding: 0;
      }
    `}
  >
    {children}
  </div>
);
