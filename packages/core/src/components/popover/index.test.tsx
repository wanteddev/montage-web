import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { Popover, PopoverContent, PopoverTrigger } from '.';

// jsdom has no Web Animations API; AnimationPresence reads it on exit.
Object.defineProperty(window.Element.prototype, 'getAnimations', {
  value: () => [],
  writable: true,
});

describe('when the popover closes', () => {
  // Unmount restore runs in a setTimeout(0).
  const flush = () =>
    act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

  const openPopover = async () => {
    const trigger = screen.getByRole('button', { name: 'Open' });
    trigger.focus();
    fireEvent.click(trigger);
    await flush();
  };

  afterEach(() => {
    cleanup();
  });

  it('should restore focus to the trigger when content has autoFocus', async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent variant="custom">
          <input aria-label="auto" autoFocus />
        </PopoverContent>
      </Popover>,
    );

    await openPopover();
    expect(screen.getByLabelText('auto')).toHaveFocus();

    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    await flush();

    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus();
  });

  it('should respect a custom onUnmountAutoFocus', async () => {
    render(
      <>
        <button>other</button>
        <Popover>
          <PopoverTrigger>
            <button>Open</button>
          </PopoverTrigger>
          <PopoverContent
            variant="custom"
            onUnmountAutoFocus={(event) => {
              event.preventDefault();
              screen.getByRole('button', { name: 'other' }).focus();
            }}
          >
            <input aria-label="auto" autoFocus />
          </PopoverContent>
        </Popover>
      </>,
    );

    await openPopover();
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    await flush();

    expect(screen.getByRole('button', { name: 'other' })).toHaveFocus();
  });
});
