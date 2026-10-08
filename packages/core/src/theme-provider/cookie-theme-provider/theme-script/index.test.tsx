/**
 * The host-only sweep only matters on a host that can carry a `Domain`
 * attribute, so this file runs on a multi-label host instead of the default
 * `localhost`.
 *
 * @vitest-environment jsdom
 * @vitest-environment-options { "url": "https://help.wanted.co.kr/" }
 */
import { act, render, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { type Root, hydrateRoot } from 'react-dom/client';

import ThemeProvider from '../..';

import type { ReactElement } from 'react';

const Child = () => <p>content</p>;

const tree = (
  <ThemeProvider enableDarkMode>
    <Child />
  </ThemeProvider>
);

/**
 * `ThemeScript` marks itself `application/json` on the client so a client-only
 * render does not ship a script the browser would refuse to run anyway. It
 * detects the server with `typeof window === 'undefined'`, which holds in Node
 * but not under jsdom — so strip the attribute to get the markup a real SSR
 * render emits.
 */
const renderOnServer = () =>
  renderToString(tree).replace(' type="application/json"', '');

const mountServerHtml = () => {
  const container = document.createElement('div');

  // innerHTML never runs scripts, which leaves the same observable state a CSP
  // block does: the markup is present and `data-theme` is not set
  container.innerHTML = renderOnServer();
  document.body.append(container);

  return container;
};

const themeScript = (container: HTMLElement) =>
  container.querySelector<HTMLScriptElement>(
    'script[data-montage-theme-script]',
  );

const roots: Array<Root> = [];

/** Kept so the provider's document/window listeners are removed between tests */
const hydrate = (container: HTMLElement, element: typeof tree) => {
  act(() => {
    roots.push(hydrateRoot(container, element));
  });
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  act(() => {
    roots.splice(0).forEach((root) => {
      root.unmount();
    });
  });

  vi.restoreAllMocks();
  document.documentElement.removeAttribute('data-theme');
  ['montage-theme', 'admin-theme'].forEach((key) => {
    document.cookie = `${key}=; Path=/; Max-Age=0`;
    document.cookie = `${key}=; Path=/; Domain=.wanted.co.kr; Max-Age=0`;
  });
  document.body.replaceChildren();
});

describe('when given theme script', () => {
  it('should mark the script so the provider can find it', () => {
    expect(renderToString(tree)).toContain('data-montage-theme-script');
  });

  it('should report a server-rendered script that never executed', () => {
    const container = mountServerHtml();

    expect(themeScript(container)?.type).toBe('');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);

    hydrate(container, tree);

    // The detection has to have happened during render: React rewrites this
    // element on the client (measured in Chrome 141, where a hydration
    // mismatch makes it replace the element outright), so the executable form
    // the server sent is only observable before commit.
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('inline script did not run'),
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('pass ThemeProvider a `nonce`'),
    );
  });

  it('should point at the existing nonce when one was already passed', () => {
    const container = document.createElement('div');

    container.innerHTML = renderToString(
      <ThemeProvider enableDarkMode nonce="abc">
        <Child />
      </ThemeProvider>,
    ).replace(' type="application/json"', '');
    document.body.append(container);

    hydrate(
      container,
      <ThemeProvider enableDarkMode nonce="abc">
        <Child />
      </ThemeProvider>,
    );

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('verify that the `nonce`'),
    );
  });

  it('should stay quiet when the script did paint the document', () => {
    const container = mountServerHtml();

    // stand in for the inline script having run during parse
    document.documentElement.setAttribute('data-theme', 'light');

    hydrate(container, tree);

    expect(console.error).not.toHaveBeenCalled();
  });

  it('should stay quiet in a client-only render, where the script cannot run by design', () => {
    const { container } = render(tree);

    expect(within(container).getByText('content')).toBeInTheDocument();
    expect(themeScript(container)?.type).toBe('application/json');
    expect(console.error).not.toHaveBeenCalled();
  });
});

/**
 * The script a real server sends: no document, so `cookie.domain: 'auto'` has
 * nothing to probe and resolves to no domain at all. jsdom keeps `window`, so
 * the client-only `application/json` marker is stripped as in renderOnServer.
 */
