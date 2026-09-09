import { fireEvent, render, screen } from '@testing-library/react';

import useThemeControl from '../hooks/use-theme-control';

import { buildThemeScript } from './cookie-theme-provider/theme-script/helpers';
import {
  clearHostOnlyThemeCookie,
  getThemeCookie,
  reportInsecureContext,
  resolveCookieDomain,
  resolveThemeCookieOptions,
  safeCookieAttribute,
  safeCookieKey,
  serializeThemeCookie,
} from './cookie-theme-provider/helpers';
import { useThemeContext } from './contexts';

import ThemeProvider from '.';

const ThemeConsumer = () => {
  const { theme, themeOriginValue, setTheme } = useThemeControl();

  return (
    <button type="button" onClick={() => setTheme('dark')}>
      {theme}:{themeOriginValue}
    </button>
  );
};

const NonceConsumer = () => {
  const { nonce } = useThemeContext('NonceConsumer');

  return <span data-testid="nonce">{nonce ?? 'none'}</span>;
};

const clearThemeCookie = () => {
  document.cookie = 'montage-theme=; Path=/; Max-Age=0';
  document.cookie = 'wanted-theme=; Path=/; Max-Age=0';
};

describe('serializeThemeCookie', () => {
  it('serializes with default attributes and no Domain when omitted', () => {
    expect(serializeThemeCookie('dark')).toBe(
      'montage-theme=dark; Path=/; Max-Age=31536000; SameSite=Lax',
    );
  });

  it('serializes the given cookie options', () => {
    expect(
      serializeThemeCookie('light', {
        key: 'wanted-theme',
        domain: '.wanted.co.kr',
        maxAge: 100,
      }),
    ).toBe(
      'wanted-theme=light; Path=/; Max-Age=100; SameSite=Lax; Domain=.wanted.co.kr',
    );
  });

  it('adds Secure automatically when sameSite is none', () => {
    expect(serializeThemeCookie('dark', { sameSite: 'none' })).toBe(
      'montage-theme=dark; Path=/; Max-Age=31536000; SameSite=None; Secure',
    );
  });
});

describe('safeCookieAttribute', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('passes through a normal value', () => {
    expect(safeCookieAttribute('path', '/app')).toBe('/app');
    expect(safeCookieAttribute('domain', undefined)).toBeUndefined();
  });

  it.each([
    ['semicolon', '/; Domain=evil.example.com'],
    ['newline', `/app${String.fromCharCode(0x0a)}`],
    ['null byte', `/app${String.fromCharCode(0x00)}`],
    ['DEL', `/app${String.fromCharCode(0x7f)}`],
  ])('rejects a value containing a %s', (_label, value) => {
    expect(safeCookieAttribute('path', value)).toBeUndefined();
    expect(console.error).toHaveBeenCalledOnce();
  });
});

describe('safeCookieKey', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts a valid cookie name', () => {
    expect(safeCookieKey('montage-theme')).toBe('montage-theme');
    expect(safeCookieKey('__Host-theme')).toBe('__Host-theme');
    expect(safeCookieKey(undefined)).toBeUndefined();
  });

  it.each([
    ['equals sign', 'theme=other'],
    ['whitespace', 'my theme'],
    ['quote', 'theme"'],
    ['empty string', ''],
    ['semicolon', 'theme;x'],
  ])('rejects a cookie key containing %s', (_label, value) => {
    expect(safeCookieKey(value)).toBeUndefined();
    expect(console.error).toHaveBeenCalledOnce();
  });
});

describe('resolveCookieDomain', () => {
  it('falls back to host-only on a host that cannot carry a Domain', () => {
    // this file runs on `localhost`, a single-label host
    expect(resolveCookieDomain(undefined)).toBeUndefined();
    expect(resolveCookieDomain('none')).toBeUndefined();
  });
});

