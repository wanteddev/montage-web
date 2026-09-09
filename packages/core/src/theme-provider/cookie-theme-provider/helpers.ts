import {
  AUTO_COOKIE_DOMAIN,
  COLOR_SCHEME_QUERY,
  DEFAULT_THEME_COOKIE_KEY,
  DEFAULT_THEME_COOKIE_MAX_AGE,
  DEFAULT_THEME_COOKIE_PATH,
  DOMAIN_PROBE_COOKIE_KEY,
  HOST_COOKIE_NAME_PREFIX,
  HOST_ONLY_COOKIE_DOMAIN,
  SECURE_COOKIE_NAME_PREFIX,
  THEME_ATTRIBUTE,
  THEME_SCRIPT_ATTRIBUTE,
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

type SameSite = keyof typeof SAME_SITE_LABEL;

const SAME_SITE_VALUES = ['lax', 'strict', 'none'] as const;

/**
 * Constraints the browser enforces on a prefixed cookie name.
 *
 * `__Secure-` and `__Host-` are not naming conventions — a cookie whose
 * attributes do not satisfy them is rejected outright, with no error and no
 * failed return value. Line the attributes up instead of writing a cookie that
 * cannot be stored.
 */
export const getCookieNamePrefixRule = (
  key: string,
): { requireSecure: boolean; requireHostOnly: boolean } => ({
  requireSecure:
    key.startsWith(SECURE_COOKIE_NAME_PREFIX) ||
    key.startsWith(HOST_COOKIE_NAME_PREFIX),
  requireHostOnly: key.startsWith(HOST_COOKIE_NAME_PREFIX),
});

/**
 * `Max-Age` takes digits only. A decimal, a `NaN` from a bad env var, or a
 * negative number makes the browser drop the attribute and store a session
 * cookie instead — the theme then survives until the browser closes and no
 * longer. `0` is worse: it expires the cookie the moment it is written.
 */
export const safeCookieMaxAge = (
  value: number | undefined,
): number | undefined => {
  if (value !== undefined && (!Number.isInteger(value) || value <= 0)) {
    console.error(
      '[Montage] ThemeProvider cookie.maxAge must be a positive integer number of seconds. The option was ignored.',
    );

    return undefined;
  }

  return value;
};

/**
 * An unrecognized value serializes to `SameSite=undefined`, which the browser
 * ignores — silently falling back to Lax rather than the stricter or looser
 * policy the caller asked for.
 */
export const safeCookieSameSite = (
  value: SameSite | undefined,
): SameSite | undefined => {
  if (value !== undefined && !SAME_SITE_VALUES.includes(value)) {
    console.error(
      `[Montage] ThemeProvider cookie.sameSite must be one of ${SAME_SITE_VALUES.join(
        ', ',
      )}. The option was ignored.`,
    );

    return undefined;
  }

  return value;
};

/**
 * A `Secure` cookie cannot be written from an insecure context, so report the
 * combination rather than letting the write disappear. `localhost` counts as
 * secure; a plain-HTTP staging host or an IP does not.
 */
export const reportInsecureContext = (secure: boolean): void => {
  if (
    secure &&
    typeof window !== 'undefined' &&
    window.isSecureContext === false
  ) {
    console.error(
      '[Montage] ThemeProvider is writing a Secure theme cookie from an insecure context, so the browser will drop it. Serve the page over HTTPS, or avoid sameSite "none" and the __Secure-/__Host- cookie name prefixes here.',
    );
  }
};

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
 * RFC 6265 `cookie-name` is an RFC 2616 token. The set already excludes `;` and
 * the CTLs, so this is a strictly stronger check than {@link safeCookieAttribute}
 * — `=`, whitespace and quotes are rejected too, and so is an empty name.
 *
 * `=` matters most: `key: 'theme=x'` serializes to `theme=x=dark`, which the
 * browser stores under the name `theme` — silently clobbering an unrelated
 * `theme` cookie — while the reader keeps looking for `theme=x` and never
 * matches.
 */
const COOKIE_NAME_PATTERN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

export const safeCookieKey = (
  value: string | undefined,
): string | undefined => {
  if (value !== undefined && !COOKIE_NAME_PATTERN.test(value)) {
    console.error(
      '[Montage] ThemeProvider cookie.key must be a valid cookie name (RFC 6265 token). The option was ignored.',
    );

    return undefined;
  }

  return value;
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

/**
 * A cookie of the same name written by anything else can hold a value that is
 * not valid percent-encoding, and `decodeURIComponent` throws a `URIError` on
 * it. This runs inside a `useState` initializer, so an unguarded throw takes
 * the whole tree down — fall back to the raw value and let {@link isThemeMode}
 * reject it.
 */
const decodeThemeValue = (raw: string): string => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const readCookie = (key: string): string | undefined => {
  const entry = document.cookie
    .split('; ')
    .find((cookie) => cookie.slice(0, cookie.indexOf('=')) === key);

  return entry === undefined
    ? undefined
    : decodeThemeValue(entry.slice(entry.indexOf('=') + 1));
};

/**
 * `Path` must be an absolute path. The browser does not reject an empty or
 * relative value — it falls back to the URL's default-path, the directory of
 * whichever page happened to write the cookie. The theme then lands on a
 * different path per entry point, and the deepest one wins every later read.
 */
export const safeCookiePath = (
  value: string | undefined,
): string | undefined => {
  const attribute = safeCookieAttribute('path', value);

  if (attribute !== undefined && !attribute.startsWith('/')) {
    console.error(
      '[Montage] ThemeProvider cookie.path must be an absolute path starting with "/". The option was ignored.',
    );

    return undefined;
  }

  return attribute;
};

export const getThemeCookie = (key: string): ThemeMode | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const value = readCookie(key);

  return isThemeMode(value) ? value : undefined;
};

/**
 * Hosts that cannot carry a `Domain` attribute at all — an IPv4 or IPv6
 * literal, or a single-label host such as `localhost`.
 */
const isDomainlessHost = (hostname: string): boolean =>
  !hostname.includes('.') ||
  hostname.startsWith('[') ||
  /^[\d.]+$/.test(hostname);

/**
 * Write a throwaway cookie at the candidate `Domain` and read it back.
 *
 * The browser silently drops a `Domain` the current host is not allowed to set
 * — a public suffix (`.co.kr`), an unrelated domain, an IP host. There is no
 * error and no return value to check, so the only way to know is to look.
 */
const canWriteCookieDomain = (domain: string): boolean => {
  document.cookie = `${DOMAIN_PROBE_COOKIE_KEY}=1; Path=${DEFAULT_THEME_COOKIE_PATH}; Domain=${domain}; SameSite=Lax`;

  const written = readCookie(DOMAIN_PROBE_COOKIE_KEY) !== undefined;

  if (written) {
    document.cookie = `${DOMAIN_PROBE_COOKIE_KEY}=; Path=${DEFAULT_THEME_COOKIE_PATH}; Domain=${domain}; Max-Age=0`;
  }

  return written;
};

/**
 * Widest first — `.co.kr` is tried before `.wanted.co.kr`. A public suffix is
 * rejected by the browser, so the first candidate that survives the write is
 * the widest scope this host is actually allowed to share. Hosts under an
 * unusual suffix fall out correctly too: `user.github.io` skips `.github.io`
 * and lands on `.user.github.io`.
 */
const findWidestWritableDomain = (hostname: string): string | undefined => {
  const labels = hostname.split('.');

  for (let i = labels.length - 2; i >= 0; i -= 1) {
    const candidate = `.${labels.slice(i).join('.')}`;

    if (canWriteCookieDomain(candidate)) {
      return candidate;
    }
  }

  return undefined;
};

/** Detection is stable for a given host, and probing writes cookies */
const detectedDomainCache = new Map<string, string | undefined>();

export const detectCookieDomain = (): string | undefined => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return undefined;
  }

  const { hostname } = window.location;

  if (detectedDomainCache.has(hostname)) {
    return detectedDomainCache.get(hostname);
  }

  const detected = isDomainlessHost(hostname)
    ? undefined
    : findWidestWritableDomain(hostname);

  detectedDomainCache.set(hostname, detected);

  return detected;
};

