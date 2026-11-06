import {
  type Theme,
  darkOriginTheme,
  lightOriginTheme,
} from '@montage-ui/theme';
import { useMemo } from 'react';

import ThemeContext from '../../context';

import type { ForceThemeProps } from './types';

const ForceTheme = ({ theme: localTheme, children }: ForceThemeProps) => {
  // Origin themes hold raw values instead of css variables, but share the
  // same token shape, so they are provided as `Theme`.
  const engineTheme = useMemo((): Theme | undefined => {
    switch (localTheme) {
      case 'light':
        return lightOriginTheme as unknown as Theme;
      case 'dark':
        return darkOriginTheme as unknown as Theme;
      default: {
        console.error(
          '[Montage] Please check if the correct Theme value is set.',
        );
      }
    }
  }, [localTheme]);

  return (
    <ThemeContext.Provider value={engineTheme!}>
      {children}
    </ThemeContext.Provider>
  );
};

ForceTheme.displayName = 'ForceTheme';

export { ForceTheme };

export type { ForceThemeProps };
