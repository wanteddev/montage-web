import type { ThemeProvider as WdsThemeProvider } from '@montage-ui/engine';
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ResolvedThemeMode = 'light' | 'dark';

export type ThemeCookieOptions = {
  /** Cookie name used to persist the theme setting. @default 'montage-theme' */
  key?: string;
  /**
   * Cookie `Domain` attribute, which decides how far the theme is shared.
   *
   * - `'auto'` (default) — detect the widest domain the current host is
   *   allowed to write (`help.wanted.co.kr` resolves to `.wanted.co.kr`) so
   *   every app under one root domain shares the theme without having to
   *   agree on a value. Hosts that cannot carry the attribute at all —
   *   `localhost`, an IP, a preview domain — fall back to host-only.
   * - `'none'` — opt out and keep the cookie host-only, readable from the
   *   exact current host only.
   * - Any other value is used verbatim (e.g. `.wanted.co.kr`).
   *
   * @default 'auto'
   */
  domain?: string;
  /** Cookie `Path` attribute. @default '/' */
  path?: string;
  /** Cookie `Max-Age` in seconds. @default 31536000 (1 year) */
  maxAge?: number;
  /** Cookie `SameSite` attribute. @default 'lax' */
  sameSite?: 'lax' | 'strict' | 'none';
  /** Cookie `Secure` attribute. @default true when `sameSite` is 'none' */
  secure?: boolean;
};

export type ThemeContextType = {
  /** User-selected theme value. `undefined` on the server. */
  theme: ThemeMode | undefined;
  /** Theme actually applied to the document. `undefined` until known. */
  resolvedTheme: ResolvedThemeMode | undefined;
  /** Current `prefers-color-scheme` value. `undefined` on the server. */
  systemTheme: ResolvedThemeMode | undefined;
  /** Theme forced by the provider regardless of the stored value. */
  forcedTheme: ResolvedThemeMode | undefined;
  /** Update the theme. Values other than light/dark/system are ignored. */
  setTheme: Dispatch<SetStateAction<string>>;
  /** CSP nonce applied to the inline theme script */
  nonce?: string | undefined;
};

export type ThemeProviderProps = PropsWithChildren<{
  enableDarkMode?: boolean;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined;
  /** Options for the cookie that persists the theme setting */
  cookie?: ThemeCookieOptions | undefined;
  /** Use default global style */
  disableDefaultGlobalStyle?: boolean | undefined;
  /** CSP nonce applied to the inline theme script */
  nonce?: string | undefined;
}> &
  Pick<ComponentPropsWithoutRef<typeof WdsThemeProvider>, 'provider'>;
