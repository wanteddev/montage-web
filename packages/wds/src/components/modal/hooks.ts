import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@wanteddev/wds-engine';
import { flushSync } from 'react-dom';

import { getPreviousValue } from '../../utils/responsive-props';

import { MODAL_NAME } from './constants';
import { useModalContext } from './contexts';

import type { BreakPoint } from '@wanteddev/wds-engine';
import type { ModalContainerProps } from './types';

export const useDraggable = ({
  variant: defaultVariant,
  xs,
  sm,
  md,
  lg,
  xl,
}: ModalContainerProps) => {
  const theme = useTheme();

  const breakpoint = useMemo(
    () => Object.keys(theme.breakpoint) as Array<keyof BreakPoint>,
    [theme],
  );

  const variant = useMedia(
    breakpoint.map((v) => `(min-width: ${theme.breakpoint[v]})`),
    breakpoint.map((v) =>
      getPreviousValue({ xs, sm, md, lg, xl }, 'variant', defaultVariant, v),
    ),
    defaultVariant,
  );

  const isEnabled = variant === 'bottom';

  const context = useModalContext(MODAL_NAME);
  const dragStarted = useRef(false);

  const startedY = useRef(0);
  const clientY = useRef(0);

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouchEvent = (
      value: React.MouseEvent | React.TouchEvent,
    ): value is React.TouchEvent => 'touches' in value;

    if (!isEnabled || dragStarted.current) {
      return;
    }
    startedY.current = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;
    dragStarted.current = true;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!dragStarted.current || !isEnabled) {
        return;
      }

      const isTouchEvent = (
        value: MouseEvent | TouchEvent,
      ): value is TouchEvent => 'touches' in value;

      clientY.current = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;
      const container = context.containerRef.current;

      if (container && clientY.current - startedY.current > 0) {
        container.style.setProperty(
          '--wds-modal-translate',
          clientY.current - startedY.current + 'px',
        );
      }
    };

    const onMouseUp = async () => {
      if (!isEnabled || !dragStarted.current) {
        return;
      }

      dragStarted.current = false;

      const container = context.containerRef.current;

      if (!container) {
        return;
      }

      const totalHeight = window.innerHeight - startedY.current;

      container.style.transition = 'transform 0.2s ease';

      if (window.innerHeight - clientY.current <= totalHeight / 2) {
        await container.animate(
          [
            {
              transform: 'translateY(var(--wds-modal-translate, 0px))',
            },
            {
              transform: 'translateY(100%)',
            },
          ],
          {
            duration: 200,
            easing: 'ease',
          },
        ).finished;
        container.style.setProperty('--wds-modal-translate', '100%');

        flushSync(() => {
          context.onOpenChange(false);
        });

        container.style.setProperty('--wds-modal-translate', '0px');
      } else {
        container.style.setProperty('--wds-modal-translate', '0px');
      }

      container.style.transition = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
    };
  }, [context, isEnabled]);

  return {
    isEnabled,
    onMouseDown,
    onTouchStart: onMouseDown,
  };
};

const useMedia = <T>(
  queries: Array<string>,
  values: Array<T>,
  defaultValue: T,
): T => {
  const [value, setValue] = useState(defaultValue);

  const mediaQueryLists = useMemo(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    return queries.map(function (q) {
      return window.matchMedia(q);
    });
  }, [queries]);

  const getValue = () => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const index = mediaQueryLists.findIndex((mql) => mql.matches);

    return typeof values[index] !== 'undefined'
      ? (values[index] as T)
      : defaultValue;
  };

  useEffect(
    () => {
      const handler = () => {
        setValue(getValue);
      };

      mediaQueryLists.forEach((mql) => {
        handler();
        mql.addEventListener('change', handler);
      });

      return () =>
        mediaQueryLists.forEach((mql) =>
          mql.removeEventListener('change', handler),
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mediaQueryLists],
  );

  return value;
};
