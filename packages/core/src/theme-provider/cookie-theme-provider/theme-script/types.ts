import type { ResolvedThemeMode, ThemeMode } from '../../types';

export type ThemeScriptProps = {
  cookieKey: string;
  cookiePath: string;
  /** When set, the script drops a same-named host-only cookie before reading */
  cookieDomain?: string | undefined;
  defaultTheme: ThemeMode;
  forcedTheme?: ResolvedThemeMode | undefined;
  enableSystem: boolean;
  nonce?: string | undefined;
};
