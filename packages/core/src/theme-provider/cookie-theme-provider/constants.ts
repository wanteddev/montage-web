export const THEME_ATTRIBUTE = 'data-theme';

/** Marks the inline script so the provider can tell whether it was allowed to run */
export const THEME_SCRIPT_ATTRIBUTE = 'data-montage-theme-script';

export const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const DEFAULT_THEME_COOKIE_KEY = 'montage-theme';

export const DEFAULT_THEME_COOKIE_PATH = '/';

/** 1 year */
export const DEFAULT_THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** `cookie.domain` value that detects the widest writable domain at runtime */
export const AUTO_COOKIE_DOMAIN = 'auto';

/** `cookie.domain` value that opts out of sharing and keeps the cookie host-only */
export const HOST_ONLY_COOKIE_DOMAIN = 'none';

/** Throwaway cookie name used to test whether a `Domain` is writable */
export const DOMAIN_PROBE_COOKIE_KEY = '__montage-theme-probe';

/** Browser-enforced cookie name prefix: requires `Secure` */
export const SECURE_COOKIE_NAME_PREFIX = '__Secure-';

/** Browser-enforced cookie name prefix: requires `Secure`, `Path=/`, no `Domain` */
export const HOST_COOKIE_NAME_PREFIX = '__Host-';
