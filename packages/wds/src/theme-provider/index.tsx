import { ThemeProvider as NextThemeProvider } from 'next-themes';
import {
  Global,
  ThemeProvider as WdsThemeProvider,
} from '@wanteddev/wds-engine';

import useThemeControl from '../hooks/use-theme-control';

import StoreProvider from './store-provider';

import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  enableDarkMode?: boolean;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined;
  /** Key used to store theme setting in localStorage */
  storageKey?: string | undefined;
  /** Use default global style */
  disableDefaultGlobalStyle?: boolean | undefined;
}> &
  Pick<ComponentPropsWithoutRef<typeof WdsThemeProvider>, 'provider'>;

const ThemeProvider = ({
  children,
  enableDarkMode,
  disableTransitionOnChange = false,
  storageKey = 'theme',
  disableDefaultGlobalStyle = false,
  provider,
}: Props) => {
  // https://github.com/pacocoursey/next-themes/issues/387#issuecomment-4181891723
  const scriptProps =
    typeof window === 'undefined'
      ? undefined
      : ({ type: 'application/json' } as const);

  return (
    <NextThemeProvider
      scriptProps={scriptProps}
      themes={enableDarkMode ? ['light', 'dark'] : ['light']}
      enableSystem={enableDarkMode || false}
      enableColorScheme
      disableTransitionOnChange={disableTransitionOnChange}
      forcedTheme={enableDarkMode ? undefined : 'light'}
      storageKey={storageKey}
    >
      <PrivateThemeProvider
        disableDefaultGlobalStyle={disableDefaultGlobalStyle}
        provider={provider}
      >
        {children}
      </PrivateThemeProvider>
    </NextThemeProvider>
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
                  backgroundColor: themeObj.semantic.background.normal.normal,
                },
              })
        }
      />
    </WdsThemeProvider>
  );
};

export default ThemeProvider;
