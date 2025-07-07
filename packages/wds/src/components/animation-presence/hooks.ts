import { useLayoutEffect, useReducer, useState } from 'react';

type PresenceState = 'mounted' | 'unmounted' | 'unmountTriggered';

type PresenceAction = 'UNMOUNT' | 'ANIMATION_START' | 'MOUNT' | 'ANIMATION_END';

const useAnimationPresenceState = (initialState: PresenceState) => {
  return useReducer(
    (state: PresenceState, action: PresenceAction): PresenceState => {
      switch (action) {
        case 'UNMOUNT':
          return state === 'mounted' ? 'unmounted' : state;
        case 'MOUNT':
          return 'mounted';
        case 'ANIMATION_START':
          return state === 'mounted' ? 'unmountTriggered' : state;
        case 'ANIMATION_END':
          return state === 'unmountTriggered' ? 'unmounted' : state;
        default:
          return state;
      }
    },
    initialState,
  );
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const useSafeLayoutEffect = globalThis?.document ? useLayoutEffect : () => {};

export const useAnimationPresence = (
  present: boolean,
  options?: GetAnimationsOptions,
) => {
  const [node, setNode] = useState<HTMLElement | null>(null);

  const initialState: PresenceState = present ? 'mounted' : 'unmounted';

  const [state, dispatch] = useAnimationPresenceState(initialState);

  useSafeLayoutEffect(() => {
    if (present) {
      return dispatch('MOUNT');
    }

    if (!node) return;

    let cleanup: Array<() => void> = [];

    const animations = node.getAnimations(options);

    if (animations.length === 0) {
      return dispatch('UNMOUNT');
    }

    dispatch('ANIMATION_START');

    const handleAnimationEnd = () => {
      const running = animations.some((a) => a.playState === 'running');

      if (!running) {
        dispatch('ANIMATION_END');
      }
    };

    animations.forEach((animation) => {
      animation.effect?.updateTiming({ fill: 'forwards' });

      const onFinish = () => handleAnimationEnd();
      const onCancel = () => handleAnimationEnd();

      animation.addEventListener('finish', onFinish);
      animation.addEventListener('cancel', onCancel);

      cleanup.push(() => {
        animation.removeEventListener('finish', onFinish);
        animation.removeEventListener('cancel', onCancel);
      });
    });

    return () => {
      cleanup.forEach((off) => off());
      cleanup = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [present, node]);

  return { isPresent: state !== 'unmounted', ref: setNode };
};
