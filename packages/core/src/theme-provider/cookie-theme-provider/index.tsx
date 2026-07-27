import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ThemeContextProvider } from '../contexts';

import {
  clearHostOnlyThemeCookie,
  disableAnimation,
  getSystemTheme,
  getThemeCookie,
  isThemeMode,
  safeCookieAttribute,
  safeCookieKey,
  setThemeCookie,
} from './helpers';
import {
  COLOR_SCHEME_QUERY,
  DEFAULT_THEME_COOKIE_KEY,
  DEFAULT_THEME_COOKIE_PATH,
  THEME_ATTRIBUTE,
} from './constants';
import ThemeScript from './theme-script';

import type {
  ResolvedThemeMode,
  ThemeCookieOptions,
  ThemeMode,
} from '../types';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

type CookieThemeProviderProps = PropsWithChildren<{
  enableSystem: boolean;
  disableTransitionOnChange: boolean;
  forcedTheme?: ResolvedThemeMode | undefined;
  cookie?: ThemeCookieOptions | undefined;
  nonce?: string | undefined;
}>;

/** Cookie-based drop-in replacement for the next-themes ThemeProvider. */
const CookieThemeProvider = ({
  children,
  enableSystem,
  disableTransitionOnChange,
  forcedTheme,
  cookie,
  nonce,
}: CookieThemeProviderProps) => {
  const {
    key: cookieKeyOption,
    domain: cookieDomainOption,
    path: cookiePathOption,
    maxAge: cookieMaxAge,
    sameSite: cookieSameSite,
    secure: cookieSecure,
  } = cookie ?? {};

  // Memoized so an invalid option is reported once per value, not per render
  const { cookieKey, cookieDomain, resolvedCookiePath } = useMemo(
    () => ({
      cookieKey: safeCookieKey(cookieKeyOption) ?? DEFAULT_THEME_COOKIE_KEY,
      cookieDomain: safeCookieAttribute('domain', cookieDomainOption),
      resolvedCookiePath:
        safeCookieAttribute('path', cookiePathOption) ??
        DEFAULT_THEME_COOKIE_PATH,
    }),
    [cookieKeyOption, cookieDomainOption, cookiePathOption],
  );

  const defaultTheme: ThemeMode = enableSystem ? 'system' : 'light';

  const [theme, setThemeState] = useState<ThemeMode | undefined>(() => {
    // Runs before the first read for the client-render path, where the inline
    // script never executes (React does not run scripts set via innerHTML)
    if (cookieDomain) {
      clearHostOnlyThemeCookie(cookieKey, resolvedCookiePath);
    }

    return getThemeCookie(cookieKey);
  });
  const [systemTheme, setSystemTheme] = useState<ResolvedThemeMode | undefined>(
    getSystemTheme,
  );

  const appliedTheme = theme ?? defaultTheme;
  const resolvedTheme =
    forcedTheme ?? (appliedTheme === 'system' ? systemTheme : appliedTheme);

  const cookieOptions = useRef<ThemeCookieOptions>({});
  cookieOptions.current = {
    key: cookieKey,
    domain: cookieDomain,
    path: resolvedCookiePath,
    maxAge: cookieMaxAge,
    sameSite: cookieSameSite,
    secure: cookieSecure,
  };

  const setTheme: Dispatch<SetStateAction<string>> = useCallback(
    (value) => {
      setThemeState((prevTheme) => {
        const nextTheme =
          typeof value === 'function'
            ? value(prevTheme ?? defaultTheme)
            : value;

        return isThemeMode(nextTheme) ? nextTheme : prevTheme;
      });
    },
    [defaultTheme],
  );

  // Persist theme changes to the cookie
  useEffect(() => {
    if (theme) {
      setThemeCookie(theme, cookieOptions.current);
    }
  }, [theme]);

  // Apply the resolved theme to the document
  useEffect(() => {
    if (!resolvedTheme) {
      return;
    }

    const enableTransition = disableTransitionOnChange
      ? disableAnimation(nonce)
      : undefined;

    document.documentElement.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;

    enableTransition?.();
  }, [resolvedTheme, disableTransitionOnChange, nonce]);

  // Track prefers-color-scheme changes
  useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [enableSystem]);

  // Sync theme changes made in other tabs or on other subdomains
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncThemeFromCookie = () => {
      setThemeState(getThemeCookie(cookieKey));
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncThemeFromCookie();
      }
    };

    // Cookies have no change event of their own (unlike localStorage's
    // `storage`), so without the Cookie Store API the best we can do is
    // re-read whenever the page comes back to the user. `visibilitychange`
    // covers tab switches and minimize; `focus` additionally covers two
    // windows side by side, where both documents stay `visible` and only
    // focus moves between them.
    // lib.dom types cookieStore as always present, but Safari < 18.5,
    // Firefox < 138, non-HTTPS contexts, and jsdom do not provide it.
    const { cookieStore } = window as { cookieStore?: CookieStore };

    cookieStore?.addEventListener('change', syncThemeFromCookie);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', syncThemeFromCookie);

    return () => {
      cookieStore?.removeEventListener('change', syncThemeFromCookie);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', syncThemeFromCookie);
    };
  }, [cookieKey]);

  return (
    <ThemeContextProvider
      theme={typeof document === 'undefined' ? undefined : appliedTheme}
      resolvedTheme={resolvedTheme}
      systemTheme={systemTheme}
      forcedTheme={forcedTheme}
      setTheme={setTheme}
      nonce={nonce}
    >
      <ThemeScript
        cookieKey={cookieKey}
        cookiePath={resolvedCookiePath}
        cookieDomain={cookieDomain}
        defaultTheme={defaultTheme}
        forcedTheme={forcedTheme}
        enableSystem={enableSystem}
        nonce={nonce}
      />
      {children}
    </ThemeContextProvider>
  );
};

export default CookieThemeProvider;