/**
 * Resolve the `cookie.domain` option to a literal `Domain` attribute.
 *
 * `'auto'` (the default) detects the widest writable domain so every app under
 * one root domain lands on the same value without coordinating config — a
 * mismatch there produces same-named cookies at different scopes that shadow
 * each other on read. `'none'` opts out and keeps the cookie host-only.
 */
export const resolveCookieDomain = (
  option: string | undefined,
): string | undefined => {
  if (option === HOST_ONLY_COOKIE_DOMAIN) {
    return undefined;
  }

  if (option === undefined || option === AUTO_COOKIE_DOMAIN) {
    return detectCookieDomain();
  }

  return safeCookieAttribute('domain', option);
};

/**
 * Every `Path` whose cookies reach the current URL, from `/` down.
 *
 * Deleting a cookie needs an exact `Path` match, while a read returns the
 * DEEPEST matching cookie first. So a host-only cookie left at a deeper path —
 * an older deploy's `cookie.path`, or a `Path=` the browser resolved to the
 * URL's default-path — shadows the shared cookie on every page beneath it, and
 * one delete at the configured path never reaches it. Measured in Chrome 141:
 * with a host-only cookie at `/app` and a domain cookie at `/`, a page at
 * `/app/settings` reads the `/app` value and `Path=/` deletion leaves it
 * untouched.
 *
 * Depth is bounded by the URL, so this is a handful of writes.
 */
