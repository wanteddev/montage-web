import { useMemo } from 'react';
import { useTheme } from 'next-themes';

import type { Dispatch, SetStateAction } from 'react';

const themes = ['light', 'dark'] as const;

const useThemeControl: () => {
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<string>>;
} = () => {
  const { resolvedTheme, forcedTheme, setTheme } = useTheme();

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
    setTheme,
  };
};

export default useThemeControl;
