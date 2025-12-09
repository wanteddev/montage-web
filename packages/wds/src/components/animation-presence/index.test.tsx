import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { AnimationPresence } from '.';

describe('when given animation presence component', () => {
  const originalGetAnimations = (
    HTMLElement.prototype as unknown as {
      getAnimations?: (options?: GetAnimationsOptions) => Array<Animation>;
    }
  ).getAnimations;

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();

    if (originalGetAnimations) {
      (
        HTMLElement.prototype as unknown as {
          getAnimations: (options?: GetAnimationsOptions) => Array<Animation>;
        }
      ).getAnimations = originalGetAnimations;
    } else {
      delete (
        HTMLElement.prototype as unknown as {
          getAnimations?: (options?: GetAnimationsOptions) => Array<Animation>;
        }
      ).getAnimations;
    }
  });

  it('should render children when present is true', () => {
    render(
      <AnimationPresence present>
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should unmount immediately when present becomes false and there are no animations', async () => {
    (
      HTMLElement.prototype as unknown as {
        getAnimations: (o?: GetAnimationsOptions) => Array<Animation>;
      }
    ).getAnimations = vi.fn(() => []);

    const { rerender } = render(
      <AnimationPresence present>
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    rerender(
      <AnimationPresence present={false}>
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should keep children until animations finish, then unmounts', async () => {
    const listeners = new Map<string, Set<(...args: Array<unknown>) => void>>();

    const animation = {
      playState: 'running',
      effect: { updateTiming: vi.fn(), target: document.createElement('div') },
      addEventListener: (
        type: string,
        cb: (...args: Array<unknown>) => void,
      ) => {
        if (!listeners.has(type)) listeners.set(type, new Set());
        listeners.get(type)!.add(cb);
      },
      removeEventListener: (
        type: string,
        cb: (...args: Array<unknown>) => void,
      ) => {
        listeners.get(type)?.delete(cb);
      },
    } as unknown as Animation;

    (
      HTMLElement.prototype as unknown as {
        getAnimations: (o?: GetAnimationsOptions) => Array<Animation>;
      }
    ).getAnimations = vi.fn(() => [animation]);

    const { rerender } = render(
      <AnimationPresence present>
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    rerender(
      <AnimationPresence present={false}>
        <div data-testid="content" />
      </AnimationPresence>,
    );

    // Still present while animations are running
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Finish all animations
    (animation as unknown as { playState: string }).playState = 'finished';
    listeners.get('finish')?.forEach((cb) => cb());

    await waitFor(() => {
      expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    });
  });

  it('should pass options to getAnimations', () => {
    const getAnimations = vi.fn(() => [] as Array<Animation>);
    (
      HTMLElement.prototype as unknown as {
        getAnimations: (o?: GetAnimationsOptions) => Array<Animation>;
      }
    ).getAnimations = getAnimations;

    const options: GetAnimationsOptions = { subtree: true };

    const { rerender } = render(
      <AnimationPresence present options={options}>
        <div>
          <div data-testid="content" />
        </div>
      </AnimationPresence>,
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    rerender(
      <AnimationPresence present={false} options={options}>
        <div>
          <div data-testid="content" />
        </div>
      </AnimationPresence>,
    );

    expect(getAnimations).toHaveBeenCalledWith(options);
  });

  it('should unmount immediately when filter returns false for all animations', async () => {
    const target = document.createElement('div');
    target.setAttribute('data-ignore', 'true');

    const animation = {
      playState: 'running',
      effect: {
        updateTiming: vi.fn(),
        target,
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Animation;

    (
      HTMLElement.prototype as unknown as {
        getAnimations: (o?: GetAnimationsOptions) => Array<Animation>;
      }
    ).getAnimations = vi.fn(() => [animation]);

    const { rerender } = render(
      <AnimationPresence
        present
        options={{ filter: (node) => !node.hasAttribute('data-ignore') }}
      >
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    rerender(
      <AnimationPresence
        present={false}
        options={{ filter: (node) => !node.hasAttribute('data-ignore') }}
      >
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should wait for all animations to finish if at least one passes the filter', async () => {
    const target = document.createElement('div');
    target.setAttribute('data-ignore', 'true');

    const listeners = new Map<string, Set<(...args: Array<unknown>) => void>>();
    const animation = {
      playState: 'running',
      effect: {
        updateTiming: vi.fn(),
        target,
      },
      addEventListener: (
        type: string,
        cb: (...args: Array<unknown>) => void,
      ) => {
        if (!listeners.has(type)) listeners.set(type, new Set());
        listeners.get(type)!.add(cb);
      },
      removeEventListener: (
        type: string,
        cb: (...args: Array<unknown>) => void,
      ) => {
        listeners.get(type)?.delete(cb);
      },
    } as unknown as Animation;

    (
      HTMLElement.prototype as unknown as {
        getAnimations: (o?: GetAnimationsOptions) => Array<Animation>;
      }
    ).getAnimations = vi.fn(() => [animation]);

    const { rerender } = render(
      <AnimationPresence
        present
        options={{
          filter: (node) => node.isSameNode(target),
        }}
      >
        <div data-testid="content" />
      </AnimationPresence>,
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    rerender(
      <AnimationPresence
        present={false}
        options={{ filter: (node) => node.isSameNode(target) }}
      >
        <div data-testid="content" />
      </AnimationPresence>,
    );

    // Still present while animations are running
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Finish all animations
    (animation as unknown as { playState: string }).playState = 'finished';
    listeners.get('finish')?.forEach((cb) => cb());

    await waitFor(() => {
      expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    });
  });
});
