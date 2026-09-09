import { act, render, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';

import ThemeProvider from '../..';

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

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute('data-theme');
  document.cookie = 'montage-theme=; Path=/; Max-Age=0';
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

    act(() => {
      hydrateRoot(container, tree);
    });

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

    act(() => {
      hydrateRoot(
        container,
        <ThemeProvider enableDarkMode nonce="abc">
          <Child />
        </ThemeProvider>,
      );
    });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('verify that the `nonce`'),
    );
  });

  it('should stay quiet when the script did paint the document', () => {
    const container = mountServerHtml();

    // stand in for the inline script having run during parse
    document.documentElement.setAttribute('data-theme', 'light');

    act(() => {
      hydrateRoot(container, tree);
    });

    expect(console.error).not.toHaveBeenCalled();
  });

  it('should stay quiet in a client-only render, where the script cannot run by design', () => {
    const { container } = render(tree);

    expect(within(container).getByText('content')).toBeInTheDocument();
    expect(themeScript(container)?.type).toBe('application/json');
    expect(console.error).not.toHaveBeenCalled();
  });
});
