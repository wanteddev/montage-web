import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@wanteddev/wds-engine';

import { useMedia } from '../../hooks/internal/use-media';
import { getPreviousValue } from '../../utils/internal/responsive-props';

import {
  BOTTOM_SHEET_PEEK_PADDING,
  BOTTOM_SHEET_SHADOW,
  MODAL_NAME,
} from './constants';
import { useModalContext } from './contexts';
import { calcOpacityRatio, isMouseDownOnPeek, isTouchEvent } from './helpers';

import type { RefObject } from 'react';
import type { BreakPoint } from '@wanteddev/wds-engine';
import type { ModalContainerProps } from './types';

export const useDraggable = ({
  variant: givenVariant,
  peekHeight: givenPeekHeight,
  handle: givenHandle,
  xs,
  sm,
  md,
  lg,
  xl,
  target,
  dimmerRef,
}: Omit<ModalContainerProps, 'target'> & {
  target: HTMLDivElement | null;
  dimmerRef: RefObject<HTMLDivElement | null>;
}) => {
  const theme = useTheme();

  const breakpoint = useMemo(
    () => Object.keys(theme.breakpoint) as Array<keyof BreakPoint>,
    [theme.breakpoint],
  );

  const variant = useMedia(
    breakpoint.map((v) => `(min-width: ${theme.breakpoint[v]})`),
    breakpoint.map((v) =>
      getPreviousValue({ xs, sm, md, lg, xl }, 'variant', givenVariant, v),
    ),
    givenVariant,
  );

  const handle = useMedia(
    breakpoint.map((v) => `(min-width: ${theme.breakpoint[v]})`),
    breakpoint.map((v) =>
      getPreviousValue({ xs, sm, md, lg, xl }, 'handle', givenHandle, v),
    ),
    givenHandle,
  );

  const isEnabled = variant === 'bottom' && Boolean(handle);

  const { setIsBottomSheet, ...context } = useModalContext(MODAL_NAME);

  const isDragging = useRef(false);

  const topNavigationHeight = useRef(0);

  const startedY = useRef(0);

  useEffect(() => {
    setIsBottomSheet(variant === 'bottom');
  }, [variant, setIsBottomSheet]);

  const peekHeight = useRef(
    givenPeekHeight !== undefined ? Math.max(givenPeekHeight, 20) : undefined,
  );

  useEffect(() => {
    peekHeight.current =
      givenPeekHeight !== undefined ? Math.max(givenPeekHeight, 20) : undefined;
  }, [givenPeekHeight]);

  const calcTopNavigationHeight = () => {
    const topNavigation = target?.querySelector(
      '[wds-component="top-navigation"]',
    );

    const topNavigationToolbarHeight =
      target?.querySelector('[data-role="top-navigation-toolbar"]')
        ?.clientHeight ?? 0;

    topNavigationHeight.current = topNavigation
      ? topNavigation.clientHeight - topNavigationToolbarHeight
      : 20;
  };

  const handleVisibilityHidden = () => {
    const container = context.containerRef.current;

    if (!container) {
      return;
    }

    context.setVisibility('hidden');
  };

  useEffect(() => {
    const container = context.containerRef.current;
    if (!isEnabled || !container) {
      return;
    }

    calcTopNavigationHeight();

    if (context.visibility === 'hidden' && context.open) {
      container.style.removeProperty('transition');
      container.style.setProperty(
        '--wds-modal-translate',
        `calc(100% - ${
          peekHeight.current ??
          topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING
        }px)`,
      );
      dimmerRef.current?.style.removeProperty('transition');
      dimmerRef.current?.style.removeProperty('opacity');
    } else if (!context.open) {
      container.style.removeProperty('transition');
      dimmerRef.current?.style.removeProperty('transition');
      dimmerRef.current?.style.removeProperty('opacity');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled, context.visibility, context.open]);

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const container = context.containerRef.current;

    if (!isEnabled || isDragging.current || !container) {
      return;
    }

    // In iOS, target may be undefined when long-pressing, so use try-catch
    try {
      if (
        (e.target as HTMLElement).closest(
          '[data-role="modal-container-grabber"]',
        ) ||
        isMouseDownOnPeek(
          e,
          peekHeight.current ??
            topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING,
        )
      ) {
        calcTopNavigationHeight();

        startedY.current = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;
        isDragging.current = true;
        context.containerRef.current?.style.setProperty('transition', 'none');
        dimmerRef.current?.style.setProperty('transition', 'none');
      }
    } catch (err) {
      isDragging.current = false;
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const container = context.containerRef.current;

      if (!isDragging.current || !isEnabled || !container) {
        return;
      }

      e.preventDefault();

      const clientY = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;

      const minPosition = window.innerHeight - container.clientHeight;
      const maxPosition =
        window.innerHeight -
        (peekHeight.current ??
          topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING);

      const handleOpacityRatioStyle = (input: number) => {
        dimmerRef.current?.style.setProperty(
          'opacity',
          calcOpacityRatio(input, minPosition, maxPosition).toFixed(2),
        );

        if (calcOpacityRatio(input, minPosition, maxPosition) <= 0.25) {
          container.style.setProperty('box-shadow', BOTTOM_SHEET_SHADOW);
        } else {
          container.style.removeProperty('box-shadow');
        }
      };

      const diffY = clientY - startedY.current;

      // Dragging down
      if (diffY > 0) {
        if (context.visibility === 'hidden') {
          const nextPosition =
            (peekHeight.current ??
              topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING) - diffY;
          handleOpacityRatioStyle(window.innerHeight - nextPosition);
          return container.style.setProperty(
            '--wds-modal-translate',
            `calc(100% - ${nextPosition}px)`,
          );
        }

        const nextPosition = diffY;
        handleOpacityRatioStyle(minPosition + nextPosition);
        return container.style.setProperty(
          '--wds-modal-translate',
          `calc(${nextPosition}px)`,
        );
      }

      // Dragging up
      if (diffY < 0 && context.visibility === 'hidden') {
        const nextPosition =
          Math.abs(diffY) +
          (peekHeight.current ??
            topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING);

        if (minPosition >= window.innerHeight - nextPosition) {
          handleOpacityRatioStyle(minPosition);
          return container.style.setProperty('--wds-modal-translate', `0px`);
        }

        handleOpacityRatioStyle(window.innerHeight - nextPosition);
        return container.style.setProperty(
          '--wds-modal-translate',
          `calc(100% - ${nextPosition}px)`,
        );
      }
    };

    const onMouseUp = async (e: MouseEvent | TouchEvent) => {
      const container = context.containerRef.current;

      if (!isEnabled || !isDragging.current || !container) {
        return;
      }

      isDragging.current = false;
      e.stopPropagation();

      container.style.removeProperty('transition');
      dimmerRef.current?.style.removeProperty('transition');

      const totalHeight = window.innerHeight - startedY.current;

      const clientY = isTouchEvent(e)
        ? e.changedTouches[0]!.clientY
        : e.clientY;

      // Prevent action if moved less than or equal to 10px
      if (Math.abs(startedY.current - clientY) <= 10) {
        if (context.visibility === 'hidden') {
          container.style.setProperty(
            '--wds-modal-translate',
            `calc(100% - ${
              peekHeight.current ??
              topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING
            }px)`,
          );
          container.style.setProperty('box-shadow', BOTTOM_SHEET_SHADOW);
          dimmerRef.current?.style.setProperty('opacity', '0');
        } else {
          container.style.setProperty('--wds-modal-translate', '0px');
          container.style.removeProperty('box-shadow');
          dimmerRef.current?.style.setProperty('opacity', '1');
        }

        return;
      }

      if (window.innerHeight - clientY <= totalHeight / 1.25) {
        context.setVisibility('hidden');
        container.style.setProperty(
          '--wds-modal-translate',
          `calc(100% - ${
            peekHeight.current ??
            topNavigationHeight.current + BOTTOM_SHEET_PEEK_PADDING
          }px)`,
        );
        container.style.setProperty('box-shadow', BOTTOM_SHEET_SHADOW);
        dimmerRef.current?.style.setProperty('opacity', '0');
      } else {
        context.setVisibility('visible');
        container.style.setProperty('--wds-modal-translate', '0px');
        container.style.removeProperty('box-shadow');
        dimmerRef.current?.style.setProperty('opacity', '1');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('touchmove', onMouseMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
    };
  }, [context, dimmerRef, theme, isEnabled]);

  return {
    isBottomSheetWithHandle: isEnabled,
    handleVisibilityHidden,
    onMouseDown,
    onTouchStart: onMouseDown,
  };
};