const renderScriptWithoutDocument = (element: ReactElement) => {
  vi.stubGlobal('document', undefined);

  let html: string;

  try {
    html = renderToString(element);
  } finally {
    vi.unstubAllGlobals();
  }

  const container = document.createElement('div');

  container.innerHTML = html.replace(' type="application/json"', '');
  document.body.append(container);

  return { container, text: themeScript(container)?.textContent ?? '' };
};

/** Run the script as the parser would, before any React code */
const runScript = (text: string) => {
  new Function(text)();

  return document.documentElement.getAttribute('data-theme');
};

const cookieWrites = () =>
  vi.spyOn(document, 'cookie', 'set') as unknown as {
    mock: { calls: Array<[string]> };
  };

describe('when the theme script was rendered without a document', () => {
  it('should paint the value the provider reads when a host-only cookie disagrees with the shared one', () => {
    // a host-only value an earlier deploy left next to the shared cookie;
    // `system` would paint light here (matchMedia mock), so a dark shared
    // cookie tells the default and the shared value apart
    document.cookie = 'montage-theme=light; Path=/';
    document.cookie = 'montage-theme=dark; Path=/; Domain=.wanted.co.kr';

    const { container, text } = renderScriptWithoutDocument(tree);

    expect(runScript(text)).toBe('dark');

    hydrate(container, tree);

    // the provider sweeps the host-only cookie and reads the shared one, so
    // hydration leaves the first paint as it was
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.cookie).toBe('montage-theme=dark');
  });

  it("should render the same script with and without a document under 'auto'", () => {
    const withoutDocument = renderScriptWithoutDocument(tree).text;

    document.body.replaceChildren();

    const container = document.createElement('div');

    // jsdom detects `.wanted.co.kr` here, which the server never can
    container.innerHTML = renderToString(tree);

    expect(themeScript(container)?.textContent).toBe(withoutDocument);
  });

  it('should not sweep when the stored values agree', () => {
    // the first load after a host gains a domain: the host-only cookie is the
    // only one holding the choice, and the provider re-homes it
    document.cookie = 'montage-theme=dark; Path=/';

    const { text } = renderScriptWithoutDocument(tree);
    const writes = cookieWrites();

    expect(runScript(text)).toBe('dark');
    expect(writes.mock.calls).toEqual([]);
  });

  it("should not sweep under domain 'none'", () => {
    const element = (
      <ThemeProvider
        enableDarkMode
        cookie={{ domain: 'none', key: 'admin-theme' }}
      >
        <Child />
      </ThemeProvider>
    );

    document.cookie = 'admin-theme=dark; Path=/';
    document.cookie = 'admin-theme=light; Path=/; Domain=.wanted.co.kr';

    const { text } = renderScriptWithoutDocument(element);
    const writes = cookieWrites();

    // the disagreement stays unresolved, as it does in the provider
    expect(runScript(text)).toBe('light');
    expect(writes.mock.calls).toEqual([]);
    expect(text).not.toContain('Max-Age=0');
  });

  it('should not sweep for a __Host- key', () => {
    const { text } = renderScriptWithoutDocument(
      <ThemeProvider enableDarkMode cookie={{ key: '__Host-theme' }}>
        <Child />
      </ThemeProvider>,
    );

    expect(text).not.toContain('Max-Age=0');
  });

  it('should not touch cookies when the theme is forced', () => {
    document.cookie = 'montage-theme=light; Path=/';
    document.cookie = 'montage-theme=dark; Path=/; Domain=.wanted.co.kr';

    const { text } = renderScriptWithoutDocument(
      <ThemeProvider>
        <Child />
      </ThemeProvider>,
    );
    const writes = cookieWrites();

    expect(runScript(text)).toBe('light');
    expect(writes.mock.calls).toEqual([]);
    expect(text).not.toContain('cookie');
  });

  it('should keep the nonce on the script', () => {
    const { container } = renderScriptWithoutDocument(
      <ThemeProvider enableDarkMode nonce="abc">
        <Child />
      </ThemeProvider>,
    );

    expect(themeScript(container)?.getAttribute('nonce')).toBe('abc');
  });
});
