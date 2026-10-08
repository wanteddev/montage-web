import type { ResolvedThemeMode, ThemeMode } from '../../types';

export type ThemeScriptProps = {
  cookieKey: string;
  cookiePath: string;
  /**
   * Whether the cookie is configured to be `Domain`-scoped (`'auto'` or an
   * explicit domain). When set, the script drops same-named host-only cookies
   * if the values it reads disagree. A flag rather than the detected domain:
   * the server cannot detect one, and the script it renders is the one that runs.
   */
  domainScoped: boolean;
  defaultTheme: ThemeMode;
  forcedTheme?: ResolvedThemeMode | undefined;
  enableSystem: boolean;
  nonce?: string | undefined;
};
