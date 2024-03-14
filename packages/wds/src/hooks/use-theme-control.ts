import { useTheme } from 'next-themes';
import { useMemo } from 'react';

const useThemeControl = () => {
  const { forcedTheme, resolvedTheme, systemTheme, setTheme } = useTheme();

  const theme = useMemo(() => {
    if (forcedTheme) {
      return forcedTheme as 'dark' | 'light';
    }

    if (resolvedTheme === 'system' && systemTheme) {
      return systemTheme as 'dark' | 'light';
    }

    return resolvedTheme ? (resolvedTheme as 'dark' | 'light') : 'light';
  }, [resolvedTheme, forcedTheme, systemTheme]);

  return {
    theme,
    setTheme,
  };
};

export default useThemeControl;
