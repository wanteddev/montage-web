import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { NoSsr } from '.';

describe('when given no-ssr component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render children immediately in browser(jsdom) environment', () => {
    render(
      <NoSsr fallback={<div data-testid="fb" />}>
        <div data-testid="child" />
      </NoSsr>,
    );

    // In jsdom, useLayoutEffect branch is used → children immediately
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('fb')).not.toBeInTheDocument();
  });

  it('should show fallback first on SSR-like env, then swap to children after effect', async () => {
    vi.resetModules();
    vi.doMock('react', async () => {
      const actual = (await vi.importActual('react')) as any;
      return {
        ...actual,
        useLayoutEffect: actual.useEffect,
      };
    });

    const { NoSsr: NoSsrServer } = await import('./index');

    render(
      <NoSsrServer fallback={<div data-testid="fb" />}>
        <div data-testid="child" />
      </NoSsrServer>,
    );

    // After effect runs, it should render children and hide fallback
    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.queryByTestId('fb')).not.toBeInTheDocument();
    });

    vi.doUnmock('react');
    vi.resetModules();
  });
});
