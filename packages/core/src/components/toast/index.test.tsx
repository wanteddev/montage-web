import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Toast, ToastContainer, ToastContent, ToastIcon } from '.';

import type { ToastProps } from '.';

const DEFAULT_DURATION = 3000;

vi.mock('../animation-presence', () => ({
  AnimationPresence: ({
    children,
    present,
  }: {
    children: React.ReactNode;
    present: boolean;
  }) => (present ? children : null),
}));

describe('when given toast component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <Toast defaultOpen variant="positive">
        <ToastContainer data-testid="toast-container">
          <ToastIcon data-testid="toast-icon" />
          <ToastContent data-testid="toast-content">Toast Content</ToastContent>
        </ToastContainer>
      </Toast>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    cleanup();
  });

  it(`should render toast component and ${DEFAULT_DURATION}ms after close`, async () => {
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();

    await act(() => vi.advanceTimersByTime(DEFAULT_DURATION));

    expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
  });

  it('should not close toast if mouse is over the toast container after open', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    fireEvent.mouseEnter(screen.getByTestId('toast-container'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION));

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('toast-container'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
  });

  it('should close toast even if mouse is over the toast container on non-cursor device', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    fireEvent.mouseEnter(screen.getByTestId('toast-container'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
  });
});

describe('when given toast component with each variant', () => {
  afterEach(() => {
    cleanup();
  });

  const renderToast = (variant: ToastProps['variant']) =>
    render(
      <Toast defaultOpen variant={variant}>
        <ToastContainer data-testid="toast-container">
          <ToastIcon data-testid="toast-icon" />
          <ToastContent data-testid="toast-content">Toast Content</ToastContent>
        </ToastContainer>
      </Toast>,
    );

  it('should not render icon when variant is normal', () => {
    renderToast('normal');

    expect(screen.queryByTestId('toast-icon')).not.toBeInTheDocument();
  });

  it.each(['positive', 'cautionary', 'negative'] as const)(
    'should pass accessibility tests with %s variant',
    async (variant) => {
      renderToast(variant);

      expect(
        await axe(screen.getByTestId('toast-container')),
      ).toHaveNoViolations();
      expect(
        await axe(screen.getByTestId('toast-content')),
      ).toHaveNoViolations();
      expect(await axe(screen.getByTestId('toast-icon'))).toHaveNoViolations();
    },
  );
});
