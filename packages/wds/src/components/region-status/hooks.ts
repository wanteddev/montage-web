import { useCallback, useEffect, useState } from 'react';

import { useRegionStore } from '../../stores/region-store';

import { isNotPointerDevice, makeTransitionStyle } from './helpers';

import type { CSSProperties } from 'react';
import type { RegionItemWithSystem } from '../../stores/region-store';

export const useRegionStatusAnimation = ({
  id,
  status,
  height,
  createdAt,
  pausedAt,
  duration,
  onAnimationEnd,
}: Pick<
  RegionItemWithSystem,
  | 'id'
  | 'status'
  | 'height'
  | 'createdAt'
  | 'pausedAt'
  | 'duration'
  | 'onAnimationEnd'
>) => {
  const updateHeight = useRegionStore((state) => state.updateHeight);
  const remove = useRegionStore((state) => state.remove);
  const hide = useRegionStore((state) => state.hide);
  const pause = useRegionStore((state) => state.pause);
  const resume = useRegionStore((state) => state.resume);

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    height: 0,
    margin: 0,
    width: 'initial',
    position: 'relative',
    transition: 'all 0.2s ease',
    opacity: 0,
  });

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (el) {
        const handleUpdate = () => {
          const clientHeight = el.getBoundingClientRect().height;
          updateHeight(id, clientHeight);
        };

        handleUpdate();
        new MutationObserver(handleUpdate).observe(el, {
          subtree: true,
          childList: true,
          characterData: true,
        });
      }
    },
    [id, updateHeight],
  );

  useEffect(() => {
    setContainerStyle(makeTransitionStyle({ status, height }));
  }, [status, height]);

  useEffect(() => {
    if (duration === Infinity || status !== 'visible' || pausedAt) {
      return;
    }

    const diff = Date.now() - createdAt + duration!;

    if (diff <= 0) {
      hide(id);
      return;
    }

    const timeout = setTimeout(() => {
      hide(id);
    }, diff);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pausedAt, status]);

  const onTransitionEnd = () => {
    if (status === 'visible') {
      onAnimationEnd?.('show');
      return;
    }

    onAnimationEnd?.('hide');
    remove(id);
  };

  const onMouseEnter = () => {
    if (isNotPointerDevice() && status !== 'hidden') {
      pause(id);
    }
  };

  const onMouseLeave = () => {
    resume(id);
  };

  return {
    ref,
    containerStyle,
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onTransitionEnd,
    },
  };
};