describe('resolveThemeCookieOptions', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ['NaN', Number('x')],
    ['zero, which expires the cookie on write', 0],
    ['a negative value', -1],
    ['a non-integer', 1.5],
  ])('reports and drops a maxAge of %s', (_label, maxAge) => {
    // an invalid Max-Age is dropped by the browser, leaving a session cookie
    expect(resolveThemeCookieOptions({ maxAge }).maxAge).toBeUndefined();
    expect(console.error).toHaveBeenCalledOnce();
  });

  it('keeps a valid maxAge', () => {
    expect(resolveThemeCookieOptions({ maxAge: 100 }).maxAge).toBe(100);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('reports and drops an unrecognized sameSite', () => {
    // serializes to `SameSite=undefined`, which the browser ignores
    expect(
      resolveThemeCookieOptions({ sameSite: 'Lax' as never }).sameSite,
    ).toBeUndefined();
    expect(console.error).toHaveBeenCalledOnce();
  });

  it('keeps a valid sameSite', () => {
    expect(resolveThemeCookieOptions({ sameSite: 'none' }).sameSite).toBe(
      'none',
    );
    expect(console.error).not.toHaveBeenCalled();
  });

  it('adds Secure for a __Secure- prefixed key', () => {
    expect(resolveThemeCookieOptions({ key: '__Secure-theme' }).secure).toBe(
      true,
    );
  });

  it('reports an explicit secure=false that the prefix forbids', () => {
    expect(
      resolveThemeCookieOptions({ key: '__Secure-theme', secure: false })
        .secure,
    ).toBe(true);
    expect(console.error).toHaveBeenCalledOnce();
  });

  it('forces a __Host- prefixed key to a host-only cookie at the root path', () => {
    const resolved = resolveThemeCookieOptions({
      key: '__Host-theme',
      domain: '.wanted.co.kr',
      path: '/app',
    });

    expect(resolved).toMatchObject({
      key: '__Host-theme',
      domain: undefined,
      path: '/',
      secure: true,
    });
    // one report for the forbidden Domain, one for the pinned Path
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it('does not report a __Host- key that already opted out of sharing', () => {
    expect(
      resolveThemeCookieOptions({ key: '__Host-theme', domain: 'none' }).domain,
    ).toBeUndefined();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('serializes a prefixed key into a cookie the browser will accept', () => {
    expect(
      serializeThemeCookie(
        'dark',
        resolveThemeCookieOptions({ key: '__Host-theme', domain: 'none' }),
      ),
    ).toBe('__Host-theme=dark; Path=/; Max-Age=31536000; SameSite=Lax; Secure');
  });

  it.each([
    ['an empty string', ''],
    ['a relative path', 'app'],
    ['a bare segment', 'settings'],
  ])('reports and drops a cookie.path that is %s', (_label, path) => {
    // the browser resolves these to the URL's default-path instead of
    // rejecting them, scattering the cookie across entry points
    expect(resolveThemeCookieOptions({ path }).path).toBe('/');
    expect(console.error).toHaveBeenCalledOnce();
  });

  it('keeps an absolute cookie.path', () => {
    expect(resolveThemeCookieOptions({ path: '/app' }).path).toBe('/app');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('reports domain "none" left on the shared default key', () => {
    // the sibling apps' cookie is still sent here and would be copied into this
    // app's host-only one, which then wins every later read
    resolveThemeCookieOptions({ domain: 'none' });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('own cookie.key'),
    );
  });

  it('stays quiet when domain "none" is paired with its own key', () => {
    expect(
      resolveThemeCookieOptions({ domain: 'none', key: 'admin-theme' }),
    ).toMatchObject({ key: 'admin-theme', domain: undefined });
    expect(console.error).not.toHaveBeenCalled();
  });

  it('reports a Secure cookie written from an insecure context', () => {
    vi.stubGlobal('isSecureContext', false);

    reportInsecureContext(true);
    expect(console.error).toHaveBeenCalledOnce();

    reportInsecureContext(false);
    expect(console.error).toHaveBeenCalledOnce();

    vi.unstubAllGlobals();
  });
});

describe('clearHostOnlyThemeCookie', () => {
  it('removes a host-only cookie of the given name', () => {
    document.cookie = 'montage-theme=dark; Path=/';
    expect(getThemeCookie('montage-theme')).toBe('dark');

    clearHostOnlyThemeCookie('montage-theme');

    expect(getThemeCookie('montage-theme')).toBeUndefined();
  });

  it('omits Domain and honors the given path so only the host-only cookie is hit', () => {
    const setCookie = vi.fn();

    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => '',
      set: setCookie,
    });

    try {
      clearHostOnlyThemeCookie('montage-theme', '/app');
    } finally {
      // drop the own property so the jsdom prototype accessor takes over again
      delete (document as Partial<Document>).cookie;
    }

    expect(setCookie).toHaveBeenCalledWith(
      'montage-theme=; Path=/app; Max-Age=0',
    );
  });
});

describe('buildThemeScript', () => {
  const baseOptions = {
    cookieKey: 'montage-theme',
    cookiePath: '/',
    defaultTheme: 'system',
    enableSystem: true,
  } as const;

  it('drops the shadowing host-only cookie before reading when a domain is set', () => {
    const script = buildThemeScript({
      ...baseOptions,
      cookieDomain: '.wanted.co.kr',
    });

    expect(script).toContain('Max-Age=0');
    // no Domain attribute, so only the host-only variant is expired
    expect(script).not.toContain('Domain=');
    // the cleanup must precede the re-read that decides the value, and that
    // re-read must precede the light/dark/system check
    expect(script.indexOf('Max-Age=0')).toBeLessThan(
      script.indexOf('t=g()||t'),
    );
    expect(script.indexOf('t=g()||t')).toBeLessThan(
      script.indexOf("if(t!=='light'"),
    );
  });

  it('keeps the pre-clear value when only the host-only cookie held one', () => {
    const script = buildThemeScript({
      ...baseOptions,
      cookieDomain: '.wanted.co.kr',
    });

    // `||` means the post-clear read only wins when it actually found a value
    expect(script).toContain('t=g()||t');
  });

  it('survives a cookie value that is not valid percent-encoding', () => {
    document.cookie = 'montage-theme=100%; Path=/';

    const script = buildThemeScript(baseOptions);

    expect(() => new Function(script)()).not.toThrow();
    // the junk value is rejected, so the default applies and the document is
    // still painted rather than left untouched by the outer catch
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy();

    document.cookie = 'montage-theme=; Path=/; Max-Age=0';
    document.documentElement.removeAttribute('data-theme');
  });

  it('does not touch cookies when no domain is set', () => {
    const script = buildThemeScript(baseOptions);

    expect(script).not.toContain('Max-Age=0');
  });

  it('serializes cookiePath as a literal so a crafted path cannot execute code', () => {
    const script = buildThemeScript({
      ...baseOptions,
      cookiePath: "/'; globalThis.__themeScriptInjected = true; '",
      cookieDomain: '.wanted.co.kr',
    });

    new Function(script)();

    expect(
      (globalThis as { __themeScriptInjected?: boolean }).__themeScriptInjected,
    ).toBeUndefined();
  });
});

describe('when given theme provider component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearThemeCookie();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should fall back to the system theme when nothing is stored', () => {
    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    // matchMedia mock resolves prefers-color-scheme: dark to false
    expect(screen.getByRole('button')).toHaveTextContent('light:system');
  });

  it('should read the initial theme from the cookie', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should persist theme changes to the cookie and the document', () => {
    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(getThemeCookie('montage-theme')).toBe('dark');
  });

  it('should force the light theme when dark mode is disabled', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent(/^light:/);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should store the theme under a custom cookie key', () => {
    render(
      <ThemeProvider enableDarkMode cookie={{ key: 'wanted-theme' }}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(getThemeCookie('wanted-theme')).toBe('dark');
  });

  it('should pick up a theme written elsewhere when the window regains focus', () => {
    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('light:system');

    // another tab or subdomain writes the shared cookie while this tab is idle
    document.cookie = 'montage-theme=dark; Path=/';
    fireEvent.focus(window);

    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
  });

  it('should expose the nonce through the theme context', () => {
    render(
      <ThemeProvider enableDarkMode nonce="test-nonce">
        <NonceConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('nonce')).toHaveTextContent('test-nonce');
  });

  it('should render through a cookie value that is not valid percent-encoding', () => {
    // a same-named cookie written by something else; decodeURIComponent throws
    // on this, and the read happens inside a useState initializer
    document.cookie = 'montage-theme=100%; Path=/';

    expect(() =>
      render(
        <ThemeProvider enableDarkMode>
          <ThemeConsumer />
        </ThemeProvider>,
      ),
    ).not.toThrow();

    expect(screen.getByRole('button')).toHaveTextContent('light:system');
  });

  it('should not write the cookie when the theme is forced', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    const setCookie = vi.spyOn(document, 'cookie', 'set');

    render(
      <ThemeProvider enableDarkMode={false}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    // a forced provider renders light regardless of the stored value, so
    // re-writing it would only push this app's cookie options onto a value it
    // does not own
    expect(setCookie).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveTextContent('light:dark');

    setCookie.mockRestore();
  });

  it('should not leak setTheme into the cookie when the theme is forced', () => {
    render(
      <ThemeProvider enableDarkMode={false}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    // nothing changed on screen, so nothing may change for sibling apps either
    expect(getThemeCookie('montage-theme')).toBeUndefined();
    expect(screen.getByRole('button')).toHaveTextContent('light:dark');
  });

  it('should keep the current theme when the cookie is gone on focus', () => {
    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');

    // the write never stuck — blocked cookies, a rejected Domain, or Safari
    // evicting script-written storage
    clearThemeCookie();
    fireEvent.focus(window);

    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
  });

  it('should store under the default key when cookie.key is invalid', () => {
    render(
      <ThemeProvider enableDarkMode cookie={{ key: 'theme=other' }}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(console.error).toHaveBeenCalled();
    // written under the default key, not the malformed one
    expect(getThemeCookie('montage-theme')).toBe('dark');
  });

  it('should report an injected cookie.path instead of writing it', () => {
    render(
      <ThemeProvider
        enableDarkMode
        cookie={{ domain: '.wanted.co.kr', path: '/; Max-Age=0' }}
      >
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(console.error).toHaveBeenCalled();
  });
});