const hostOnlyCleanupPaths = (configuredPath: string): Array<string> => {
  const paths = new Set([DEFAULT_THEME_COOKIE_PATH, configuredPath]);

  if (typeof window !== 'undefined') {
    let current = '';

    for (const segment of window.location.pathname.split('/').filter(Boolean)) {
      current += `/${segment}`;
      paths.add(current);
    }
  }

  return [...paths];
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

  for (const candidate of hostOnlyCleanupPaths(path)) {
    document.cookie = `${key}=; Path=${candidate}; Max-Age=0`;
  }
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

export type ResolvedThemeCookieOptions = {
  key: string;
  domain: string | undefined;
  path: string;
  maxAge: number | undefined;
  sameSite: SameSite | undefined;
  secure: boolean | undefined;
};

/**
 * Validate every cookie option in one place and report what was dropped.
 *
 * Each option fails the same way when it is wrong: the browser refuses the
 * write and `document.cookie` reports nothing, so the theme simply stops
 * persisting. Reporting here is the only signal a consumer gets.
 */
export const resolveThemeCookieOptions = ({
  key,
  domain,
  path,
  maxAge,
  sameSite,
  secure,
}: ThemeCookieOptions = {}): ResolvedThemeCookieOptions => {
  const resolvedKey = safeCookieKey(key) ?? DEFAULT_THEME_COOKIE_KEY;
  const { requireSecure, requireHostOnly } =
    getCookieNamePrefixRule(resolvedKey);

  if (
    domain === HOST_ONLY_COOKIE_DOMAIN &&
    resolvedKey === DEFAULT_THEME_COOKIE_KEY
  ) {
    // Opting out of a `Domain` stops this app from WRITING a shared cookie; it
    // cannot stop the browser from SENDING one a sibling app wrote, and
    // `document.cookie` gives no way to tell the two apart. The shared value is
    // then read here and copied into this app's host-only cookie, which wins
    // every later read — leaving this app pinned to a stale theme forever.
    // Isolating the name is the only thing that actually opts out.
    console.error(
      '[Montage] ThemeProvider cookie.domain "none" only stops this app from writing a shared cookie — a cookie of the same name written by another app under the same root domain is still sent here, and would be copied into this app\'s host-only cookie and then never updated again. Give this app its own cookie.key as well.',
    );
  }
  const resolvedPath = safeCookiePath(path) ?? DEFAULT_THEME_COOKIE_PATH;

  if (requireHostOnly && domain !== HOST_ONLY_COOKIE_DOMAIN) {
    console.error(
      `[Montage] ThemeProvider cookie.key "${resolvedKey}" uses the __Host- prefix, which forbids a Domain attribute. The theme is stored host-only and is NOT shared across subdomains.`,
    );
  }

  if (requireHostOnly && resolvedPath !== DEFAULT_THEME_COOKIE_PATH) {
    console.error(
      `[Montage] ThemeProvider cookie.key "${resolvedKey}" uses the __Host- prefix, which pins Path to "/". cookie.path was ignored.`,
    );
  }

  if (requireSecure && secure === false) {
    console.error(
      `[Montage] ThemeProvider cookie.key "${resolvedKey}" requires the Secure attribute. cookie.secure=false was ignored.`,
    );
  }

  const resolved: ResolvedThemeCookieOptions = {
    key: resolvedKey,
    domain: requireHostOnly ? undefined : resolveCookieDomain(domain),
    path: requireHostOnly ? DEFAULT_THEME_COOKIE_PATH : resolvedPath,
    maxAge: safeCookieMaxAge(maxAge),
    sameSite: safeCookieSameSite(sameSite),
    secure: requireSecure || secure,
  };

  reportInsecureContext(resolved.secure ?? resolved.sameSite === 'none');

  return resolved;
};

/**
 * Detect an inline theme script that was rendered but never executed.
 *
 * MUST be called during render, before React commits. Two things are only true
 * at that moment:
 *
 * - The document still shows the server's `<script>`, with no `type`. The
 *   client render marks the script `application/json`, and after hydration the
 *   server's element was observed carrying that value (Chrome 141) — not in
 *   every case, but often enough that a post-commit read cannot tell a blocked
 *   script from a normal one.
 * - A client-only render has not inserted the element yet, so it reads as
 *   absent — exactly the case that must stay silent, since React never runs a
 *   script set through innerHTML anyway.
 */
export const detectBlockedThemeScript = (): boolean => {
  if (typeof document === 'undefined') {
    return false;
  }

  // The script paints the document during parse, so the attribute means it ran
  if (document.documentElement.hasAttribute(THEME_ATTRIBUTE)) {
    return false;
  }

  const script = document.querySelector(`script[${THEME_SCRIPT_ATTRIBUTE}]`);

  return script instanceof HTMLScriptElement && script.type === '';
};

/**
 * The script is the entire no-flash mechanism: colors come from CSS variables
 * that a static stylesheet swaps on `[data-theme]`, so until the attribute is
 * set the document paints in the light palette no matter what is stored. A CSP
 * without a matching `nonce` blocks it silently — no exception reaches the page
 * and nothing in React notices.
 */
export const reportBlockedThemeScript = (
  blocked: boolean,
  nonce: string | undefined,
): void => {
  if (!blocked) {
    return;
  }

  console.error(
    `[Montage] The ThemeProvider inline script did not run, so the first paint used the default theme instead of the stored one. A Content-Security-Policy that blocks inline scripts is the usual cause — ${
      nonce
        ? 'verify that the `nonce` passed to ThemeProvider matches the one in the CSP header.'
        : 'pass ThemeProvider a `nonce` matching the one in the CSP header.'
    }`,
  );
};
