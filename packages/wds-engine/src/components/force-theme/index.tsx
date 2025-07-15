import { darkOriginTheme, lightOriginTheme } from '@wanteddev/wds-theme';
import { useMemo } from 'react';

import ThemeContext from '../../context';

import type { ForceThemeProps } from './types';

const ForceTheme = ({ theme: localTheme, children }: ForceThemeProps) => {
  const engineTheme = useMemo(() => {
    switch (localTheme) {
      case 'light':
        return lightOriginTheme;
      case 'dark':
        return darkOriginTheme;
      default: {
        console.error('WDS: Please check if the correct Theme value is set.');
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
