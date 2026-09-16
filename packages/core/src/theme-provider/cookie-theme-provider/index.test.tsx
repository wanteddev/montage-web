/**
 * Cookie scope can only be exercised on a host that is allowed to carry a
 * `Domain` attribute, so this file runs on a multi-label host instead of the
 * default `localhost`. The path sweep additionally needs a nested pathname,
 * which `history.pushState` provides without a reload.
 *
 * @vitest-environment jsdom
 * @vitest-environment-options { "url": "https://help.wanted.co.kr/" }
 */
import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

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

type JarCookie = {
  name: string;
  value: string;
  /** `null` for host-only, otherwise without the leading dot — as the Cookie Store reports it */
  domain: string | null;
  path: string;
};

/**
 * Stand-in for a browser cookie jar with the traits this suite depends on:
 * entries are identified by (name, domain, path); `document.cookie` lists
 * them in insertion order with a re-written entry moved to the END, which is
 * what Chrome does (measured in Chrome 141); and a Cookie Store reports the
 * scope of each entry and fires `change` on every write. jsdom's own jar
 * exposes no scope information and has no Cookie Store, so it cannot drive
 * these cases.
 */
const installScopedCookieJar = (initial: Array<JarCookie>) => {
  const jar: Array<JarCookie> = [...initial];
  const target = new EventTarget();
  const heldReads: Array<() => void> = [];
  let holdReads = false;

  const parse = (raw: string) => {
    const [pair = '', ...attributes] = raw.split('; ');
    const separator = pair.indexOf('=');
    const cookie: JarCookie = {
      name: pair.slice(0, separator),
      value: pair.slice(separator + 1),
      domain: null,
      path: '/',
    };
    let expired = false;

    attributes.forEach((attribute) => {
      const [attributeName = '', attributeValue = ''] = attribute.split('=');

      switch (attributeName.toLowerCase()) {
        case 'domain':
          cookie.domain = attributeValue.replace(/^\./, '');
          break;
        case 'path':
          cookie.path = attributeValue;
          break;
        case 'max-age':
          expired = Number(attributeValue) <= 0;
          break;
        default:
      }
    });

    return { cookie, expired };
  };

  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get: () => jar.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '),
    set: (raw: string) => {
      const { cookie, expired } = parse(raw);
      const index = jar.findIndex(
        (entry) =>
          entry.name === cookie.name &&
          entry.domain === cookie.domain &&
          entry.path === cookie.path,
      );
      const deleted = index === -1 ? [] : jar.splice(index, 1);
      const changed = expired ? [] : [cookie];

      if (!expired) {
        jar.push(cookie);
      }

      if (changed.length > 0 || deleted.length > 0) {
        target.dispatchEvent(
          Object.assign(new Event('change'), { changed, deleted }),
        );
      }
    },
  });

  const store = {
    getAll: vi.fn(
      (name: string) =>
        new Promise<Array<JarCookie>>((resolve) => {
          // snapshot at call time, like a real read that has already left for
          // the browser process
          const items = jar.filter((cookie) => cookie.name === name);
          const deliver = () => resolve(items);

          if (holdReads) {
            heldReads.push(deliver);
          } else {
            deliver();
          }
        }),
    ),
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
  };

  Object.defineProperty(window, 'cookieStore', {
    configurable: true,
    value: store,
  });

  return {
    jar,
    store,
    holdReads: () => {
      holdReads = true;
    },
    releaseNextRead: () => {
      heldReads.shift()?.();
    },
    uninstall: () => {
      delete (document as Partial<Document>).cookie;
      delete (window as { cookieStore?: unknown }).cookieStore;
    },
  };
};

