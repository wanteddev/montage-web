import { Fragment, useMemo } from 'react';
import { theme } from '@wanteddev/wds-theme';

import ThemeContext from '../../context';

import type { ThemeProviderProps } from './types';

const ThemeProvider = ({
  theme: localTheme = 'light',
  children,
  provider,
}: ThemeProviderProps) => {
  const engineTheme = useMemo(() => {
    switch (localTheme) {
      case 'light':
        return theme.light;
      case 'dark':
        return theme.dark;
      default: {
        console.error('WDS: Please check if the correct Theme value is set.');
      }
    }
  }, [localTheme]);

  const Provider = provider ?? Fragment;

  return (
    <ThemeContext.Provider value={engineTheme!}>
      {Boolean(provider) ? (
        <Provider theme={engineTheme!}>{children}</Provider>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };

export type { ThemeProviderProps };
