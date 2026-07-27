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

  // A same-named host-only cookie would shadow the domain-scoped one on read
  // (see clearHostOnlyThemeCookie); drop it before reading so the value the
  // script paints and the value the provider reads cannot diverge.
  const clearHostOnly = cookieDomain
    ? `document.cookie=k+'=; Path=${cookiePath}; Max-Age=0';`
    : '';

  return (
    `!function(){try{` +
    `var d=document.documentElement,k=${JSON.stringify(cookieKey)},t;` +
    clearHostOnly +
    `var p=document.cookie.split('; ');` +
    `for(var i=0;i<p.length;i++){var c=p[i],x=c.indexOf('=');if(c.slice(0,x)===k){t=decodeURIComponent(c.slice(x+1));break}}` +
    `if(t!=='light'&&t!=='dark'&&t!=='system')t=${JSON.stringify(defaultTheme)};` +
    resolveSystem +
    apply +
    `}catch(e){}}()`
  );
};
