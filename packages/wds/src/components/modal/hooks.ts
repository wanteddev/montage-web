import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@wanteddev/wds-engine';

import { getPreviousValue } from '../../utils/responsive-props';

import { MODAL_NAME } from './constants';
import { useModalContext } from './contexts';

import type { BreakPoint } from '@wanteddev/wds-engine';
import type { ModalContainerProps } from './types';

export const useDraggable = ({
  variant: givenVariant,
  handle: givenHandle,
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
      getPreviousValue({ xs, sm, md, lg, xl }, 'variant', givenVariant, v),
    ),
    'popup',
  );

  const handle = useMedia(
    breakpoint.map((v) => `(min-width: ${theme.breakpoint[v]})`),
    breakpoint.map((v) =>
      getPreviousValue({ xs, sm, md, lg, xl }, 'handle', givenHandle, v),
    ),
    givenHandle,
  );

  const isEnabled = variant !== 'popup' && handle;
  const isBottomSheet = variant === 'bottom';

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
    context.containerRef.current?.style.setProperty('transition', 'none');
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

      container.style.removeProperty('transition');

      const totalHeight = window.innerHeight - startedY.current;

      if (window.innerHeight - clientY.current <= totalHeight / 2) {
        context.onOpenChange(false);
      } else {
        container.style.setProperty('--wds-modal-translate', '0px');
      }
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
    isBottomSheet,
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

  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const index = mediaQueryLists.findIndex((mql) => mql.matches);

    return typeof values[index] !== 'undefined'
      ? (values[index] as T)
      : defaultValue;
  }, [defaultValue, values, mediaQueryLists]);

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
    [mediaQueryLists, getValue],
  );

  return value;
};
