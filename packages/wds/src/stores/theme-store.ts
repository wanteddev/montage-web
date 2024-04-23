'use client';

import { createStore } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

import type { StoreApi } from 'zustand';

export type Attribute = `data-${string}` | 'class';

export type ThemeString = 'dark' | 'light' | 'system';

export type ThemeState = {
  /** Active theme name */
  theme?: string | undefined;
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string | undefined;
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: 'dark' | 'light' | undefined;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  storageKey?: string | undefined;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string | undefined;
  enableDarkMode?: boolean;
};

export type ThemeActions = {
  setTheme: (theme: string | undefined) => void;
  setResolvedTheme: (theme: string | undefined) => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const defaultInitState: ThemeState = {};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    setTheme: (theme) =>
      set((state) => ({
        theme,
        resolvedTheme:
          theme === 'system' ? state.systemTheme || state.resolvedTheme : theme,
      })),
    setResolvedTheme: (resolvedTheme) =>
      set((state) => ({
        resolvedTheme: state.theme === 'system' ? resolvedTheme : state.theme,
        systemTheme: (state.enableDarkMode ? resolvedTheme : undefined) as
          | 'light'
          | 'dark'
          | undefined,
      })),
  }));
};

export const ThemeContext = createContext<StoreApi<ThemeStore> | null>(null);

export const useThemeStore = <T>(selector: (store: ThemeStore) => T): T => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(`useThemeStore must be use within ThemeProvider`);
  }

  return useStore(context, selector);
};
