'use client';

import { type StoreApi } from 'zustand';
import { memo, useCallback, useEffect, useRef } from 'react';

import {
  ThemeContext,
  createThemeStore,
  useThemeStore,
} from '../stores/theme-store';

import { disableAnimation, getSystemTheme, getTheme, script } from './helpers';

import type { PropsWithChildren } from 'react';
import type { ThemeState, ThemeStore } from '../stores/theme-store';

const colorSchemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';

export type ThemeProviderProps = PropsWithChildren<
  Omit<ThemeState, 'theme' | 'resolvedTheme' | 'systemTheme'>
>;

const NextThemeProvider = ({
  disableTransitionOnChange = false,
  enableDarkMode = false,
  storageKey = 'theme',
  defaultTheme = enableDarkMode ? 'system' : 'light',
  children,
}: ThemeProviderProps) => {
  const themeStoreRef = useRef<StoreApi<ThemeStore>>();

  if (!themeStoreRef.current) {
    themeStoreRef.current = createThemeStore({
      theme: getTheme(storageKey, defaultTheme),
      storageKey,
      enableDarkMode,
      resolvedTheme:
        getTheme(storageKey, defaultTheme) === 'system'
          ? getTheme(storageKey)
          : getTheme(storageKey, defaultTheme),
      systemTheme: (enableDarkMode ? getTheme(storageKey) : undefined) as
        | 'light'
        | 'dark'
        | undefined,
      disableTransitionOnChange,
      defaultTheme,
    });
  }

  return (
    <ThemeContext.Provider value={themeStoreRef.current}>
      <Theme />
      {children}
    </ThemeContext.Provider>
  );
};

const Theme = memo(() => {
  const {
    theme,
    enableDarkMode,
    disableTransitionOnChange,
    defaultTheme,
    storageKey,
    setTheme,
    setResolvedTheme,
  } = useThemeStore((state) => state);

  const applyTheme = useCallback(
    (newTheme: string | undefined) => {
      let resolved = newTheme;
      if (!resolved) return;

      // If theme is system, resolve it before setting theme
      if (newTheme === 'system' && enableDarkMode) {
        resolved = getSystemTheme();
      }

      const name = resolved;
      const enable = disableTransitionOnChange ? disableAnimation() : null;
      const root = document.documentElement;

      if (name) {
        root.setAttribute('data-theme', name);
      } else {
        root.removeAttribute('data-theme');
      }

      const fallback = colorSchemes.includes(defaultTheme!)
        ? defaultTheme
        : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;

      root.style.colorScheme = colorScheme || '';

      enable?.();
    },
    [defaultTheme, disableTransitionOnChange, enableDarkMode],
  );

  const setThemeState = useCallback(
    (newTheme: string | undefined) => {
      setTheme(newTheme);

      // Save to storage
      try {
        localStorage.setItem(storageKey!, newTheme || '');
      } catch (e) {
        // Unsupported
      }
    },
    [setTheme, storageKey],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);
      console.log(resolved, 'resolved');

      applyTheme(theme);
      if (theme === 'system' && enableDarkMode) {
        console.log('system');
      }
    },
    [setResolvedTheme, theme, enableDarkMode, applyTheme],
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }

      setThemeState(e.newValue || defaultTheme);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [defaultTheme, setThemeState, storageKey]);

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(${script.toString()})(${JSON.stringify({ storageKey, enableDarkMode, defaultTheme })})`,
      }}
    />
  );
});

export default NextThemeProvider;
