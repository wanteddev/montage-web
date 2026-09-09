import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ThemeContextProvider } from '../contexts';

import {
  clearHostOnlyThemeCookie,
  detectBlockedThemeScript,
  disableAnimation,
  getSystemTheme,
  getThemeCookie,
  isThemeMode,
  reportBlockedThemeScript,
  resolveThemeCookieOptions,
  setThemeCookie,
} from './helpers';
import { COLOR_SCHEME_QUERY, THEME_ATTRIBUTE } from './constants';
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
    maxAge: cookieMaxAgeOption,
    sameSite: cookieSameSiteOption,
    secure: cookieSecureOption,
  } = cookie ?? {};

  // Memoized so an invalid option is reported once per value, not per render
  const resolvedCookie = useMemo(
    () =>
      resolveThemeCookieOptions({
        key: cookieKeyOption,
        domain: cookieDomainOption,
        path: cookiePathOption,
        maxAge: cookieMaxAgeOption,
        sameSite: cookieSameSiteOption,
        secure: cookieSecureOption,
      }),
    [
      cookieKeyOption,
      cookieDomainOption,
      cookiePathOption,
      cookieMaxAgeOption,
      cookieSameSiteOption,
      cookieSecureOption,
    ],
  );

  const {
    key: cookieKey,
    domain: cookieDomain,
    path: resolvedCookiePath,
  } = resolvedCookie;

  const defaultTheme: ThemeMode = enableSystem ? 'system' : 'light';

  const [theme, setThemeState] = useState<ThemeMode | undefined>(() => {
    // Runs before the first read for the client-render path, where the inline
    // script never executes (React does not run scripts set via innerHTML).
    // A forced provider never mutates cookies — it renders one theme whatever
    // is stored, so deleting a sibling app's cookie is pure collateral. The
    // inline script skips the cleanup when forced for the same reason.
    if (!cookieDomain || forcedTheme) {
      return getThemeCookie(cookieKey);
    }

    // Read before clearing as well as after: on the first load where a host
    // gains a domain, the host-only cookie is the only one holding a value and
    // dropping it blind would reset the user's choice. The persist effect
    // writes the kept value back with the domain attached.
    const shadowed = getThemeCookie(cookieKey);

    clearHostOnlyThemeCookie(cookieKey, resolvedCookiePath);

    return getThemeCookie(cookieKey) ?? shadowed;
  });
  const [systemTheme, setSystemTheme] = useState<ResolvedThemeMode | undefined>(
    getSystemTheme,
  );

  // Must be sampled during render — see detectBlockedThemeScript, the signal
  // it reads is gone once React commits
  const blockedThemeScript = useRef(detectBlockedThemeScript());

  useEffect(() => {
    reportBlockedThemeScript(blockedThemeScript.current, nonce);
  }, [nonce]);

  const appliedTheme = theme ?? defaultTheme;
  const resolvedTheme =
    forcedTheme ?? (appliedTheme === 'system' ? systemTheme : appliedTheme);

  // Held in a ref so changing an option does not re-run the persist effect and
  // re-write a cookie the user did not touch
  const cookieOptions = useRef(resolvedCookie);
  cookieOptions.current = resolvedCookie;

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

  // Persist theme changes to the cookie. A forced provider never writes: it
  // renders one theme regardless of the stored value, so persisting would push
  // its own cookie options onto a value it does not own — creating a
  // same-named cookie at a different scope on every mount, and letting a
  // `setTheme` call that changes nothing on screen change every sibling app.
  useEffect(() => {
    if (theme && !forcedTheme) {
      setThemeCookie(theme, cookieOptions.current);
    }
  }, [theme, forcedTheme]);

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
      const stored = getThemeCookie(cookieKey);

      // Only adopt a value that is actually there. A missing cookie almost
      // always means the write never stuck (blocked cookies, a rejected
      // `Domain`, Safari evicting script-written storage) rather than a
      // deliberate reset, and overwriting with `undefined` would drop the
      // user's choice every time the tab regains focus.
      if (stored) {
        setThemeState(stored);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncThemeFromCookie();
      }
    };

    // Cookie Store `change` covers every cookie visible to this document, so a
    // write from another subdomain notifies us too — measured on Chrome 141: a
    // document on `a.example.test` is notified when `b.example.test` writes a
    // `Domain`-scoped cookie, even while backgrounded. A sibling's host-only
    // cookie is correctly not reported, since this document cannot see it.
    // lib.dom types cookieStore as always present, but Safari < 18.5,
    // Firefox < 138, non-HTTPS contexts, and jsdom do not provide it. There
    // cookies have no change event of their own (unlike localStorage's
    // `storage`), so the best we can do is re-read whenever the page comes
    // back to the user. `visibilitychange` covers tab switches and minimize;
    // `focus` additionally covers two windows side by side, where both
    // documents stay `visible` and only focus moves between them.
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
