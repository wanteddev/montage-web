import {
  COLOR_SCHEME_QUERY,
  DEFAULT_THEME_COOKIE_PATH,
  THEME_ATTRIBUTE,
} from '../constants';
import { getCookieNamePrefixRule } from '../helpers';

import type { ThemeScriptProps } from './types';

export const buildThemeScript = ({
  cookieKey,
  cookiePath,
  domainScoped,
  defaultTheme,
  forcedTheme,
  enableSystem,
}: Omit<ThemeScriptProps, 'nonce'>): string => {
  const apply = `d.setAttribute('${THEME_ATTRIBUTE}',t);d.style.colorScheme=t`;

  if (forcedTheme) {
    return `!function(){try{var d=document.documentElement,t=${JSON.stringify(
      forcedTheme,
    )};${apply}}catch(e){}}()`;
  }

  const resolveSystem = enableSystem
    ? `if(t==='system')t=window.matchMedia('${COLOR_SCHEME_QUERY}').matches?'dark':'light';`
    : `if(t==='system')t='light';`;

  // Reader shared by both passes. Same-named cookies at different scopes all
  // come back as bare `k=v` pairs: when they agree the value is safe, when they
  // disagree the order says nothing about which is current (Chrome lists the
  // most recently changed one last), so the reader returns `null` — distinct
  // from `undefined` (nothing stored) — and the theme counts as unset unless
  // the sweep below resolves it. That is the same rule as getThemeCookie.
  // decodeURIComponent throws on a value that is not valid percent-encoding,
  // and the outer catch would swallow the whole script — leaving the document
  // unpainted — so guard the decode on its own and let the light/dark/system
  // check drop a junk value instead of counting it.
  const read =
    `g=function(){var p=document.cookie.split('; '),r;` +
    `for(var i=0;i<p.length;i++){var c=p[i],x=c.indexOf('=');if(c.slice(0,x)===k){` +
    `var v=c.slice(x+1);try{v=decodeURIComponent(v)}catch(e){}` +
    `if(v==='light'||v==='dark'||v==='system'){if(r!==undefined&&r!==v)return null;r=v}}}return r}`;

  // A same-named host-only cookie next to the domain-scoped one makes the read
  // disagree (see clearHostOnlyThemeCookie). The provider sweeps host-only
  // cookies before its first read whenever a domain is in effect, so for the
  // painted value to match the hydrated one the script has to sweep too — but
  // only the disagreement can make the two reads differ: a lone host-only
  // value is kept by the provider (it re-homes it), and agreeing values read
  // the same either way. So sweep only on `null` and re-read.
  //
  // This keys off `domainScoped`, not the detected domain, because the server
  // has no document to detect one with: under `'auto'` it would otherwise
  // render a script without the sweep — the script that actually runs — and
  // paint the default while the provider reads the domain cookie. On a host
  // that cannot carry a `Domain` (localhost, an IP) the provider does not
  // sweep, but a disagreement leaves it on the default as well, and so does
  // the swept jar here: the paint matches either way.
  //
  // The paths are derived in the browser rather than serialized here because
  // the sweep has to cover every path that can send a cookie to this URL —
  // deleting needs an exact Path match while reading prefers the deepest one,
  // and the server cannot know the pathname of a statically rendered page.
  const configuredPaths = [...new Set([DEFAULT_THEME_COOKIE_PATH, cookiePath])];
  // a `__Secure-` name rejects an expiring write without `Secure`, same as
  // clearHostOnlyThemeCookie
  const secure = getCookieNamePrefixRule(cookieKey).requireSecure
    ? '; Secure'
    : '';
  const clearHostOnly = domainScoped
    ? `if(t===null){var y=${JSON.stringify(configuredPaths)},z='';` +
      `location.pathname.split('/').forEach(function(s){if(s){y.push(z+='/'+s)}});` +
      `y.forEach(function(a){document.cookie=k+'=; Path='+a+'; Max-Age=0${secure}'});t=g()}`
    : '';

  return (
    `!function(){try{` +
    `var d=document.documentElement,k=${JSON.stringify(cookieKey)},${read},t=g();` +
    clearHostOnly +
    `if(t!=='light'&&t!=='dark'&&t!=='system')t=${JSON.stringify(defaultTheme)};` +
    resolveSystem +
    apply +
    `}catch(e){}}()`
  );
};
