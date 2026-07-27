import { fireEvent, render, screen } from '@testing-library/react';

import useThemeControl from '../hooks/use-theme-control';

import { buildThemeScript } from './cookie-theme-provider/theme-script/helpers';
import {
  clearHostOnlyThemeCookie,
  getThemeCookie,
  safeCookieAttribute,
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

  it('reports and drops an injected path instead of writing it', () => {
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
    // the cleanup must precede the read, otherwise the shadow still wins
    expect(script.indexOf('Max-Age=0')).toBeLessThan(
      script.indexOf('document.cookie.split'),
    );
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

describe('ThemeProvider', () => {
  afterEach(() => {
    clearThemeCookie();
    document.documentElement.removeAttribute('data-theme');
  });

  it('falls back to the system theme when nothing is stored', () => {
    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    // matchMedia mock resolves prefers-color-scheme: dark to false
    expect(screen.getByRole('button')).toHaveTextContent('light:system');
  });

  it('reads the initial theme from the cookie', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists theme changes to the cookie and the document', () => {
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

  it('forces the light theme when dark mode is disabled', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent(/^light:/);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('stores the theme under a custom cookie key', () => {
    render(
      <ThemeProvider enableDarkMode cookie={{ key: 'wanted-theme' }}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(getThemeCookie('wanted-theme')).toBe('dark');
  });

  it('picks up a theme written elsewhere when the window regains focus', () => {
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

  it('exposes the nonce through the theme context', () => {
    render(
      <ThemeProvider enableDarkMode nonce="test-nonce">
        <NonceConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('nonce')).toHaveTextContent('test-nonce');
  });
});
