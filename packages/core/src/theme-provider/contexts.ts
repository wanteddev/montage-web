import { createContext } from '@radix-ui/react-context';

import type { ThemeContextType } from './types';

/**
 * Matches the next-themes behavior of returning a harmless default instead of
 * throwing when the hook is used outside of ThemeProvider.
 */
const DEFAULT_THEME_CONTEXT: ThemeContextType = {
  theme: undefined,
  resolvedTheme: undefined,
  systemTheme: undefined,
  forcedTheme: undefined,
  setTheme: () => undefined,
  nonce: undefined,
};

export const [ThemeContextProvider, useThemeContext] =
  createContext<ThemeContextType>('ThemeProvider', DEFAULT_THEME_CONTEXT);
