import { useCallback, useEffect, useMemo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from '@montage-ui/engine';

import { useMedia } from '../../hooks/internal/use-media';
import { getPreviousValue } from '../../utils/internal/responsive-props';

import {
  BOTTOM_SHEET_HALF_RATIO,
  BOTTOM_SHEET_SHADOW,
  BOTTOM_SHEET_SHADOW_OPACITY_THRESHOLD,
  BOTTOM_SHEET_VELOCITY_WINDOW_MS,
  MODAL_NAME,
} from './constants';
import { useModalContext } from './contexts';
import {
  applySnap,
  computeDimmerOpacityDuringDrag,
  computeDragStyle,
  computeFullMaxHeight,
  isMouseDownOnPeek,
  isTouchEvent,
  isTouchInsideTextSelection,
  readVisualHeight,
  resolveFlexibleReleaseSnap,
  resolveNonFlexibleReleaseSnap,
  rubberBand,
  runSpring,
} from './helpers';

import type { RefObject } from 'react';
import type { BreakPoint } from '@montage-ui/engine';
import type { SpringHandle } from './helpers';
import type { ModalBottomSheetSnap, ModalContainerProps } from './types';

type ResponsiveSlice = Pick<
  ModalContainerProps,
  'variant' | 'resize' | 'handle' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
>;

/**
 * Resolve `variant` / `handle` / `resize` against the current breakpoint, then
 * derive the booleans the rest of the drag machinery branches on:
 *
 *  - `isBottom`   — sheet is in its bottom-anchored layout
 *  - `isFlexible` — bottom + `resize='flexible'`; enables half snap & height-mode drags
 *  - `isEnabled`  — gesture handling is on (grabber present *or* flexible)
 */
export const useResponsiveBottomSheetProps = ({
  variant: givenVariant,
  handle: givenHandle,
  resize: givenResize,
  xs,
  sm,
  md,
  lg,
  xl,
}: ResponsiveSlice) => {
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

  const resize = useMedia(
    breakpoint.map((v) => `(min-width: ${theme.breakpoint[v]})`),
    breakpoint.map((v) =>
      getPreviousValue({ xs, sm, md, lg, xl }, 'resize', givenResize, v),
    ),
    givenResize,
  );

  const isBottom = variant === 'bottom';
  const isFlexible = isBottom && resize === 'flexible';
  // Dragging is enabled when there's a grabber handle OR when the sheet is flexible
  // (so half/full snap transitions can happen via gesture).
  const isEnabled = isBottom && (Boolean(handle) || isFlexible);

  return { variant, handle, resize, isBottom, isFlexible, isEnabled };
};

type UseSpringSettleProps = {
  dimmerRef: RefObject<HTMLDivElement | null>;
  setSnap: (snap: ModalBottomSheetSnap) => void;
  snapRef: RefObject<ModalBottomSheetSnap>;
  peekHeightRef: RefObject<number>;
  startedVisualHeightRef: RefObject<number>;
  startedMaxHeightRef: RefObject<number>;
  startedFullMaxHeightRef: RefObject<number>;
  isFlexible: boolean;
  isOpen: boolean;
  applyDragStyles: (
    container: HTMLDivElement,
    visualHeight: number,
    diffY: number,
    maxHeight: number,
  ) => void;
};

/**
 * Owns the post-release settle spring. Exposes `settleToSnap` for drag release
 * paths, `cancelSpring` for any code path that needs to interrupt the spring
 * (snap change, modal close, new drag), and `settlingTargetSnap` so callers
 * can read the in-flight committed destination while `snapRef` is still lagging.
 */
export const useSpringSettle = ({
  dimmerRef,
  setSnap,
  snapRef,
  peekHeightRef,
  startedVisualHeightRef,
  startedMaxHeightRef,
  startedFullMaxHeightRef,
  isFlexible,
  isOpen,
  applyDragStyles,
}: UseSpringSettleProps) => {
  // In-flight spring driving the post-release settle animation. Cancelled on
  // a new drag (so the user can grab the sheet mid-spring) and on modal
  // close / unmount (so frames don't keep firing against a detached node).
  const springHandleRef = useRef<SpringHandle | null>(null);
  // The snap the in-flight spring is settling toward. `snapRef.current` lags
  // until `onComplete` flushes the state, so any code path that needs to
  // know the sheet's *committed* destination mid-spring (e.g. viewport drag
  // capture rules, the next `beginDrag`'s `startedSnap`) should read this
  // first. Cleared on cancel and on spring complete.
  const settlingTargetSnap = useRef<ModalBottomSheetSnap | null>(null);

  const cancelSpring = useCallback(() => {
    springHandleRef.current?.cancel();
    springHandleRef.current = null;
    settlingTargetSnap.current = null;
  }, []);

  // Cancel the in-flight settle spring when the modal closes or the hook
  // unmounts so rAF callbacks don't keep touching styles on a detached node.
  useEffect(() => {
    if (!isOpen) cancelSpring();
    return () => cancelSpring();
  }, [isOpen, cancelSpring]);

  /**
   * Commit a snap as the final position after a drag using a velocity-seeded
   * spring. The CSS-transition path can't carry release velocity into the
   * settle (cubic-bezier shape is fixed regardless of how fast the finger was
   * moving), so iOS-style "fling lands here, slow drop sits there" feel was
   * impossible to reproduce. Instead we drive a damped harmonic oscillator on
   * the sheet's visual height per animation frame and reuse the existing drag
   * style code so mode transitions (height ↔ translate, peek/full boundaries)
   * stay consistent through the settle.
   *
   * - `from`     = sheet height at release (`releasedHeight`)
   * - `to`       = target snap's visual height (full / half / peek)
   * - `velocity` = finger velocity remapped into sheet-height units (px/s):
   *                downward finger = shrinking sheet → invert sign.
   *
   * On completion: `flushSync` the snap state so `data-snap` is on the DOM
   * before `applySnap` strips inline overrides — otherwise the previous
   * snap's CSS rule would briefly resolve and trigger a visible jump.
   * `applySnap` itself now removes the inline `transition: none` last
   * (see helpers.ts) so the spring → CSS handoff happens with no easing
   * artifact.
   */
  const settleToSnap = useCallback(
    (
      container: HTMLDivElement,
      targetSnap: ModalBottomSheetSnap,
      releasedHeight: number,
      releaseVelocityPxPerMs: number,
    ) => {
      cancelSpring();
      // Publish the in-flight target so viewport drag-capture and the next
      // `beginDrag` (if the user re-grabs mid-spring) can see the committed
      // destination — `snapRef.current` only updates in `onComplete`.
      settlingTargetSnap.current = targetSnap;

      // Spring targets resolve against the snap-INDEPENDENT full max
      // (`startedFullMaxHeight`) — otherwise a half-start fling to `full`
      // would target halfHeight, settle there, and then jump to the real
      // full height when CSS picks up after `applySnap`.
      const fullMaxHeight = startedFullMaxHeightRef.current;
      const halfHeight = fullMaxHeight * BOTTOM_SHEET_HALF_RATIO;
      const targetVisualHeight =
        targetSnap === 'full'
          ? fullMaxHeight
          : targetSnap === 'half'
            ? halfHeight
            : peekHeightRef.current;
      const maxHeight = startedMaxHeightRef.current;

      // Finger velocity (px/ms, +down) → visual-height velocity (px/s, +grow).
      // Sheet visual height decreases as the finger moves down, so the sign
      // flips. ×1000 converts ms → s for consistency with the spring integrator.
      const heightVelocity = -releaseVelocityPxPerMs * 1000;

      springHandleRef.current = runSpring({
        from: releasedHeight,
        to: targetVisualHeight,
        velocity: heightVelocity,
        onUpdate: (visualHeight) => {
          const clamped = Math.max(0, visualHeight);
          const diffY = startedVisualHeightRef.current - clamped;
          applyDragStyles(container, clamped, diffY, maxHeight);
        },
        onComplete: () => {
          springHandleRef.current = null;
          settlingTargetSnap.current = null;
          if (targetSnap !== snapRef.current) {
            flushSync(() => {
              setSnap(targetSnap);
            });
          }
          applySnap(container, dimmerRef.current, targetSnap, {
            peekHeight: peekHeightRef.current,
          });
        },
      });
    },
    // `applyDragStyles` is intentionally omitted: it's a per-render closure
    // in the caller, so listing it would re-create `settleToSnap` every
    // render and force the mousemove/up `useEffect` to re-bind window
    // listeners. `isFlexible` already triggers re-creation on the only axis
    // that matters for behavior (responsive variant flip).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelSpring, dimmerRef, setSnap, isFlexible],
  );

  return { cancelSpring, settleToSnap, settlingTargetSnap };
};

type UseSnapLifecycleProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  dimmerRef: RefObject<HTMLDivElement | null>;
  snap: ModalBottomSheetSnap;
  setSnap: (snap: ModalBottomSheetSnap) => void;
  snapRef: RefObject<ModalBottomSheetSnap>;
  defaultSnap: ModalBottomSheetSnap | undefined;
  peekHeightRef: RefObject<number>;
  hasPeek: () => boolean;
  isDraggingRef: RefObject<boolean>;
  cancelSpring: () => void;
  isBottom: boolean;
  isFlexible: boolean;
  isEnabled: boolean;
  isOpen: boolean;
};

