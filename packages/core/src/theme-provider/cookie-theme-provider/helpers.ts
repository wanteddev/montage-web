import {
  COLOR_SCHEME_QUERY,
  DEFAULT_THEME_COOKIE_KEY,
  DEFAULT_THEME_COOKIE_MAX_AGE,
  DEFAULT_THEME_COOKIE_PATH,
} from './constants';

import type {
  ResolvedThemeMode,
  ThemeCookieOptions,
  ThemeMode,
} from '../types';

const SAME_SITE_LABEL = {
  lax: 'Lax',
  strict: 'Strict',
  none: 'None',
} as const;

export const isThemeMode = (value: unknown): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'system';

const hasInvalidCookieChar = (value: string): boolean => {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);

    // 0x3B is ';'; 0x00-0x1F and 0x7F are the CTLs RFC 6265 excludes
    if (code === 0x3b || code <= 0x1f || code === 0x7f) {
      return true;
    }
  }

  return false;
};

/**
 * Guard a value that gets concatenated into a cookie string.
 *
 * Cookie attributes are `;`-separated and the grammar has no escape mechanism,
 * so a value containing `;` or a control character silently turns into extra
 * attributes — widening `Domain`, zeroing `Max-Age`, and so on. Since nothing
 * can escape them, reject at the boundary: report and fall back to the default
 * rather than writing a malformed cookie.
 */
export const safeCookieAttribute = (
  name: string,
  value: string | undefined,
): string | undefined => {
  if (value !== undefined && hasInvalidCookieChar(value)) {
    console.error(
      `[Montage] ThemeProvider cookie.${name} must not contain ';' or control characters. The option was ignored.`,
    );

    return undefined;
  }

  return value;
};

export const getThemeCookie = (key: string): ThemeMode | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const entry = document.cookie
    .split('; ')
    .find((cookie) => cookie.slice(0, cookie.indexOf('=')) === key);

  if (!entry) {
    return undefined;
  }

  const value = decodeURIComponent(entry.slice(entry.indexOf('=') + 1));

  return isThemeMode(value) ? value : undefined;
};

/**
 * Delete a same-named host-only cookie that would shadow the domain-scoped one.
 *
 * A host-only cookie and a `Domain=`-scoped cookie of the same name are
 * separate entries that coexist, and `document.cookie` exposes no `Domain`
 * attribute — so on read they are indistinguishable and the browser returns
 * whichever was created FIRST (RFC 6265 §5.4, since both share `Path`).
 * Dropping the host-only variant makes the read deterministic. Omitting
 * `Domain` here targets the host-only cookie only; the domain cookie survives.
 *
 * Only meaningful when a `domain` is configured — without one the host-only
 * cookie is the cookie we write ourselves.
 */
export const clearHostOnlyThemeCookie = (
  key: string,
  path: string = DEFAULT_THEME_COOKIE_PATH,
): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${key}=; Path=${path}; Max-Age=0`;
};

export const serializeThemeCookie = (
  value: ThemeMode,
  {
    key = DEFAULT_THEME_COOKIE_KEY,
    domain,
    path = DEFAULT_THEME_COOKIE_PATH,
    maxAge = DEFAULT_THEME_COOKIE_MAX_AGE,
    sameSite = 'lax',
    secure = sameSite === 'none',
  }: ThemeCookieOptions = {},
): string => {
  const attributes = [
    `${key}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `Max-Age=${maxAge}`,
    `SameSite=${SAME_SITE_LABEL[sameSite]}`,
  ];

  if (domain) {
    attributes.push(`Domain=${domain}`);
  }

  if (secure) {
    attributes.push('Secure');
  }

  return attributes.join('; ');
};

export const setThemeCookie = (
  value: ThemeMode,
  options: ThemeCookieOptions = {},
): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = serializeThemeCookie(value, options);
};

export const getSystemTheme = (): ResolvedThemeMode | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light';
};

/** Temporarily disable all CSS transitions while the theme attribute flips. */
export const disableAnimation = (nonce?: string) => {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const style = document.createElement('style');

  if (nonce) {
    style.setAttribute('nonce', nonce);
  }

  style.appendChild(
    document.createTextNode('*,*::before,*::after{transition:none!important}'),
  );
  document.head.appendChild(style);

  return () => {
    // Force a restyle so the no-transition rule is applied before removal
    window.getComputedStyle(document.body);

    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };
};
