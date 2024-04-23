'use client';
import { ThemeProvider as DefaultThemeProvider, Global } from '@emotion/react';
import { type PropsWithChildren, useMemo } from 'react';

import { theme as themes } from '../theme';
import useThemeControl from '../hooks/use-theme-control';

import NextThemeProvider from './next-theme-provider';
import StoreProvider from './store-provider';

import type { ThemeProviderProps } from './next-theme-provider';
import type { Theme } from '@emotion/react';

type Props = ThemeProviderProps & {
  /** Use default global style */
  disableDefaultGlobalStyle?: boolean | undefined;
};

const ThemeProvider = ({
  children,
  enableDarkMode = false,
  defaultTheme = enableDarkMode ? 'system' : 'light',
  disableTransitionOnChange = false,
  storageKey = 'theme',
  disableDefaultGlobalStyle = false,
}: Props) => {
  return (
    <NextThemeProvider
      enableDarkMode={enableDarkMode}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      defaultTheme={defaultTheme}
    >
      <EmotionThemeProvider
        disableDefaultGlobalStyle={disableDefaultGlobalStyle}
      >
        {children}
      </EmotionThemeProvider>
    </NextThemeProvider>
  );
};

const EmotionThemeProvider = ({
  children,
  disableDefaultGlobalStyle,
}: PropsWithChildren<{ disableDefaultGlobalStyle: boolean }>) => {
  const { theme } = useThemeControl();

  const themeObject = useMemo(() => {
    return themes[theme];
  }, [theme]);

  return (
    <DefaultThemeProvider theme={themeObject as Theme}>
      <StoreProvider>{children}</StoreProvider>

      <Global
        styles={
          disableDefaultGlobalStyle
            ? undefined
            : {
                body: {
                  backgroundColor: themeObject.palette.background.normal.normal,
                },
                ['*:focus-visible']: {
                  outlineColor: themeObject.palette.primary.normal,
                },
              }
        }
      />
    </DefaultThemeProvider>
  );
};

export default ThemeProvider;
