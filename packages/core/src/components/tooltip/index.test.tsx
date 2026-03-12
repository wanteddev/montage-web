import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';

import { Tooltip, TooltipContent, TooltipGroup, TooltipTrigger } from '.';

vi.mock('../animation-presence', () => ({
  AnimationPresence: ({
    children,
    present,
  }: {
    children: React.ReactNode;
    present: boolean;
  }) => (present ? children : null),
}));

describe('when given hover mode tooltip component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <Tooltip enterDelay={200} leaveDelay={200}>
        <TooltipTrigger>
          <Button data-testid="tooltip-trigger">Tooltip Trigger</Button>
        </TooltipTrigger>
        <TooltipContent data-testid="tooltip-content">
          Tooltip Content
        </TooltipContent>
      </Tooltip>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render tooltip content with mouse enter', () => {
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger'));
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('tooltip-trigger'));
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
  });

  it('should render tooltip content with focus', () => {
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();

    act(() => {
      fireEvent.focus(screen.getByTestId('tooltip-trigger'));
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();

    act(() => {
      fireEvent.blur(screen.getByTestId('tooltip-trigger'));
      vi.advanceTimersByTime(0);
    });

    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    expect(
      await axe(screen.getByTestId('tooltip-trigger')),
    ).toHaveNoViolations();

    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger'));
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();

    expect(
      await axe(screen.getByTestId('tooltip-content')),
    ).toHaveNoViolations();
  });
});

describe('when given click mode tooltip component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <Tooltip mode="click">
        <TooltipTrigger>
          <Button data-testid="tooltip-trigger">Tooltip Trigger</Button>
        </TooltipTrigger>
        <TooltipContent data-testid="tooltip-content">
          Tooltip Content
        </TooltipContent>
      </Tooltip>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render tooltip content with click', () => {
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId('tooltip-trigger'));
      vi.runAllTimers();
    });

    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });
});

describe('when given always mode tooltip component', () => {
  beforeEach(() => {
    render(
      <Tooltip mode="always" open>
        <TooltipTrigger>
          <Button data-testid="tooltip-trigger">Tooltip Trigger</Button>
        </TooltipTrigger>
        <TooltipContent data-testid="tooltip-content">
          Tooltip Content
        </TooltipContent>
      </Tooltip>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should keep open state', () => {
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();

    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger'));
    fireEvent.mouseLeave(screen.getByTestId('tooltip-trigger'));
    fireEvent.click(screen.getByTestId('tooltip-trigger'));

    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });
});

describe('when given tooltip with tooltip group component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <TooltipGroup skipDelayDuration={350}>
        <Tooltip enterDelay={200} leaveDelay={200}>
          <TooltipTrigger>
            <Button data-testid="tooltip-trigger-1">Trigger 1</Button>
          </TooltipTrigger>
          <TooltipContent data-testid="tooltip-content-1">
            Tooltip Content 1
          </TooltipContent>
        </Tooltip>
        <Tooltip enterDelay={200} leaveDelay={200}>
          <TooltipTrigger>
            <Button data-testid="tooltip-trigger-2">Trigger 2</Button>
          </TooltipTrigger>
          <TooltipContent data-testid="tooltip-content-2">
            Tooltip Content 2
          </TooltipContent>
        </Tooltip>
      </TooltipGroup>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should open the first tooltip after enter delay', () => {
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger-1'));
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('tooltip-content-1')).toBeInTheDocument();
  });

  it('should open the second tooltip immediately when moving from the first to the second within skipDelayDuration', () => {
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger-1'));
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('tooltip-content-1')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('tooltip-trigger-1'));
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger-2'));
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('tooltip-content-2')).toBeInTheDocument();
  });

  it('should apply enter delay again if moving to another tooltip after skipDelayDuration', () => {
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger-1'));
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('tooltip-content-1')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('tooltip-trigger-1'));
      vi.advanceTimersByTime(350);
      fireEvent.mouseEnter(screen.getByTestId('tooltip-trigger-2'));
    });

    expect(screen.queryByTestId('tooltip-content-2')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('tooltip-content-2')).toBeInTheDocument();
  });
});
