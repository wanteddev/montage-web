import { axe } from 'vitest-axe';
import { cleanup, render, screen } from '@testing-library/react';

import Loading from '.';

import type { RenderResult } from '@testing-library/react';

describe('when given loading component', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<Loading data-testid="loading" />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render Loading component', async () => {
    const { container } = rendered;
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    const { container } = rendered;
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render multiple instances correctly', () => {
    cleanup();

    render(
      <div>
        <Loading data-testid="loading" />
        <Loading data-testid="loading" />
        <Loading data-testid="loading" />
      </div>,
    );

    const loadingElements = screen.getAllByTestId('loading');
    expect(loadingElements).toHaveLength(3);
  });

  it('should handle unmounting and rerendering', () => {
    const { unmount, rerender } = rendered;

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    rerender(<Loading data-testid="loading" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    unmount();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
