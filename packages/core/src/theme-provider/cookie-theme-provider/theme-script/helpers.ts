import { COLOR_SCHEME_QUERY, THEME_ATTRIBUTE } from '../constants';

import type { ThemeScriptProps } from './types';

export const buildThemeScript = ({
  cookieKey,
  cookiePath,
  cookieDomain,
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

  // Reader shared by both passes. decodeURIComponent throws on a value that is
  // not valid percent-encoding, and the outer catch would swallow the whole
  // script — leaving the document unpainted — so guard the decode on its own
  // and let the light/dark/system check reject a junk value instead.
  const read =
    `g=function(){var p=document.cookie.split('; ');` +
    `for(var i=0;i<p.length;i++){var c=p[i],x=c.indexOf('=');if(c.slice(0,x)===k){` +
    `var v=c.slice(x+1);try{v=decodeURIComponent(v)}catch(e){}return v}}}`;

  // A same-named host-only cookie would shadow the domain-scoped one on read
  // (see clearHostOnlyThemeCookie); drop it before reading so the value the
  // script paints and the value the provider reads cannot diverge. Keep the
  // pre-clear read as the fallback, matching the provider, so the first load
  // after a host gains a domain does not reset the stored choice.
  const clearHostOnly = cookieDomain
    ? `document.cookie=k+'=; Path='+${JSON.stringify(cookiePath)}+'; Max-Age=0';t=g()||t;`
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
