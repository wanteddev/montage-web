'use client';
import { ThemeProvider as DefaultThemeProvider, Global } from '@emotion/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type PropsWithChildren, useMemo } from 'react';

import { theme as themes } from '../theme';
import useThemeControl from '../hooks/use-theme-control';

import StoreProvider from './store-provider';

import type { Theme } from '@emotion/react';

type Props = PropsWithChildren<{
  enableDarkMode?: boolean;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined;
  /** Key used to store theme setting in localStorage */
  storageKey?: string | undefined;
  /* 강제로 테마를 덮어씌울 때 사용합니다. */
  forcedTheme?: 'light' | 'dark' | undefined;
  /** Use default global style */
  disableDefaultGlobalStyle?: boolean | undefined;
}>;

const ThemeProvider = ({
  children,
  enableDarkMode,
  disableTransitionOnChange = false,
  forcedTheme,
  storageKey = 'theme',
  disableDefaultGlobalStyle = false,
}: Props) => {
  return (
    <NextThemeProvider
      themes={enableDarkMode ? ['light', 'dark'] : ['light']}
      enableSystem={enableDarkMode || false}
      enableColorScheme
      disableTransitionOnChange={disableTransitionOnChange}
      forcedTheme={forcedTheme}
      storageKey={storageKey}
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
