'use client';
import { ThemeProvider as DefaultThemeProvider, Global } from '@emotion/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ComponentProps, type PropsWithChildren, useMemo } from 'react';

import { theme as themes } from '../theme';
import useThemeControl from '../hooks/use-theme-control';

import StoreProvider from './store-provider';

import type { Theme } from '@emotion/react';

type Props = ComponentProps<typeof NextThemeProvider> & {
  enableDarkMode?: boolean;
};

const ThemeProvider = ({ children, enableDarkMode, ...props }: Props) => {
  return (
    <NextThemeProvider
      themes={enableDarkMode ? ['light', 'dark'] : ['light']}
      enableSystem={enableDarkMode || false}
      {...props}
    >
      <EmotionThemeProvider>{children}</EmotionThemeProvider>
    </NextThemeProvider>
  );
};

const EmotionThemeProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useThemeControl();

  const themeObject = useMemo(() => {
    return themes[theme];
  }, [theme]);

  return (
    <DefaultThemeProvider theme={themeObject as Theme}>
      <StoreProvider>{children}</StoreProvider>

      <Global
        styles={{
          body: {
            backgroundColor: themeObject.palette.background.normal.normal,
          },
        }}
      />
    </DefaultThemeProvider>
  );
};

export default ThemeProvider;