/**
 * Coordinates `snap` state with the inline styles `applySnap` controls:
 *
 *  - Seeds snap from `defaultSnap` (flexible) or 'full' on open.
 *  - Pushes `applySnap` whenever snap changes outside of a drag, cancelling
 *    any in-flight settle spring so the spring's per-frame writes don't fight
 *    the style clear.
 *  - Resets inline overrides on close so the sheet returns to its CSS default
 *    on the next open.
 *  - Keeps `snapRef` in sync with the current `snap` state.
 */
export const useSnapLifecycle = ({
  containerRef,
  dimmerRef,
  snap,
  setSnap,
  snapRef,
  defaultSnap,
  peekHeightRef,
  hasPeek,
  isDraggingRef,
  cancelSpring,
  isBottom,
  isFlexible,
  isEnabled,
  isOpen,
}: UseSnapLifecycleProps) => {
  useEffect(() => {
    snapRef.current = snap;
  }, [snap, snapRef]);

  // When the modal opens, seed snap from defaultSnap (flexible) or 'full'.
  useEffect(() => {
    if (!isBottom || !isOpen) return;
    if (snapRef.current === 'peek') return;

    if (isFlexible) {
      setSnap(defaultSnap ?? 'half');
    } else if (snapRef.current !== 'full') {
      setSnap('full');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom, isFlexible, isOpen]);

  // Apply snap → inline height whenever snap changes outside of an active drag.
  // `applySnap` is the single source of truth for the sheet's visual height.
  //
  // External `setSnap` calls (dimmer click, ESC, responsive variant flip,
  // controlled `snap` prop change) must cancel any in-flight settle spring,
  // otherwise the spring's per-frame `onUpdate` keeps overwriting the inline
  // styles that `applySnap` is trying to clear. When the spring completes
  // naturally it nulls its handle first, so the cancel here is a no-op on
  // that path.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isBottom || isDraggingRef.current) return;
    if (snap === 'peek' && !hasPeek()) return;

    cancelSpring();
    applySnap(container, dimmerRef.current, snap, {
      peekHeight: peekHeightRef.current,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snap, isBottom]);

  // Reset inline height when the modal closes so it returns to its CSS default
  // on next open.
  useEffect(() => {
    const container = containerRef.current;
    if (!isEnabled || !container) return;
    if (isOpen) return;

    container.style.removeProperty('transition');
    container.style.removeProperty('--modal-translate');
    dimmerRef.current?.style.removeProperty('transition');
    dimmerRef.current?.style.removeProperty('opacity');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled, isOpen]);
};

type UseDraggableProps = Pick<
  ModalContainerProps,
  | 'variant'
  | 'resize'
  | 'handle'
  | 'peekHeight'
  | 'defaultSnap'
  | 'enableHalfSnapScroll'
  | 'largestUndimmedSnap'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
> & {
  dimmerRef: RefObject<HTMLDivElement | null>;
  snap: ModalBottomSheetSnap;
  setSnap: (snap: ModalBottomSheetSnap) => void;
  setIsBottomSheet: (isBottomSheet: boolean) => void;
};

export const useDraggable = ({
  variant: givenVariant,
  resize: givenResize,
  peekHeight: givenPeekHeight,
  handle: givenHandle,
  defaultSnap: givenDefaultSnap,
  enableHalfSnapScroll,
  largestUndimmedSnap = 'peek',
  xs,
  sm,
  md,
  lg,
  xl,
  dimmerRef,
  snap,
  setSnap,
  setIsBottomSheet,
}: UseDraggableProps) => {
  const { isBottom, isFlexible, isEnabled } = useResponsiveBottomSheetProps({
    variant: givenVariant,
    handle: givenHandle,
    resize: givenResize,
    xs,
    sm,
    md,
    lg,
    xl,
  });

  const context = useModalContext(MODAL_NAME);

  const isDragging = useRef(false);
  const startedY = useRef(0);
  const startedVisualHeight = useRef(0);
  // Resolved px value of `--modal-max-height`, captured once at drag start
  // so per-frame height calculations don't trigger reflows from getComputedStyle.
  const startedMaxHeight = useRef(0);
  // Snap-INDEPENDENT full max-height — what max-height would be in
  // `data-snap='full'` regardless of the start snap. Probed at drag start.
  // Spring target visual heights (full / half) and the release-time
  // `releasedHeight` clamp resolve against this; using the current computed
  // height instead (as `startedMaxHeight` does) would cap a half-start drag
  // at halfHeight and make the spring under-shoot the real `full` position,
  // producing a visible jump after `applySnap` hands off to CSS.
  const startedFullMaxHeight = useRef(0);
  // Snap captured at drag start. `snapRef` may shift if some other source mutates
  // snap mid-drag (it doesn't today, but we want a stable anchor for the
  // direction/threshold rules).
  const startedSnap = useRef<ModalBottomSheetSnap>(snap);
  // True at touchstart if the viewport had scrollable content. Gates the
  // `enableHalfSnapScroll` live-boundary path — without scrollable content
  // the flag has no work to do, so capture wins unconditionally.
  const startedAtScrollable = useRef(false);
  // scrollTop at touchstart. Used to detect (combined with `gestureHasScrolled`)
  // whether native scroll has consumed any movement during the gesture.
  const startedScrollTop = useRef(0);
  // Sticky: set to true the first time `scrollTop` ever deviates from
  // `startedScrollTop` within this gesture. Stays true even if the viewport
  // later scrolls back to its starting position — otherwise a "scroll then
  // reverse all the way back" sequence would silently re-enable sheet capture
  // and let drag fire while native scroll was still in flight.
  const gestureHasScrolled = useRef(false);
  // Last observed clientY of the gesture — used to compute the *instantaneous*
  // direction of the most recent move, not just the cumulative `deltaY` sign.
  // Cumulative direction stays the same through tiny reversals; instantaneous
  // direction catches them, which is what the lock needs to detect a "scroll
  // then reverse to overscroll" pattern before it crosses the start point.
  const lastClientY = useRef(0);
  // Last observed sign of the instantaneous move (1 = down, -1 = up, 0 = none).
  const lastDeltaSign = useRef<-1 | 0 | 1>(0);
  // True after the finger reverses direction *while* native scroll has moved
  // the viewport in this gesture. Once true, viewport input can no longer
  // flip into sheet drag — user must lift and re-touch. Only relevant when
  // `enableHalfSnapScroll=true`; the default path captures immediately and
  // never enters native scroll, so this ref stays false there.
  const gestureLockedToScroll = useRef(false);

  // Rolling window of recent touch samples (y + timestamp). Used to compute
  // release velocity for projection-based snap resolution.
  const velocitySamples = useRef<Array<{ y: number; t: number }>>([]);
  // Peak excursion of `diffY` in either direction during the current drag.
  // `peakDiffYDown` = max positive (furthest down); `peakDiffYUp` = min
  // negative (furthest up). Whichever has larger magnitude is the user's
  // dominant gesture direction — this beats reading the final `diffY` alone
  // because finger lift-off can briefly flip the net direction near the
  // end of a slow drag and confuse the velocity-direction filter.
  const peakDiffYDown = useRef(0);
  const peakDiffYUp = useRef(0);

  useEffect(() => {
    setIsBottomSheet(isBottom);
  }, [isBottom, setIsBottomSheet]);

  const peekHeight = useRef(givenPeekHeight ?? 0);

  useEffect(() => {
    peekHeight.current = givenPeekHeight ?? 0;
  }, [givenPeekHeight]);

  const hasPeek = useCallback(() => peekHeight.current > 0, []);

  // Bottom-sheet snap kept in a ref so listeners always read the latest value
  // without re-binding.
  const snapRef = useRef<ModalBottomSheetSnap>(snap);

  const applyDragStyles = (
    container: HTMLDivElement,
    visualHeight: number,
    diffY: number,
    maxHeight: number,
  ) => {
    const fullMax = startedFullMaxHeight.current;
    // Resolve halfHeight against the snap-INDEPENDENT full max — otherwise a
    // drag starting at half/peek (where CSS pins the element height to
    // `default × 0.5`) would yield `halfHeight = quarterHeight` and the
    // height↔translate mode flip would land at the wrong boundary.
    const halfHeight = fullMax * BOTTOM_SHEET_HALF_RATIO;

    const dragStyle = computeDragStyle({
      isFlexible,
      startedSnap: startedSnap.current,
      startedVisualHeight: startedVisualHeight.current,
      startedMaxHeight: maxHeight,
      visualHeight,
      diffY,
      halfHeight,
    });

    if (dragStyle.mode === 'translate') {
      if (dragStyle.fixedHeight) {
        container.style.setProperty(
          '--modal-max-height',
          `${dragStyle.fixedHeight}px`,
        );
      }
      container.style.setProperty('--modal-translate', dragStyle.translate);
    } else {
      container.style.removeProperty('--modal-translate');
      container.style.setProperty(
        '--modal-max-height',
        `${dragStyle.height}px`,
      );
    }

    // Top-edge rubber-band override for non-flexible variants — they're
    // pinned in `translate` mode (peek-formula / full-anchor), so the inline
    // max-height set above caps at `fixedHeight` (= natural full size) and
    // doesn't reflect the overshoot. Push the rubber-banded `visualHeight`
    // straight into the CSS variable so the lifted height rule can grow the
    // element past its natural size, matching the flexible feel.
    if (!isFlexible && visualHeight > fullMax) {
      container.style.setProperty('--modal-max-height', `${visualHeight}px`);
    }

    const opacity = computeDimmerOpacityDuringDrag({
      startedSnap: startedSnap.current,
      visualHeight,
      startedMaxHeight: maxHeight,
      fullMaxHeight: fullMax,
      peekHeight: peekHeight.current,
      isFlexible,
      diffY,
      largestUndimmedSnap,
    });

    dimmerRef.current?.style.setProperty('opacity', opacity.toFixed(2));

    // Shadow visually separates the sheet from the background whenever the
    // dimmer can't do it — i.e. any snap that's undimmed. `hasPeek()` covers
    // the default `peek`-undimmed case; the second condition covers
    // `largestUndimmedSnap='half'` even when there's no peek configured.
    const canShowShadow =
      hasPeek() || (isFlexible && largestUndimmedSnap === 'half');
    if (opacity <= BOTTOM_SHEET_SHADOW_OPACITY_THRESHOLD && canShowShadow) {
      container.style.setProperty('box-shadow', BOTTOM_SHEET_SHADOW);
    } else {
      container.style.removeProperty('box-shadow');
    }
  };

  const { cancelSpring, settleToSnap, settlingTargetSnap } = useSpringSettle({
    dimmerRef,
    setSnap,
    snapRef,
    peekHeightRef: peekHeight,
    startedVisualHeightRef: startedVisualHeight,
    startedMaxHeightRef: startedMaxHeight,
    startedFullMaxHeightRef: startedFullMaxHeight,
    isFlexible,
    isOpen: context.open,
    applyDragStyles,
  });

  useSnapLifecycle({
    containerRef: context.containerRef,
    dimmerRef,
    snap,
    setSnap,
    snapRef,
    defaultSnap: givenDefaultSnap,
    peekHeightRef: peekHeight,
    hasPeek,
    isDraggingRef: isDragging,
    cancelSpring,
    isBottom,
    isFlexible,
    isEnabled,
    isOpen: context.open,
  });

  const collapseToPeekOrClose = useCallback(() => {
    const container = context.containerRef.current;

    if (!container) {
      return;
    }

    if (hasPeek()) {
      setSnap('peek');
    } else {
      container.style.removeProperty('transition');
      dimmerRef.current?.style.removeProperty('transition');
      context.onOpenChange(false);
    }
  }, [context, dimmerRef, hasPeek, setSnap]);

  /**
   * Decide whether viewport input should be captured for sheet dragging
   * instead of letting the viewport scroll natively.
   *
   * Default (`enableHalfSnapScroll=false`): viewport drag **always** drives
   * the sheet. Native scroll never competes — even when the body has
   * scrollable content, swiping it moves the sheet (↑ expands, ↓ collapses).
   * Sheet wins by policy.
   *
   * `enableHalfSnapScroll=true` + flexible + half + scrollable: defer to
   * native scroll until the boundary in the swipe direction is reached
   * (`scrollTop ≤ 0` for ↓, `scrollTop ≥ maxScrollTop − 1` for ↑), then
   * capture for the rest of the gesture. iOS Maps feel. The direction-
   * reversal lock in `onViewportTouchMove` blocks a "fake scroll then
   * reverse" pattern from sneaking past this boundary check.
   */
  const shouldCaptureViewportDrag = (deltaY: number): boolean => {
    if (!isEnabled) return false;

    // Use the in-flight settle target if the sheet is mid-spring — otherwise
    // a viewport ↑ during a `full → half` transition would be evaluated as
    // `full + ↑ + scrollable`, which routes to native scroll, even though
    // the sheet is physically settling toward half and the user expects ↑
    // to grab it back up.
    const current = settlingTargetSnap.current ?? snapRef.current;
    const viewport = context.innerContainer;
    // Live-boundary path policy:
    //   - `full` (flexible *or* non-flexible) + scrollable: **always** on.
    //     The body's natural job at full is to scroll; we only convert ↓
    //     into a collapse when scroll has bottomed out. The flag has no say
    //     here because the alternative ("always capture") would make
    //     scrollable content un-scroll-back-up-able.
    //   - `half` (flexible only — non-flexible has no `half`) + scrollable:
    //     gated on `enableHalfSnapScroll`. Default (off) captures
    //     unconditionally — half's policy is "sheet wins, scroll stays out
    //     of the way" per user requirement. Flag on → iOS Maps boundary
    //     auto-transfer.
    //   - `peek`: live boundary is not used; peek's directional guards
    //     handle it on release.
    const useLiveBoundary =
      startedAtScrollable.current &&
      (current === 'full' || (current === 'half' && enableHalfSnapScroll));

    // ↑ swipe — expand sheet. Only meaningful for flexible non-full states.
    // When the live-boundary path is active (scrollable body with the flag
    // policy enabled), ↑ is *never* captured: the body keeps absorbing the
    // gesture even past its scroll-bottom (browser overscroll bounce takes
    // over). Sheet expansion from half is grabber-only in that mode — per
    // user spec the auto-transfer only happens on ↓ at scroll-top.
    if (isFlexible && current !== 'full' && deltaY < 0) {
      if (useLiveBoundary && viewport) {
        return false;
      }
      return true;
    }

    // ↑ swipe at full + non-scrollable body: capture for the rubber-band
    // overshoot. Scrollable bodies at full keep their native scroll/overscroll
    // path — they have content to absorb the gesture and browsers already
    // bounce that content when it bottoms out, so layering a sheet rubber-band
    // on top would feel doubled.
    if (
      isFlexible &&
      current === 'full' &&
      deltaY < 0 &&
      !startedAtScrollable.current
    ) {
      return true;
    }

    // Non-flexible ↑ swipes (hug / fixed / fill, all with `handle` enabled via
    // `isEnabled`). Mirrors the flexible branches above: capture only when
    // the body is non-scrollable so we don't steal native scroll on content-
    // rich sheets. Covers both `peek → full` expansion and `full + rubber-
    // band` from a single check.
    if (!isFlexible && deltaY < 0 && !startedAtScrollable.current) {
      return true;
    }

    // ↓ swipe — collapse sheet.
    if (deltaY > 0) {
      if (useLiveBoundary && viewport) {
        // Mid-gesture auto-transfer requires the touch to have *started* at
        // the scroll boundary. From above the boundary it felt like scroll
        // and sheet drag were responding to the same monotonic pull — once
        // native scroll reached top, the sheet would immediately start
        // collapsing on the same gesture. Applies to both `full` (default
        // useLiveBoundary) and `half + enableHalfSnapScroll` (opt-in iOS
        // Maps feel) — in both cases the user must explicitly grab already-
        // pinned-to-top content for the transfer to fire.
        return viewport.scrollTop <= 0 && startedScrollTop.current <= 0;
      }
      return true;
    }

    return false;
  };

  const beginDrag = (container: HTMLDivElement, clientY: number) => {
    // Read the in-flight settle target *before* cancelSpring clears it.
    // When the user grabs mid-spring, the sheet is physically settling
    // toward `settlingTargetSnap` even though `snapRef` still holds the
    // pre-settle snap — using the target keeps the new drag's mode/
    // direction logic consistent with the sheet's actual destination.
    const inFlightTarget = settlingTargetSnap.current;
    // Interrupt any in-flight settle so the user can grab the sheet mid-spring.
    // `readVisualHeight` below reads whatever inline styles the spring last
    // applied, so the new drag picks up from the visible position.
    cancelSpring();
    isDragging.current = true;
    startedY.current = clientY;
    startedSnap.current = inFlightTarget ?? snapRef.current;

    // Capture the on-screen height *before* mutating any inline style so the
    // sheet doesn't visually jump when we switch from CSS-controlled height to
    // inline-controlled height. Any drag-time legacy transform is also cleared.
    // Resolve max-height once for the duration of the drag (it can't change
    // mid-drag without a viewport resize, which we don't support reactively).
    startedMaxHeight.current =
      parseFloat(getComputedStyle(container).height) || 0;
    // Snap-independent full max — see ref declaration for why this differs
    // from `startedMaxHeight` at non-`full` start snaps.
    //
    // - flexible: half/peek CSS pins the element height to `default × 0.5`,
    //   so `startedMaxHeight` would under-cap the spring's `to` and projection
    //   candidates. Derive the would-be full height from viewport + safe-area
    //   directly — same formula as the CSS `--modal-default-max-height`
    //   calc, but computed in JS so we don't depend on data-snap cascade or
    //   in-flight height transitions reporting interpolated values.
    // - non-flexible (hug/fixed/fill): the element has no per-snap height rule
    //   — peek just translates the full-height element down. `startedMaxHeight`
    //   is already the natural full height, so reuse it. Using the viewport
    //   value here instead would over-cap `releasedHeight` and make the spring
    //   target heights the sheet's CSS doesn't actually reach (e.g., a `hug`
    //   sheet with 600px content would target 1719px → visible jump on
    //   settle).
    startedFullMaxHeight.current = isFlexible
      ? computeFullMaxHeight()
      : startedMaxHeight.current;

    container.style.setProperty('transition', 'none');
    container.style.setProperty(
      '--modal-max-height',
      `${startedMaxHeight.current}px`,
    );
    dimmerRef.current?.style.setProperty('transition', 'none');

    if (startedSnap.current !== 'peek') {
      container.style.removeProperty('--modal-translate');
    }

    startedVisualHeight.current = readVisualHeight(container);
    // Seed the velocity window with the drag-start sample so a release that
    // arrives before any touchmove still has a defined dt (= 0 → velocity 0).
    velocitySamples.current = [{ y: clientY, t: performance.now() }];
    peakDiffYDown.current = 0;
    peakDiffYUp.current = 0;
  };

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const container = context.containerRef.current;

    if (!isEnabled || isDragging.current || !container) {
      return;
    }

    // In iOS, target may be undefined when long-pressing, so use try-catch
    try {
      const target = e.target as HTMLElement;
      const grabberTarget = target.closest(
        '[data-role="modal-container-grabber"]',
      );
      const peekTarget = isMouseDownOnPeek(
        e,
        peekHeight.current,
        snapRef.current,
      );

      if (grabberTarget || peekTarget) {
        const clientY = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;
        beginDrag(container, clientY);
      }
    } catch (err) {
      isDragging.current = false;
    }
  };

  // Touch handler bound to the viewport (ScrollArea). Decides between native
  // scroll and sheet drag based on current snap & scrollTop.
  const onViewportTouchStart = (e: TouchEvent) => {
    const container = context.containerRef.current;
    if (!isEnabled || isDragging.current || !container) return;

    const touch = e.touches[0];
    if (!touch) return;

    // Defer mode decision to the first touchmove because touchstart has no deltaY yet.
    startedY.current = touch.clientY;
    startedVisualHeight.current = readVisualHeight(container);
    startedMaxHeight.current =
      parseFloat(getComputedStyle(container).height) || 0;
    // Seed the velocity window from touchstart so capture decisions in the
    // very next touchmove can already see a valid sample timestamp.
    velocitySamples.current = [{ y: touch.clientY, t: performance.now() }];

    // Snapshot scrollable-ness + initial scrollTop. The former gates the
    // flag's live-boundary path; the latter feeds the direction-reversal lock.
    const viewport = context.innerContainer;
    if (viewport) {
      startedAtScrollable.current =
        viewport.scrollHeight > viewport.clientHeight;
      startedScrollTop.current = viewport.scrollTop;
    } else {
      startedAtScrollable.current = false;
      startedScrollTop.current = 0;
    }
    lastClientY.current = touch.clientY;
    lastDeltaSign.current = 0;
    gestureHasScrolled.current = false;
    gestureLockedToScroll.current = false;
  };

  const onViewportTouchMove = (e: TouchEvent) => {
    const container = context.containerRef.current;
    if (!isEnabled || !container) return;

    const touch = e.touches[0];
    if (!touch) return;

    // Defer to native text-selection only when the touch lands inside the
    // active selection's bounds — i.e. the gesture is *for* the selection
    // (extension, handle drag, drag-and-drop). A stale selection sitting
    // elsewhere on the page must not block normal sheet drag.
    if (isTouchInsideTextSelection(touch.clientX, touch.clientY)) return;

    const deltaY = touch.clientY - startedY.current;

    if (!isDragging.current) {
      const viewport = context.innerContainer;
      // Sticky: once native scroll has consumed any movement in this gesture,
      // the gesture is "tainted" — even if scrollTop later returns to its
      // starting value, we still treat this as a scrolling gesture for the
      // purposes of the direction-reversal lock below.
      if (
        viewport &&
        !gestureHasScrolled.current &&
        viewport.scrollTop !== startedScrollTop.current
      ) {
        gestureHasScrolled.current = true;
      }

      // Direction-reversal lock. Uses the *instantaneous* move direction
      // (delta since the previous touchmove), not the cumulative deltaY,
      // because cumulative direction only flips after the finger crosses
      // back past `startedY` — by that point the user has already
      // overscrolled past the boundary and the live-scrollTop check would
      // capture before the lock could fire. The instantaneous sign catches
      // the reversal the moment the finger changes course.
      const instantDelta = touch.clientY - lastClientY.current;
      const sign = instantDelta > 0 ? 1 : instantDelta < 0 ? -1 : 0;
      lastClientY.current = touch.clientY;
      if (
        sign !== 0 &&
        lastDeltaSign.current !== 0 &&
        sign !== lastDeltaSign.current &&
        gestureHasScrolled.current
      ) {
        gestureLockedToScroll.current = true;
      }
      if (sign !== 0) lastDeltaSign.current = sign;
      if (gestureLockedToScroll.current) return;

      if (shouldCaptureViewportDrag(deltaY)) {
        // Rebase the drag origin at the current touch position so the sheet
        // starts from zero diff at capture, instead of inheriting the
        // cumulative deltaY that native scroll already consumed. Without
        // this, a 30px-scroll-then-cross-boundary gesture would snap the
        // sheet 30px on the same frame the drag begins.
        beginDrag(container, touch.clientY);
      } else {
        return;
      }
    }

    e.preventDefault();
  };

  const dismissAfterDrag = useCallback(() => {
    const container = context.containerRef.current;
    // remove transition none inline style
    container?.style.removeProperty('transition');
    dimmerRef.current?.style.removeProperty('transition');
    context.onOpenChange(false);
  }, [context, dimmerRef]);

  /**
   * Release velocity (px/ms, positive = downward) computed as a recency-
   * weighted mean of per-segment velocities. Each segment between consecutive
   * samples contributes its instantaneous velocity, weighted by
   * `0.5 ^ (age_ms / HALF_LIFE_MS)` — so a late acceleration ("fling")
   * dominates over a preceding slow drag, but single-frame noise can't swing
   * the result on its own.
   *
   * Half-life ~50ms means the most recent ~3 frames effectively decide the
   * answer; anything older than ~100ms is < 25% weighted. Tuned alongside
   * `BOTTOM_SHEET_PROJECTION_MS` so a normal fling reads close to the user's
   * actual release speed rather than the time-averaged value through the
   * gesture.
   */
  const computeReleaseVelocity = (): number => {
    const samples = velocitySamples.current;
    if (samples.length < 2) return 0;

    const HALF_LIFE_MS = 50;
    const tLast = samples[samples.length - 1]!.t;
    let sumWV = 0;
    let sumW = 0;
    for (let i = 1; i < samples.length; i++) {
      const dt = samples[i]!.t - samples[i - 1]!.t;
      if (dt <= 0) continue;
      const segV = (samples[i]!.y - samples[i - 1]!.y) / dt;
      const age = tLast - samples[i]!.t;
      const w = Math.pow(0.5, age / HALF_LIFE_MS);
      sumWV += segV * w;
      sumW += w;
    }
    return sumW > 0 ? sumWV / sumW : 0;
  };

  const resolveReleaseSnap = (
    releasedHeight: number,
    velocityY: number,
    maxHeight: number,
  ) => {
    const halfHeight = maxHeight * BOTTOM_SHEET_HALF_RATIO;
    if (isFlexible) {
      return resolveFlexibleReleaseSnap({
        startedSnap: startedSnap.current,
        startedVisualHeight: startedVisualHeight.current,
        startedMaxHeight: maxHeight,
        releasedHeight,
        velocityY,
        halfHeight,
        peekHeight: peekHeight.current,
        hasPeek: hasPeek(),
      });
    }
    return resolveNonFlexibleReleaseSnap({
      startedSnap: startedSnap.current,
      startedVisualHeight: startedVisualHeight.current,
      startedMaxHeight: maxHeight,
      releasedHeight,
      velocityY,
      peekHeight: peekHeight.current,
      hasPeek: hasPeek(),
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const container = context.containerRef.current;

      if (!isDragging.current || !isEnabled || !container) {
        return;
      }

      // Pause the drag while the current pointer is over the active text
      // selection (extending the selection, dragging a handle, drag-and-
      // drop). Skipping `preventDefault` lets the browser's native
      // selection handling run; skipping the style update freezes the
      // sheet at its last position. When the user releases, `onMouseUp`
      // settles from that frozen position. A stale selection that's not
      // under the pointer does not pause anything.
      const clientX = isTouchEvent(e) ? e.touches[0]!.clientX : e.clientX;
      const clientYCheck = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;
      if (isTouchInsideTextSelection(clientX, clientYCheck)) return;

      e.preventDefault();

      const clientY = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;
      const maxHeight = startedMaxHeight.current;
      const diffY = clientY - startedY.current;

      // Record a velocity sample and trim anything older than the window.
      const now = performance.now();
      velocitySamples.current.push({ y: clientY, t: now });
      const cutoff = now - BOTTOM_SHEET_VELOCITY_WINDOW_MS;
      while (
        velocitySamples.current.length > 1 &&
        velocitySamples.current[0]!.t < cutoff
      ) {
        velocitySamples.current.shift();
      }

      // Track peak excursion in each direction so the release-time lift-off
      // filter can use it as the gesture's intent direction.
      if (diffY > peakDiffYDown.current) peakDiffYDown.current = diffY;
      if (diffY < peakDiffYUp.current) peakDiffYUp.current = diffY;

      // Visual height = how many px the sheet visibly occupies on screen.
      // diffY > 0 (down): sheet shrinks; diffY < 0 (up): sheet grows.
      let visualHeight = Math.max(0, startedVisualHeight.current - diffY);

      // Top-edge rubber-band — applied universally. `applyDragStyles` will
      // push the rubber-banded `visualHeight` into `--modal-max-height`
      // (and for non-flexible variants override the translate-mode
      // `fixedHeight`) so the lifted CSS `height` rule grows the element
      // past its natural full size.
      if (visualHeight > startedFullMaxHeight.current) {
        visualHeight =
          startedFullMaxHeight.current +
          rubberBand(visualHeight - startedFullMaxHeight.current);
      }

      applyDragStyles(container, visualHeight, diffY, maxHeight);
    };

    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      const container = context.containerRef.current;

      if (!isEnabled || !isDragging.current || !container) {
        return;
      }

      isDragging.current = false;
      e.stopPropagation();

      const clientY = isTouchEvent(e)
        ? e.changedTouches[0]!.clientY
        : e.clientY;

      const diffY = clientY - startedY.current;
      // Use the snap-independent full max as the upper clamp for `releasedHeight`.
      // `startedMaxHeight` would cap a half-start upward drag at halfHeight even
      // though the sheet visually grew past it, biasing projection back toward
      // half and making the spring's `to` under-shoot the user's actual gesture.
      const fullMaxHeight = startedFullMaxHeight.current;

      // Released visual height. Larger = sheet is taller / closer to full.
      // No top clamp here — JS rubber-band below bounds overshoot, and the
      // spring needs `from` to match the actual visible position so it
      // smoothly retracts the elastic overshoot back to the snap target.
      let releasedHeight = Math.max(0, startedVisualHeight.current - diffY);
      // Mirror of the onMouseMove rubber-band so the spring's `from` matches
      // the rubber-banded visible position. Projection-based snap still
      // resolves to `full` because the bounded overshoot is far smaller
      // than the inter-snap distance. For non-flexible the same `from` value
      // gets split into a height + overshoot pair inside `applyDragStyles`,
      // so the spring's per-frame retraction shrinks the overshoot CSS
      // variable smoothly.
      if (releasedHeight > fullMaxHeight) {
        releasedHeight =
          fullMaxHeight + rubberBand(releasedHeight - fullMaxHeight);
      }

      // Anti lift-off filter — when the finger leaves the screen at the end
      // of a slow drag, its natural arc registers as a sharp reverse-direction
      // sample in the recency-weighted velocity window. Without this, a
      // gentle ↓ from half can resolve to `full` because the touchend
      // "flick-up" projects the sheet upward.
      //
      // We compare velocity direction to the *peak* gesture direction
      // (largest excursion in either axis), not to the final `diffY`. Final
      // `diffY` flips sign when lift-off is large enough to push the finger
      // back past `startedY`, which would defeat the filter for short
      // drags. Peak is sticky — lift-off can shrink it back toward zero but
      // can't make it cross zero.
      const rawVelocityY = computeReleaseVelocity();
      const downPeak = peakDiffYDown.current;
      const upPeak = -peakDiffYUp.current;
      const dominantSign = downPeak > upPeak ? 1 : upPeak > downPeak ? -1 : 0;
      const velocitySign = rawVelocityY > 0 ? 1 : rawVelocityY < 0 ? -1 : 0;
      const velocityY =
        dominantSign !== 0 &&
        velocitySign !== 0 &&
        dominantSign !== velocitySign
          ? 0
          : rawVelocityY;

      // Pass `fullMaxHeight` (not `maxHeight`) so projection candidates resolve
      // against the true full / half heights even when the drag started at half.
      const resolution = resolveReleaseSnap(
        releasedHeight,
        velocityY,
        fullMaxHeight,
      );

      if (resolution.type === 'close') {
        dismissAfterDrag();
        return;
      }

      settleToSnap(container, resolution.snap, releasedHeight, velocityY);
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
    // The handlers close over refs and stable callbacks only — re-binding on
    // every render would churn through window listeners for no behavioral
    // change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, isEnabled, isFlexible, settleToSnap, dismissAfterDrag]);

  // Bind viewport touch listeners separately so they can preventDefault
  // selectively. Per-gesture state (`lastDeltaSign`, `gestureLockedToScroll`,
  // boundary snapshots) is reset on every touchstart, so no touchend hook is
  // needed.
  useEffect(() => {
    const viewport = context.innerContainer;
    if (!viewport || !isEnabled) return;

    viewport.addEventListener('touchstart', onViewportTouchStart, {
      passive: true,
    });
    viewport.addEventListener('touchmove', onViewportTouchMove, {
      passive: false,
    });

    return () => {
      viewport.removeEventListener('touchstart', onViewportTouchStart);
      viewport.removeEventListener('touchmove', onViewportTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.innerContainer, isFlexible, isEnabled]);

  return {
    isBottomSheetWithHandle: isEnabled,
    collapseToPeekOrClose,
    onMouseDown,
    onTouchStart: onMouseDown,
  };
};
