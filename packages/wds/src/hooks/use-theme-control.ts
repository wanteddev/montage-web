import { useThemeStore } from '../stores/theme-store';

const useThemeControl = () => {
  const { resolvedTheme, setTheme } = useThemeStore((state) => state);

  return {
    theme: resolvedTheme ? (resolvedTheme as 'light' | 'dark') : 'light',
    setTheme: setTheme as (theme: 'light' | 'dark' | 'system') => void,
  };
};

export default useThemeControl;
