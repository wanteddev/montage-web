import { Global, ThemeProvider as WdsThemeProvider } from '@montage-ui/engine';

import useThemeControl from '../hooks/use-theme-control';

import CookieThemeProvider from './cookie-theme-provider';
import StoreProvider from './store-provider';

import type { ThemeCookieOptions, ThemeProviderProps } from './types';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

const ThemeProvider = ({
  children,
  enableDarkMode,
  disableTransitionOnChange = false,
  cookie,
  disableDefaultGlobalStyle = false,
  provider,
  nonce,
}: ThemeProviderProps) => {
  return (
    <CookieThemeProvider
      enableSystem={enableDarkMode || false}
      disableTransitionOnChange={disableTransitionOnChange}
      forcedTheme={enableDarkMode ? undefined : 'light'}
      cookie={cookie}
      nonce={nonce}
    >
      <PrivateThemeProvider
        disableDefaultGlobalStyle={disableDefaultGlobalStyle}
        provider={provider}
      >
        {children}
      </PrivateThemeProvider>
    </CookieThemeProvider>
  );
};

const PrivateThemeProvider = ({
  children,
  disableDefaultGlobalStyle,
  provider,
}: PropsWithChildren<{ disableDefaultGlobalStyle: boolean }> &
  Pick<ComponentPropsWithoutRef<typeof WdsThemeProvider>, 'provider'>) => {
  const { theme } = useThemeControl();

  return (
    <WdsThemeProvider theme={theme} provider={provider}>
      <StoreProvider>{children}</StoreProvider>

      <Global
        styles={
          disableDefaultGlobalStyle
            ? undefined
            : (themeObj) => ({
                body: {
                  backgroundColor: themeObj.semantic.background.neutral.primary,
                },
              })
        }
      />
    </WdsThemeProvider>
  );
};

export default ThemeProvider;
export type { ThemeCookieOptions, ThemeProviderProps };
