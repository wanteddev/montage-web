import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useCallback, useEffect, useRef } from 'react';

import { getPointerGraceArea, isPointInPolygon } from './helpers';

import type { Polygon } from './helpers';
import type { PointerEvent as ReactPointerEvent } from 'react';

/** How long the pointer may rest inside the grace area before it expires. */
const GRACE_AREA_TIMEOUT = 300;

type UseSubmenuHoverParams = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: HTMLElement | null;
  /** The submenu popup. */
  content: HTMLElement | null;
  /** The popup the trigger lives in. Hovering elsewhere in it closes the submenu. */
  parentContent: HTMLElement | null;
  /** Whether hovering the trigger opens the submenu. */
  enabled: boolean;
  /** The delay in milliseconds from the pointer entering the trigger until the submenu opens. */
  enterDelay: number;
};

/**
 * Hover intent for a submenu trigger.
 *
 * - Opening waits `enterDelay` so sweeping across triggers does not flash popups.
 * - Leaving the trigger towards the submenu keeps it open while the pointer
 *   stays in the grace area, even when it crosses sibling items on the way.
 * - Moving onto another part of the parent popup closes the submenu. Moving
 *   off every popup keeps it open, so an overshoot does not lose the submenu.
 *
 * Only mouse pointers are tracked; touch and pen rely on click to open.
 */
export const useSubmenuHover = ({
  open,
  onOpenChange: onOpenChangeProp,
  trigger,
  content,
  parentContent,
  enabled,
  enterDelay,
}: UseSubmenuHoverParams) => {
  const onOpenChange = useCallbackRef(onOpenChangeProp);

  const openTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const graceTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const graceAreaRef = useRef<Polygon | null>(null);
  const lastTargetRef = useRef<Node | null>(null);

  const clearOpenTimer = useCallback(() => {
    clearTimeout(openTimerRef.current);
    openTimerRef.current = undefined;
  }, []);

  const clearGraceArea = useCallback(() => {
    clearTimeout(graceTimerRef.current);
    graceTimerRef.current = undefined;
    graceAreaRef.current = null;
  }, []);

  useEffect(
    () => () => {
      clearOpenTimer();
      clearGraceArea();
    },
    [clearOpenTimer, clearGraceArea],
  );

  useEffect(() => {
    // Once open by any means, a pending hover open must not fire and
    // overwrite how it was opened.
    if (open) clearOpenTimer();
    else clearGraceArea();
  }, [open, clearOpenTimer, clearGraceArea]);

  const isOverParentElsewhere = useCallback(
    (target: Node | null) =>
      Boolean(
        target &&
        parentContent?.contains(target) &&
        !trigger?.contains(target) &&
        !content?.contains(target),
      ),
    [parentContent, trigger, content],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const target = event.target as Node | null;
      lastTargetRef.current = target;

      if (trigger?.contains(target) || content?.contains(target)) {
        clearGraceArea();
        return;
      }

      const graceArea = graceAreaRef.current;

      if (
        graceArea &&
        isPointInPolygon({ x: event.clientX, y: event.clientY }, graceArea)
      ) {
        return;
      }

      clearGraceArea();

      if (isOverParentElsewhere(target)) onOpenChange(false);
    };

    document.addEventListener('pointermove', handlePointerMove);

    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, [
    open,
    trigger,
    content,
    clearGraceArea,
    isOverParentElsewhere,
    onOpenChange,
  ]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      if (!enabled || event.pointerType !== 'mouse') return;

      clearGraceArea();

      if (open || openTimerRef.current) return;

      openTimerRef.current = setTimeout(() => {
        openTimerRef.current = undefined;
        onOpenChange(true);
      }, enterDelay);
    },
    [enabled, open, enterDelay, clearGraceArea, onOpenChange],
  );

  const onPointerLeave = useCallback(
    (event: ReactPointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      clearOpenTimer();

      if (!open || !trigger || !content) return;

      graceAreaRef.current = getPointerGraceArea(
        { x: event.clientX, y: event.clientY },
        trigger.getBoundingClientRect(),
        content.getBoundingClientRect(),
      );

      clearTimeout(graceTimerRef.current);
      graceTimerRef.current = setTimeout(() => {
        graceAreaRef.current = null;
        graceTimerRef.current = undefined;

        // The pointer rested on a sibling item instead of reaching the submenu.
        if (isOverParentElsewhere(lastTargetRef.current)) onOpenChange(false);
      }, GRACE_AREA_TIMEOUT);
    },
    [
      open,
      trigger,
      content,
      clearOpenTimer,
      isOverParentElsewhere,
      onOpenChange,
    ],
  );

  return { onPointerMove, onPointerLeave };
};
