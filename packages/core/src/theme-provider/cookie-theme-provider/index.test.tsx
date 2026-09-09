/**
 * Cookie scope can only be exercised on a host that is allowed to carry a
 * `Domain` attribute, so this file runs on a multi-label host instead of the
 * default `localhost`. The path sweep additionally needs a nested pathname,
 * which `history.pushState` provides without a reload.
 *
 * @vitest-environment jsdom
 * @vitest-environment-options { "url": "https://help.wanted.co.kr/" }
 */
import { fireEvent, render, screen } from '@testing-library/react';

import useThemeControl from '../../hooks/use-theme-control';
import ThemeProvider from '..';

import {
  clearHostOnlyThemeCookie,
  detectCookieDomain,
  resolveCookieDomain,
} from './helpers';

const ThemeConsumer = () => {
  const { theme, themeOriginValue, setTheme } = useThemeControl();

  return (
    <button type="button" onClick={() => setTheme('dark')}>
      {theme}:{String(themeOriginValue)}
    </button>
  );
};

const clearCookies = () => {
  document.cookie.split('; ').forEach((cookie) => {
    const name = cookie.slice(0, cookie.indexOf('='));

    if (name) {
      document.cookie = `${name}=; Path=/; Max-Age=0`;
      document.cookie = `${name}=; Path=/; Domain=.wanted.co.kr; Max-Age=0`;
    }
  });
};

afterEach(() => {
  clearCookies();
  document.documentElement.removeAttribute('data-theme');
});

describe('detectCookieDomain', () => {
  it('picks the widest domain the host is allowed to write', () => {
    // `.co.kr` is a public suffix and is rejected, so the registrable domain
    // one level down is the widest scope this host can actually share
    expect(detectCookieDomain()).toBe('.wanted.co.kr');
  });

  it('leaves no probe cookie behind', () => {
    detectCookieDomain();

    expect(document.cookie).not.toContain('__montage-theme-probe');
  });
});

describe('resolveCookieDomain', () => {
  it('detects by default and honors an explicit opt-out or override', () => {
    expect(resolveCookieDomain(undefined)).toBe('.wanted.co.kr');
    expect(resolveCookieDomain('auto')).toBe('.wanted.co.kr');
    expect(resolveCookieDomain('none')).toBeUndefined();
    expect(resolveCookieDomain('.other.wanted.co.kr')).toBe(
      '.other.wanted.co.kr',
    );
  });
});

describe('clearHostOnlyThemeCookie', () => {
  let setCookie: ReturnType<typeof vi.fn<(value: string) => void>>;

  const writes = () => setCookie.mock.calls.map(([value]) => value);

  beforeEach(() => {
    window.history.pushState({}, '', '/app/settings');
    setCookie = vi.fn();
    vi.spyOn(document, 'cookie', 'set').mockImplementation(setCookie);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.history.pushState({}, '', '/');
  });

  it('sweeps every path that can shadow the cookie at this URL', () => {
    clearHostOnlyThemeCookie('montage-theme');

    // a host-only cookie at /app outranks the shared one on every page under
    // it, and a single delete at Path=/ never reaches it
    expect(writes()).toEqual([
      'montage-theme=; Path=/; Max-Age=0',
      'montage-theme=; Path=/app; Max-Age=0',
      'montage-theme=; Path=/app/settings; Max-Age=0',
    ]);
  });

  it('includes a configured path that is not on the current URL', () => {
    clearHostOnlyThemeCookie('montage-theme', '/other');

    expect(writes()).toContain('montage-theme=; Path=/other; Max-Age=0');
    expect(writes()).toContain('montage-theme=; Path=/; Max-Age=0');
  });

  it('never sets a Domain, so only host-only cookies are hit', () => {
    clearHostOnlyThemeCookie('montage-theme');

    expect(writes().some((value) => value.includes('Domain'))).toBe(false);
  });
});

describe('when given theme provider component', () => {
  it('should write the detected domain without the app configuring one', () => {
    const setCookie = vi.spyOn(document, 'cookie', 'set');

    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(
      setCookie.mock.calls.some(
        ([value]) =>
          String(value).includes('montage-theme=') &&
          String(value).includes('Domain=.wanted.co.kr'),
      ),
    ).toBe(true);

    setCookie.mockRestore();
  });

  it('should never touch cookies when the theme is forced', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    const setCookie = vi.spyOn(document, 'cookie', 'set');

    render(
      <ThemeProvider enableDarkMode={false}>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));

    // a forced provider renders light whatever is stored, so it neither
    // persists nor clears — deleting a sibling app's cookie would be pure
    // collateral, and the inline script skips the cleanup when forced too
    expect(setCookie).not.toHaveBeenCalled();

    setCookie.mockRestore();
  });

  it('should keep a host-only value on the first load that gains a domain', () => {
    // the shape left behind by a deploy that ran before domain detection
    document.cookie = 'montage-theme=dark; Path=/';

    render(
      <ThemeProvider enableDarkMode>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    // the host-only cookie is dropped, but its value survives the migration
    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    expect(document.cookie).toContain('montage-theme=dark');
  });
});
