import type { ThemeState } from '../stores/theme-store';

export const getTheme = (key: string, fallback?: string) => {
  if (typeof window === 'undefined') return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = e.matches;
  const systemTheme = isDark ? 'dark' : 'light';

  return systemTheme;
};

export const disableAnimation = () => {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

export const script = ({
  storageKey,
  defaultTheme,
  enableDarkMode,
}: Pick<ThemeState, 'storageKey' | 'defaultTheme' | 'enableDarkMode'>) => {
  const el = document.documentElement;
  const systemThemes = ['light', 'dark'];

  const updateDOM = (theme: string | undefined) => {
    if (theme) {
      el.setAttribute('data-theme', theme);
    } else {
      el.removeAttribute('data-theme');
    }

    setColorScheme(theme);
  };

  const setColorScheme = (theme: string | undefined) => {
    if (theme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme;
    } else {
      el.style.colorScheme = '';
    }
  };

  try {
    const themeName = localStorage.getItem(storageKey!) || defaultTheme;
    const isSystem = enableDarkMode && themeName === 'system';
    const theme = isSystem ? getSystemTheme() : themeName;

    updateDOM(theme);
  } catch (e) {
    //
  }
};
