import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { PaginationDots } from '.';

describe('when given pagination dots component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render given number of dots and active state', () => {
    const { container } = render(
      <PaginationDots totalPages={5} currentPage={3} />,
    );

    const buttons = container.querySelectorAll(
      '[data-role="pagination-dot-button"]',
    );
    expect(buttons.length).toBe(5);

    expect(buttons[2]).toHaveAttribute('aria-selected', 'true');
    expect(buttons[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('should call onClickDot with the clicked page index (1-based)', () => {
    const onClickDot = vi.fn();
    const { container } = render(
      <PaginationDots totalPages={4} currentPage={2} onClickDot={onClickDot} />,
    );

    const buttons = container.querySelectorAll(
      '[data-role="pagination-dot-button"]',
    );
    const target = buttons.item(3) as HTMLElement;
    fireEvent.click(target);
    expect(onClickDot).toHaveBeenCalledWith(4);
  });

  it('should select focused dot via roving focus when arrow keys are pressed', async () => {
    const onClickDot = vi.fn();
    const { container } = render(
      <PaginationDots totalPages={3} currentPage={1} onClickDot={onClickDot} />,
    );

    const buttons = container.querySelectorAll(
      '[data-role="pagination-dot-button"]',
    );
    fireEvent.focus(buttons[0]!);
    fireEvent.keyDown(buttons[0]!, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(onClickDot).toHaveBeenCalledWith(2);
    });
  });

  it('should not add leading margin to the first dot when visibleArea starts below zero', () => {
    // totalPages(4) < maxDotCount(5) + 마지막 페이지 → visibleArea가 [-1, 3]이 되는 케이스
    const { container } = render(
      <PaginationDots totalPages={4} currentPage={4} maxDotCount={5} />,
    );

    const buttons = container.querySelectorAll(
      '[data-role="pagination-dot-button"]',
    );
    expect(getComputedStyle(buttons[0]!).marginLeft).toBe('0px');
  });

  it('should throw on invalid totalPages in non-production env', () => {
    expect(() => render(<PaginationDots totalPages={-1} />)).toThrow(
      'Invalid totalPages in PaginationDots',
    );
  });

  it('should pass accessibility tests', async () => {
    render(<PaginationDots totalPages={5} currentPage={2} />);

    const tablist = screen.getByRole('tablist');
    expect(await axe(tablist)).toHaveNoViolations();

    const dots = screen.getAllByRole('tab');
    for (const dot of dots) {
      expect(await axe(dot)).toHaveNoViolations();
    }
  });
});
