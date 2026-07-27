import { useMemo } from 'react';

import { useThemeContext } from '../theme-provider/contexts';

import type { Dispatch, SetStateAction } from 'react';

const themes = ['light', 'dark'] as const;

const useThemeControl: () => {
  theme: 'light' | 'dark';
  themeOriginValue: 'light' | 'dark' | 'system' | undefined;
  setTheme: Dispatch<SetStateAction<string>>;
} = () => {
  const {
    resolvedTheme,
    forcedTheme,
    theme: themeOriginValue,
    setTheme,
  } = useThemeContext('useThemeControl');

  const theme = useMemo(() => {
    if (!resolvedTheme) {
      return 'light';
    }

    if (themes.includes(forcedTheme as any)) {
      return forcedTheme as 'light' | 'dark';
    }

    return themes.includes(resolvedTheme as any)
      ? (resolvedTheme as (typeof themes)[number])
      : 'light';
  }, [resolvedTheme, forcedTheme]);

  return {
    theme,
    themeOriginValue,
    setTheme,
  };
};

export default useThemeControl;
