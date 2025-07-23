import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';
import { TooltipGroup } from '../tooltip';

import {
  CompactTooltip,
  CompactTooltipContent,
  CompactTooltipTrigger,
} from '.';

describe('when given hover mode compact compact-tooltip component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    vi.mock('../animation-presence', () => ({
      AnimationPresence: ({
        children,
        present,
      }: {
        children: React.ReactNode;
        present: boolean;
      }) => (present ? children : null),
    }));

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

  it('should render compact tooltip content with mouse enter', () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger'));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger'));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();
  });

  it('should render compact tooltip content with focus', () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();

    fireEvent.focus(screen.getByTestId('compact-tooltip-trigger'));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();

    fireEvent.blur(screen.getByTestId('compact-tooltip-trigger'));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    expect(
      await axe(screen.getByTestId('compact-tooltip-trigger')),
    ).toHaveNoViolations();

    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger'));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();

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
    vi.useRealTimers();
  });

  it('should render compact tooltip content with click', () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(
      screen.queryByTestId('compact-tooltip-content'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('compact-tooltip-trigger'));

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();
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
  });

  it('should keep open state', () => {
    expect(screen.getByTestId('compact-tooltip-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('compact-tooltip-content')).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger'));
    fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger'));
    fireEvent.click(screen.getByTestId('compact-tooltip-trigger'));

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
    vi.useRealTimers();
    cleanup();
  });

  it('should open the first compact tooltip after enter delay', () => {
    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-1'));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('compact-tooltip-content-1')).toBeInTheDocument();
  });

  it('should open the second compact-tooltip immediately when moving from the first to the second within skipDelayDuration', () => {
    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-1'));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('compact-tooltip-content-1')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger-1'));
    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-2'));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('compact-tooltip-content-2')).toBeInTheDocument();
  });

  it('should apply enter delay again if moving to another compact tooltip after skipDelayDuration', () => {
    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-1'));
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('compact-tooltip-content-1')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('compact-tooltip-trigger-1'));

    act(() => {
      vi.advanceTimersByTime(350);
    });

    fireEvent.mouseEnter(screen.getByTestId('compact-tooltip-trigger-2'));

    expect(
      screen.queryByTestId('compact-tooltip-content-2'),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('compact-tooltip-content-2')).toBeInTheDocument();
  });
});
