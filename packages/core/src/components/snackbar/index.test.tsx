import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  Snackbar,
  SnackbarAction,
  SnackbarCloseButton,
  SnackbarContent,
  SnackbarDescription,
  SnackbarHeading,
} from '.';

const DEFAULT_DURATION = 4000;

vi.mock('../animation-presence', () => ({
  AnimationPresence: ({
    children,
    present,
  }: {
    children: React.ReactNode;
    present: boolean;
  }) => (present ? children : null),
}));

describe('when given snackbar component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <Snackbar defaultOpen data-testid="snackbar">
        <SnackbarContent data-testid="snackbar-content">
          <SnackbarHeading data-testid="snackbar-heading">
            Snackbar Heading
          </SnackbarHeading>
          <SnackbarDescription data-testid="snackbar-description">
            Snackbar Description
          </SnackbarDescription>
        </SnackbarContent>

        <SnackbarAction data-testid="snackbar-action">
          Snackbar Action
        </SnackbarAction>

        <SnackbarCloseButton data-testid="snackbar-close-button" />
      </Snackbar>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    cleanup();
  });

  it(`should render toast component and ${DEFAULT_DURATION}ms after close`, () => {
    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION));

    expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
  });

  it('should on click close button to close snackbar', async () => {
    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('snackbar-close-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
    });
  });

  it('should not close snackbar if mouse is over the toast container after open', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    fireEvent.mouseEnter(screen.getByTestId('snackbar'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION));

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('snackbar'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
  });

  it('should close snackbar even if mouse is over the toast container on non-cursor device', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    fireEvent.mouseEnter(screen.getByTestId('snackbar'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
  });

  it('should pass accessibility test', async () => {
    expect(await axe(screen.getByTestId('snackbar'))).toHaveNoViolations();
    expect(
      await axe(screen.getByTestId('snackbar-content')),
    ).toHaveNoViolations();
    expect(
      await axe(screen.getByTestId('snackbar-heading')),
    ).toHaveNoViolations();
  });
});
