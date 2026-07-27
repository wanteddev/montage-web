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
   * Cookie `Domain` attribute (e.g. `.wanted.co.kr`) that shares the theme
   * across every subdomain of the given domain. When omitted, the attribute
   * is not set at all and the cookie is host-only — readable from the exact
   * current host only.
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