/** Let a Cookie Store read resolve and React commit the state it produces */
const flush = () =>
  act(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  });

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

  it('leaves no probe cookie behind', async () => {
    // the detected value is cached per host at module scope, so a warm cache
    // would skip the probe entirely and leave nothing to assert on
    vi.resetModules();

    const { detectCookieDomain: detectUncached } = await import('./helpers');
    const setCookie = vi.spyOn(document, 'cookie', 'set');

    detectUncached();

    const probeWrites = setCookie.mock.calls
      .map(([value]) => String(value))
      .filter((value) => value.startsWith('__montage-theme-probe='));

    // the probe has to have actually run for the cleanup assertion to mean
    // anything: one write per candidate domain plus the deletion
    expect(probeWrites.length).toBeGreaterThan(1);
    expect(probeWrites.at(-1)).toContain('Max-Age=0');

    setCookie.mockRestore();

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
    // collateral, and the inline script skips the cleanup when forced too.
    // Domain detection writes a throwaway probe cookie on a cold cache, so
    // only theme-cookie writes are in scope here.
    expect(
      setCookie.mock.calls.filter(([value]) =>
        String(value).startsWith('montage-theme='),
      ),
    ).toEqual([]);

    setCookie.mockRestore();
  });

  it('should keep the migrated value when the initializer runs twice', () => {
    document.cookie = 'montage-theme=dark; Path=/';

    render(
      <StrictMode>
        <ThemeProvider enableDarkMode>
          <ThemeConsumer />
        </ThemeProvider>
      </StrictMode>,
    );

    // StrictMode double-invokes the state initializer and keeps only one of
    // the results, so the second call has to observe the same cookies as the
    // first and reach the same answer
    expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    expect(document.cookie).toContain('montage-theme=dark');
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

describe('when a same-named cookie exists at another scope', () => {
  it('should keep the toggled theme when the two disagree and there is no Cookie Store', () => {
    // a Domain cookie an earlier deploy left at a deeper Path: it reaches
    // every page under /app, is listed FIRST there (longer Path wins), and
    // the host-only sweep cannot touch it. jsdom's jar folds a
    // `Domain=.help.wanted.co.kr` cookie into the host-only one — Chrome keeps
    // them apart — so the deeper-Path shape is the one that survives here.
    window.history.pushState({}, '', '/app');
    document.cookie = 'montage-theme=light; Path=/app; Domain=.wanted.co.kr';

    try {
      render(
        <ThemeProvider enableDarkMode>
          <ThemeConsumer />
        </ThemeProvider>,
      );
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
      // both reach the document now, as bare `key=value` pairs
      expect(document.cookie.match(/montage-theme=/g)).toHaveLength(2);

      // the re-read cannot tell which one is current, so it must not guess —
      // taking the first match would snap the theme back to the stray
      fireEvent.focus(window);

      expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    } finally {
      document.cookie =
        'montage-theme=; Path=/app; Domain=.wanted.co.kr; Max-Age=0';
      window.history.pushState({}, '', '/');
    }
  });

  describe('with the Cookie Store API', () => {
    const own = { name: 'montage-theme', domain: 'wanted.co.kr', path: '/' };
    const stray = {
      name: 'montage-theme',
      value: 'dark',
      domain: 'help.wanted.co.kr',
      path: '/',
    };
    let scopedJar: ReturnType<typeof installScopedCookieJar>;

    const renderProvider = () =>
      render(
        // explicit so no probe cookie has to pass through the fake jar
        <ThemeProvider enableDarkMode cookie={{ domain: '.wanted.co.kr' }}>
          <ThemeConsumer />
        </ThemeProvider>,
      );

    afterEach(() => {
      scopedJar.uninstall();
    });

    it('should adopt the value at its own scope and remove the strays on mount', async () => {
      scopedJar = installScopedCookieJar([
        stray,
        { name: 'montage-theme', value: 'dark', domain: null, path: '/' },
        { ...own, value: 'light' },
      ]);

      renderProvider();
      await flush();

      // `document.cookie` listed dark, dark, light. A first-match read would
      // have taken the stale dark AND written it over the shared light.
      expect(screen.getByRole('button')).toHaveTextContent('light:light');
      expect(scopedJar.jar).toEqual([{ ...own, value: 'light' }]);
    });

    it('should follow the shared cookie when a sibling subdomain changes it', async () => {
      scopedJar = installScopedCookieJar([{ ...own, value: 'light' }]);

      renderProvider();
      await flush();

      // social.wanted.co.kr toggles: same name, same Domain, same Path
      act(() => {
        document.cookie =
          'montage-theme=dark; Path=/; Max-Age=31536000; SameSite=Lax; Domain=.wanted.co.kr';
      });
      await flush();

      expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    });

    it('should keep its own value and drop a stray that appears later', async () => {
      scopedJar = installScopedCookieJar([{ ...own, value: 'light' }]);

      renderProvider();
      await flush();
      fireEvent.click(screen.getByRole('button'));
      await flush();

      expect(scopedJar.jar).toEqual([{ ...own, value: 'dark' }]);

      // a tab still running an older build re-creates its host-only cookie
      act(() => {
        document.cookie = 'montage-theme=light; Path=/; Max-Age=31536000';
      });
      await flush();

      expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
      expect(scopedJar.jar).toEqual([{ ...own, value: 'dark' }]);
    });

    it('should not read the store when an unrelated cookie changes', async () => {
      scopedJar = installScopedCookieJar([{ ...own, value: 'light' }]);

      renderProvider();
      await flush();

      const reads = scopedJar.store.getAll.mock.calls.length;

      act(() => {
        document.cookie = '_ga=GA1.1; Path=/; Max-Age=60';
      });
      await flush();

      expect(scopedJar.store.getAll).toHaveBeenCalledTimes(reads);
    });

    it('should discard a read that was in flight when the user toggled', async () => {
      scopedJar = installScopedCookieJar([{ ...own, value: 'light' }]);

      renderProvider();
      await flush();

      scopedJar.holdReads();
      // regaining focus starts a read that still sees light...
      fireEvent.focus(window);
      // ...and the user toggles before it comes back
      fireEvent.click(screen.getByRole('button'));
      await flush();

      // the stale read lands first; applying it would put light back
      scopedJar.releaseNextRead();
      await flush();

      expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
      expect(scopedJar.jar).toEqual([{ ...own, value: 'dark' }]);

      // the read triggered by the write itself agrees
      scopedJar.releaseNextRead();
      await flush();

      expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
    });

    it('should leave the shared cookie alone when it does not own the shared scope', async () => {
      // `domain: 'none'` with its own key, as prescribed; a sibling app happens
      // to write the same key at the shared scope
      const shared = {
        name: 'admin-theme',
        value: 'dark',
        domain: 'wanted.co.kr',
        path: '/',
      };

      scopedJar = installScopedCookieJar([shared]);

      render(
        <ThemeProvider
          enableDarkMode
          cookie={{ domain: 'none', key: 'admin-theme' }}
        >
          <ThemeConsumer />
        </ThemeProvider>,
      );
      await flush();

      expect(scopedJar.jar).toContainEqual(shared);
    });

    it('should never delete cookies when the theme is forced', async () => {
      scopedJar = installScopedCookieJar([stray, { ...own, value: 'light' }]);

      render(
        <ThemeProvider
          enableDarkMode={false}
          cookie={{ domain: '.wanted.co.kr' }}
        >
          <ThemeConsumer />
        </ThemeProvider>,
      );
      await flush();

      expect(scopedJar.jar).toHaveLength(2);
    });
  });
});
