import { StrictMode, useEffect, useRef, useState } from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { FocusScope } from '.';

import type { ReactNode } from 'react';
import type { FocusScopeProps } from './types';

// Unmount restore runs in a setTimeout(0).
const flush = () =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

const EffectFocusButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  // Mirrors DateCalendar, which focuses a day from a passive effect on mount.
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <button ref={ref}>effect target</button>;
};

const TestScope = ({
  children,
  ...props
}: FocusScopeProps & { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>trigger</button>
      <button>other</button>
      {open && (
        <FocusScope trappedContent {...props}>
          <div>
            {children}
            <button onClick={() => setOpen(false)}>close</button>
          </div>
        </FocusScope>
      )}
    </>
  );
};

const openScope = async (name = 'trigger') => {
  const trigger = screen.getByRole('button', { name });
  trigger.focus();
  fireEvent.click(trigger);
  await flush();
};

const closeScope = async () => {
  fireEvent.click(screen.getByRole('button', { name: 'close' }));
  await flush();
};

describe('when given focus scope component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should focus the first tabbable on mount and restore focus to the trigger on unmount', async () => {
    render(<TestScope />);

    await openScope();
    expect(screen.getByRole('button', { name: 'close' })).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should restore focus to the trigger when a child has autoFocus', async () => {
    render(
      <TestScope>
        <input aria-label="auto" autoFocus />
      </TestScope>,
    );

    await openScope();
    expect(screen.getByLabelText('auto')).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should restore focus to the trigger when a child focuses itself in a mount effect', async () => {
    render(
      <TestScope>
        <EffectFocusButton />
      </TestScope>,
    );

    await openScope();
    expect(screen.getByRole('button', { name: 'effect target' })).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should restore focus to the trigger under StrictMode', async () => {
    render(
      <StrictMode>
        <TestScope>
          <input aria-label="auto" autoFocus />
        </TestScope>
      </StrictMode>,
    );

    await openScope();
    expect(screen.getByLabelText('auto')).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should focus the container on mount when trappedContent is false', async () => {
    render(<TestScope trappedContent={false} />);

    await openScope();
    expect(
      screen.getByRole('button', { name: 'close' }).parentElement,
    ).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should keep a custom mount focus when onMountAutoFocus prevents the default', async () => {
    render(
      <TestScope
        onMountAutoFocus={(event) => {
          event.preventDefault();
          screen.getByLabelText('custom').focus();
        }}
      >
        <button>first</button>
        <input aria-label="custom" />
      </TestScope>,
    );

    await openScope();
    expect(screen.getByLabelText('custom')).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should keep a custom unmount focus when onUnmountAutoFocus prevents the default', async () => {
    render(
      <TestScope
        onUnmountAutoFocus={(event) => {
          event.preventDefault();
          screen.getByRole('button', { name: 'other' }).focus();
        }}
      >
        <input aria-label="auto" autoFocus />
      </TestScope>,
    );

    await openScope();
    await closeScope();

    expect(screen.getByRole('button', { name: 'other' })).toHaveFocus();
  });

  it('should not move focus on unmount when onUnmountAutoFocus prevents the default without focusing', async () => {
    render(
      <TestScope onUnmountAutoFocus={(event) => event.preventDefault()} />,
    );

    await openScope();
    await closeScope();

    expect(document.body).toHaveFocus();
  });

  it('should still restore focus when onUnmountAutoFocus does not prevent the default', async () => {
    const onUnmountAutoFocus = vi.fn();

    render(<TestScope onUnmountAutoFocus={onUnmountAutoFocus} />);

    await openScope();
    await closeScope();

    expect(onUnmountAutoFocus).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should neither move nor restore focus when disableFocusScope is true', async () => {
    render(
      <TestScope disableFocusScope>
        <button>first</button>
      </TestScope>,
    );

    await openScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();

    screen.getByRole('button', { name: 'first' }).focus();
    await closeScope();

    expect(document.body).toHaveFocus();
  });

  it('should restore focus to the trigger of each open', async () => {
    const Scopes = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button onClick={() => setOpen(true)}>trigger a</button>
          <button onClick={() => setOpen(true)}>trigger b</button>
          {open && (
            <FocusScope trappedContent>
              <div>
                <input aria-label="auto" autoFocus />
                <button onClick={() => setOpen(false)}>close</button>
              </div>
            </FocusScope>
          )}
        </>
      );
    };

    render(<Scopes />);

    await openScope('trigger a');
    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger a' })).toHaveFocus();

    await openScope('trigger b');
    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger b' })).toHaveFocus();
  });

  it('should keep the trigger captured on mount across re-renders', async () => {
    const Rerendering = () => {
      const [open, setOpen] = useState(false);
      const [count, setCount] = useState(0);

      return (
        <>
          <button onClick={() => setOpen(true)}>trigger</button>
          {open && (
            <FocusScope trappedContent>
              <div>
                <button onClick={() => setCount((c) => c + 1)}>
                  count {count}
                </button>
                <button onClick={() => setOpen(false)}>close</button>
              </div>
            </FocusScope>
          )}
        </>
      );
    };

    render(<Rerendering />);

    await openScope();
    const counter = screen.getByRole('button', { name: 'count 0' });
    counter.focus();
    fireEvent.click(counter);
    expect(screen.getByRole('button', { name: 'count 1' })).toHaveFocus();

    await closeScope();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('should restore focus to each trigger in order when scopes are nested', async () => {
    const Nested = () => {
      const [outer, setOuter] = useState(false);
      const [inner, setInner] = useState(false);

      return (
        <>
          <button onClick={() => setOuter(true)}>outer trigger</button>
          {outer && (
            <FocusScope trappedContent>
              <div>
                <input aria-label="outer auto" autoFocus />
                <button onClick={() => setInner(true)}>inner trigger</button>
                <button onClick={() => setOuter(false)}>close outer</button>
                {inner && (
                  <FocusScope trappedContent>
                    <div>
                      <input aria-label="inner auto" autoFocus />
                      <button onClick={() => setInner(false)}>
                        close inner
                      </button>
                    </div>
                  </FocusScope>
                )}
              </div>
            </FocusScope>
          )}
        </>
      );
    };

    render(<Nested />);

    await openScope('outer trigger');
    expect(screen.getByLabelText('outer auto')).toHaveFocus();

    await openScope('inner trigger');
    expect(screen.getByLabelText('inner auto')).toHaveFocus();

    fireEvent.click(screen.getByRole('button', { name: 'close inner' }));
    await flush();
    expect(screen.getByRole('button', { name: 'inner trigger' })).toHaveFocus();

    fireEvent.click(screen.getByRole('button', { name: 'close outer' }));
    await flush();
    expect(screen.getByRole('button', { name: 'outer trigger' })).toHaveFocus();
  });

  it.each([
    ['in an effect after close', 'effect'],
    ['in a setTimeout(0) after close', 'timeout'],
  ] as const)(
    'should keep focus the consumer moved elsewhere %s',
    async (_, timing) => {
      const MoveFocusOnClose = () => {
        const [open, setOpen] = useState(false);
        const wasOpen = useRef(false);

        useEffect(() => {
          if (wasOpen.current && !open && timing === 'effect') {
            screen.getByRole('button', { name: 'other' }).focus();
          }
          wasOpen.current = open;
        }, [open]);

        return (
          <>
            <button onClick={() => setOpen(true)}>trigger</button>
            <button>other</button>
            {open && (
              <FocusScope trappedContent>
                <div>
                  <input aria-label="auto" autoFocus />
                  <button
                    onClick={() => {
                      setOpen(false);

                      if (timing === 'timeout') {
                        setTimeout(() =>
                          screen.getByRole('button', { name: 'other' }).focus(),
                        );
                      }
                    }}
                  >
                    close
                  </button>
                </div>
              </FocusScope>
            )}
          </>
        );
      };

      render(<MoveFocusOnClose />);

      await openScope();
      await closeScope();

      expect(screen.getByRole('button', { name: 'other' })).toHaveFocus();
    },
  );

  it('should fall back to the body when the trigger is gone on unmount', async () => {
    const RemovableTrigger = () => {
      const [open, setOpen] = useState(false);
      const [showTrigger, setShowTrigger] = useState(true);

      return (
        <>
          {showTrigger && (
            <button onClick={() => setOpen(true)}>trigger</button>
          )}
          {open && (
            <FocusScope trappedContent>
              <div>
                <button
                  onClick={() => {
                    setShowTrigger(false);
                    setOpen(false);
                  }}
                >
                  close
                </button>
              </div>
            </FocusScope>
          )}
        </>
      );
    };

    render(<RemovableTrigger />);

    await openScope();
    await closeScope();

    expect(document.body).toHaveFocus();
  });
});
