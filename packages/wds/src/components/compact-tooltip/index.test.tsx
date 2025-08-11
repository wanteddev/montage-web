import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';
import { TooltipGroup } from '../tooltip';

import {
  CompactTooltip,
  CompactTooltipContent,
  CompactTooltipTrigger,
} from '.';

vi.mock('../animation-presence', () => ({
  AnimationPresence: ({
    children,
    present,
  }: {
    children: React.ReactNode;
    present: boolean;
  }) => (present ? children : null),
}));

describe('when given hover mode compact compact-tooltip component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <CompactTooltip enterDelay={200} leaveDelay={200}>
        <CompactTooltipTrigger>
          <Button data-testid="compact-tooltip-trigger">
            CompactTooltip Trigger
          </Button>
        </CompactTooltipTrigger>
        <CompactTooltipContent data-testid="compact-tooltip-content">
          CompactTooltip Content
        </CompactTooltipContent>
      </CompactTooltip>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render compact tooltip content with mouse enter', async () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger'));
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger'));
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('compact-tooltip-content'),
      ).not.toBeInTheDocument();
    });
  });

  it('should render compact tooltip content with focus', async () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.focus(screen.getByTestId('compact-tooltip-trigger'));
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.blur(screen.getByTestId('compact-tooltip-trigger'));
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('compact-tooltip-content'),
      ).not.toBeInTheDocument();
    });
  });

  it('should pass accessibility tests', async () => {
    expect(
      await axe(screen.getByTestId('compact-tooltip-trigger')),
    ).toHaveNoViolations();

    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger'));
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
    });

    expect(
      await axe(screen.getByTestId('compact-tooltip-content')),
    ).toHaveNoViolations();
  });
});

describe('when given click mode compact-tooltip component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <CompactTooltip mode="click">
        <CompactTooltipTrigger>
          <Button data-testid="compact-tooltip-trigger">
            CompactTooltip Trigger
          </Button>
        </CompactTooltipTrigger>
        <CompactTooltipContent data-testid="compact-tooltip-content">
          CompactTooltip Content
        </CompactTooltipContent>
      </CompactTooltip>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render compact tooltip content with click', async () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId('compact-tooltip-trigger'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
    });
  });
});

describe('when given always mode compact tooltip component', () => {
  beforeEach(() => {
    render(
      <CompactTooltip mode="always" open>
        <CompactTooltipTrigger>
          <Button data-testid="compact-tooltip-trigger">
            CompactTooltip Trigger
          </Button>
        </CompactTooltipTrigger>
        <CompactTooltipContent data-testid="compact-tooltip-content">
          CompactTooltip Content
        </CompactTooltipContent>
      </CompactTooltip>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should keep open state', async () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger'));
      fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger'));
      fireEvent.click(screen.getByTestId('compact-tooltip-trigger'));
    });

    expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
  });
});

describe('when given compact tooltip with compact-tooltip group component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <TooltipGroup skipDelayDuration={350}>
        <CompactTooltip enterDelay={200} leaveDelay={200}>
          <CompactTooltipTrigger>
            <Button data-testid="compact-tooltip-trigger-1">Trigger 1</Button>
          </CompactTooltipTrigger>
          <CompactTooltipContent data-testid="compact-tooltip-content-1">
            CompactTooltip Content 1
          </CompactTooltipContent>
        </CompactTooltip>
        <CompactTooltip enterDelay={200} leaveDelay={200}>
          <CompactTooltipTrigger>
            <Button data-testid="compact-tooltip-trigger-2">Trigger 2</Button>
          </CompactTooltipTrigger>
          <CompactTooltipContent data-testid="compact-tooltip-content-2">
            CompactTooltip Content 2
          </CompactTooltipContent>
        </CompactTooltip>
      </TooltipGroup>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should open the first compact tooltip after enter delay', async () => {
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-1'));
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('compact-tooltip-content-1'),
      ).toBeInTheDocument();
    });
  });

  it('should open the second compact-tooltip immediately when moving from the first to the second within skipDelayDuration', async () => {
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-1'));
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('compact-tooltip-content-1'),
      ).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger-1'));
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-2'));
      vi.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('compact-tooltip-content-2'),
      ).toBeInTheDocument();
    });
  });

  it('should apply enter delay again if moving to another compact tooltip after skipDelayDuration', async () => {
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-1'));
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('compact-tooltip-content-1'),
      ).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger-1'));
      vi.advanceTimersByTime(350);
      fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-2'));
    });

    expect(
      screen.queryByTestId('compact-tooltip-content-2'),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('compact-tooltip-content-2'),
      ).toBeInTheDocument();
    });
  });
});
