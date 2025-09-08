import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  Snackbar,
  SnackbarAction,
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
          <SnackbarAction data-testid="snackbar-action">
            Snackbar Action
          </SnackbarAction>
        </SnackbarContent>
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

  it('should not close snackbar if mouse is over the toast container after open', () => {
    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION / 2));

    fireEvent.mouseEnter(screen.getByTestId('snackbar'));

    act(() => vi.advanceTimersByTime(DEFAULT_DURATION));

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('snackbar'));

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
