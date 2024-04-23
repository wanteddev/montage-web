import { useMemo } from 'react';
import { useTheme } from 'next-themes';

const themes = ['light', 'dark'] as const;

const useThemeControl = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const theme = useMemo(() => {
    if (!resolvedTheme) {
      return 'light';
    }

    return themes.includes(resolvedTheme as any)
      ? (resolvedTheme as (typeof themes)[number])
      : 'light';
  }, [resolvedTheme]);

  return {
    theme,
    setTheme,
  };
};

export default useThemeControl;
