import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Toast, ToastContainer, ToastContent, ToastIcon } from '.';

import type { ToastProps } from '.';

const DEFAULT_DURATION = 3000;

describe('when given toast component', () => {
  beforeEach(() => {
    vi.mock('../animation-presence', () => ({
      AnimationPresence: ({
        children,
        present,
      }: {
        children: React.ReactNode;
        present: boolean;
      }) => (present ? children : null),
    }));

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

    await waitFor(() => {
      expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
    });
  });

  it('should not close toast if mouse is over the toast container after open', async () => {
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();

    await act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    fireEvent.mouseEnter(screen.getByTestId('toast-container'));

    await act(() => vi.advanceTimersByTime(DEFAULT_DURATION));

    await waitFor(() => {
      expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(screen.getByTestId('toast-container'));

    await act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    await waitFor(() => {
      expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
    });
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
