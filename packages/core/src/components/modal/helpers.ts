import {
  BOTTOM_SHEET_HALF_RATIO,
  BOTTOM_SHEET_MIN_PROJECTION_DELTA,
  BOTTOM_SHEET_PROJECTION_MS,
  BOTTOM_SHEET_RUBBER_BAND_MAX_PX,
  BOTTOM_SHEET_TOP_INSET_PX,
} from './constants';

import type { ModalBottomSheetSnap } from './types';

export const isTouchEvent = (
  value: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
): value is TouchEvent | React.TouchEvent => value.type.includes('touch');

/**
 * Whether the given touch point lands inside (or just outside) the active
 * text-selection range. Used by the drag handlers to defer to native
 * selection only when the gesture is *for* the selection — i.e. the user
 * is dragging from inside the selected text (extension, handle drag,
 * drag-and-drop). A merely-still-on-screen stale selection elsewhere in
 * the document must not block sheet drag.
 *
 * Includes a small tolerance so iOS selection handles (which sit a few px
 * outside the range bounds) still register as "inside".
 */
export const isTouchInsideTextSelection = (
  clientX: number,
  clientY: number,
): boolean => {
  if (typeof window === 'undefined') return false;
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return false;
  if (selection.toString().length === 0) return false;
  if (selection.rangeCount === 0) return false;
  const rect = selection.getRangeAt(0).getBoundingClientRect();
  const TOLERANCE = 20;
  return (
    clientX >= rect.left - TOLERANCE &&
    clientX <= rect.right + TOLERANCE &&
    clientY >= rect.top - TOLERANCE &&
    clientY <= rect.bottom + TOLERANCE
  );
};

export const calcOpacityRatio = (
  input: number,
  minPosition: number,
  maxPosition: number,
) => {
  if (input <= minPosition) return 1;
  if (input >= maxPosition) return 0;

  return 1 - (input - minPosition) / (maxPosition - minPosition);
};

/**
 * Whether a press landed on the visible peek strip of the bottom sheet.
 *
 * Only meaningful in `snap='peek'`. The wrapper element this is bound to is
 * `translateY(calc(100% - peekHeight))` when peeked, so the wrapper's
 * `[top, top + peekHeight]` band coincides with the strip the user actually
 * sees at the bottom of the viewport — that's the affordance to grab and
 * pull up.
 *
 * For `full`/`half`, the same `[top, top + peekHeight]` band would land on
 * the grabber/navigation area at the top of the sheet, which is already
 * draggable via the grabber and must not steal clicks from headers. We
 * gate on `snap` to keep peek touch handling exclusive to the peeked state.
 */
export const isMouseDownOnPeek = (
  e: React.MouseEvent | React.TouchEvent,
  peekHeight: number,
  snap: ModalBottomSheetSnap,
) => {
  if (snap !== 'peek' || peekHeight <= 0) return false;

  const { top } = e.currentTarget.getBoundingClientRect();

  const clientY = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;

  return clientY >= top && clientY <= top + peekHeight;
};

type ApplySnapOptions = {
  peekHeight: number;
};

/**
 * Apply the visual representation of `snap` to the sheet.
 *
 * On initial mount and any non-drag path, we keep inline styles to a minimum
 * and defer to the CSS rules in `style.ts` (`data-snap='full' | 'half' |
 * 'peek'`). Inline styles exist only to override the visuals during the
 * drag cycle.
 *
 * - `peek`: keeps the sheet at its natural (full) height and slides the whole
 *   thing down via `--wds-modal-translate: calc(100% - peekHeight)`, leaving
 *   exactly `peekHeight` visible at the bottom. Holding height steady avoids
 *   reflowing the content (and resetting scroll position) every time peek
 *   toggles.
 * - `half` / `full`: clearing every inline override hands height, opacity,
 *   box-shadow, and translate transitions back to the stylesheet.
 */
export const applySnap = (
  container: HTMLDivElement,
  dimmer: HTMLDivElement | null,
  snap: ModalBottomSheetSnap,
  { peekHeight }: ApplySnapOptions,
) => {
  // Caller must ensure `data-snap` reflects the target snap **before** this
  // runs (drag release path uses `flushSync(setSnap)` for that). Otherwise the
  // previous snap's CSS rule would briefly resolve when we strip the inline
  // overrides, producing a visible flicker / double transition.
  //
  // Property-clear order matters: we strip the inline overrides FIRST, while
  // any inline `transition: none` from the drag is still in effect, so the
  // changes apply instantly. Only after that do we remove `transition: none`,
  // restoring the CSS transition for the next snap change. Inverting this
  // order would let the CSS transition catch the handoff frame and animate
  // the drag→CSS jump even when the values are visually identical.
  container.style.removeProperty('box-shadow');
  container.style.removeProperty('--wds-modal-max-height');

  dimmer?.style.removeProperty('opacity');

  if (snap === 'peek') {
    container.style.setProperty(
      '--wds-modal-translate',
      `calc(100% - ${peekHeight}px)`,
    );
  } else {
    container.style.removeProperty('--wds-modal-translate');
  }

  container.style.removeProperty('transition');
  dimmer?.style.removeProperty('transition');
};

/**
 * Compute the dimmer opacity from the sheet's current visual height.
 *
 * - `flexible`: opacity stays at 1 while `height ≥ maxHeight / 2`, then fades to
 *   0 between half and the close/peek height.
 * - non-flexible (`hug`/`fill`): linear fade from 1 at `maxHeight` to 0 at the
 *   close/peek height.
 *
 * `floor` is the height at which dimmer reaches 0 — `peekHeight` if peek is
 * configured, else `0` (fully closed).
 *
 * When `largestUndimmedSnap='half'` (flexible only), the dimmer treats
 * `halfHeight` itself as opacity 0 and fades only between `halfHeight` and
 * `maxHeight` — the entire `half↔peek` region stays undimmed.
 */
export const computeDimmerOpacity = ({
  height,
  maxHeight,
  peekHeight,
  isFlexible,
  largestUndimmedSnap = 'peek',
}: {
  height: number;
  maxHeight: number;
  peekHeight: number;
  isFlexible: boolean;
  largestUndimmedSnap?: 'peek' | 'half';
}): number => {
  const floor = peekHeight > 0 ? peekHeight : 0;

  if (isFlexible) {
    const halfHeight = maxHeight * BOTTOM_SHEET_HALF_RATIO;
    if (largestUndimmedSnap === 'half') {
      if (height >= maxHeight) return 1;
      if (height <= halfHeight) return 0;
      const span = Math.max(1, maxHeight - halfHeight);
      return Math.max(0, Math.min(1, (height - halfHeight) / span));
    }
    if (height >= halfHeight) return 1;
    const span = Math.max(1, halfHeight - floor);
    return Math.max(0, Math.min(1, (height - floor) / span));
  }

  const span = Math.max(1, maxHeight - floor);
  return Math.max(0, Math.min(1, (height - floor) / span));
};

/**
 * Measure the sheet's current visual height — i.e. how tall it actually
 * appears to the user. `getBoundingClientRect().height` is unaffected by
 * `translateY`, so we infer the visible portion from the sheet's `top`
 * relative to the viewport.
 */
export const readVisualHeight = (container: HTMLDivElement): number => {
  const rect = container.getBoundingClientRect();
  return Math.max(0, window.innerHeight - rect.top);
};

/**
 * Asymptotic rubber-band response — maps an unbounded `overshoot` (px past a
 * boundary) into a bounded visual displacement that approaches `max` but
 * never reaches it. Mirrors the iOS scroll/sheet feel: the further the user
 * pulls past the boundary, the more visual resistance per pixel of finger
 * travel, with the visible displacement asymptotic to `max`.
 *
 *   f(x) = (x · max) / (x + max)
 *
 * Examples (max = 40):
 *   overshoot 0   → 0
 *   overshoot 40  → 20
 *   overshoot 200 → 33
 *   overshoot ∞   → 40
 */
export const rubberBand = (
  overshoot: number,
  max: number = BOTTOM_SHEET_RUBBER_BAND_MAX_PX,
): number => {
  if (overshoot <= 0) return 0;
  return (overshoot * max) / (overshoot + max);
};

/**
 * Resolve the sheet's **snap-independent** full max-height — i.e. what the
 * sheet's height would be at `data-snap='full'` regardless of the current snap.
 *
 * Mirrors the CSS `--wds-modal-default-max-height` calc directly:
 *   `100% (≈ viewport) - safe-area-inset-top - 40px`
 *
 * Computing this in JS instead of probing the DOM avoids the cascade /
 * height-transition interpolation problems that made a probe based on
 * `getComputedStyle().height` return the half-state height at half snap.
 *
 * Safe-area inset is read once per call via a hidden probe element since
 * `env()` is only available inside CSS. Cheap enough for a drag-start hook
 * (one layout pass on a detached-then-attached zero-size node).
 *
 * Keep the `- 40px` term in sync with `BOTTOM_SHEET_TOP_INSET_PX` and the
 * matching `style.ts` calc.
 */
export const computeFullMaxHeight = (): number => {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top,0px);';
  document.body.appendChild(probe);
  const safeAreaTop = parseFloat(getComputedStyle(probe).paddingTop) || 0;
  probe.remove();
  return Math.max(
    0,
    window.innerHeight - safeAreaTop - BOTTOM_SHEET_TOP_INSET_PX,
  );
};

/**
 * Pick which visual technique drives the in-flight drag.
 *
 * - `translate`: only `--wds-modal-translate` is updated; the sheet slides
 *   downward as a whole while its `height` stays fixed.
 * - `height`: inline `height` is updated, growing or shrinking the sheet
 *   from its top edge.
 *
 * See BEHAVIOR.md §7 for the full mode-selection table.
 */
export const resolveDragMode = ({
  isFlexible,
  startedSnap,
  visualHeight,
  diffY,
  halfHeight,
}: {
  isFlexible: boolean;
  startedSnap: ModalBottomSheetSnap;
  visualHeight: number;
  diffY: number;
  halfHeight: number;
}): 'translate' | 'height' => {
  if (!isFlexible) {
    // hug / fixed / fill: translate so the sheet only follows the finger
    // downward. Upward input gets clamped at the call site so translate
    // stays at 0, effectively ignoring upward motion.
    return 'translate';
  }

  if (startedSnap === 'full' && diffY > 0) {
    // full + down: shrink with `height` until we cross half, then switch to
    // translate so the rest of the gesture matches the peek/close motion.
    return visualHeight < halfHeight ? 'translate' : 'height';
  }

  if (startedSnap === 'half' && diffY > 0) {
    // half + down: straight to translate (no intermediate height shrinkage).
    return 'translate';
  }

  if (startedSnap === 'peek') {
    // peek-start: mirror of full + down. The peek-state element already has
    // CSS height = halfHeight (just translated down), so while the finger
    // hasn't pulled past that line we slide the sheet up via translate; once
    // we cross half we grow the element with `height` to reach full.
    //
    // Covers diffY=0 (tap with no motion) and diffY>0 (push peek further
    // down) too — both stay in translate mode so the peek-formula re-applies
    // the same `calc(100% - peekHeight)` translate that `applySnap` set when
    // the sheet entered peek. Falling through to `height` here would strip
    // the inline translate at spring rest and trigger a CSS height
    // transition back to the peek default on release.
    return visualHeight < halfHeight ? 'translate' : 'height';
  }

  // Everything else (half ↑, full ↑) is an upward expansion — use height so
  // the sheet grows from its top edge.
  return 'height';
};

type ReleaseResolution =
  | { type: 'snap'; snap: ModalBottomSheetSnap }
  | { type: 'close' };

type Candidate = {
  result: ReleaseResolution;
  height: number;
};

const pickNearest = (
  candidates: Array<Candidate>,
  projectedHeight: number,
): Candidate => {
  let best = candidates[0]!;
  let bestDist = Math.abs(best.height - projectedHeight);
  for (let i = 1; i < candidates.length; i++) {
    const dist = Math.abs(candidates[i]!.height - projectedHeight);
    if (dist < bestDist) {
      best = candidates[i]!;
      bestDist = dist;
    }
  }
  return best;
};

/**
 * Forward-project the release position by `velocityY * PROJECTION_MS`.
 *
 * `velocityY` is positive when the finger is moving **down** (matching
 * `diffY`'s sign convention). A downward fling shrinks `projectedHeight`;
 * an upward fling grows it. With no velocity, projection equals the
 * release-time visual height — the resolver degrades to "snap nearest to
 * where the finger lifted".
 */
const projectReleaseHeight = (releasedHeight: number, velocityY: number) =>
  releasedHeight - velocityY * BOTTOM_SHEET_PROJECTION_MS;

/**
 * Decide which snap (or close) to settle on when a `flexible` sheet drag
 * ends. See BEHAVIOR.md §7-1.
 *
 * The release position is projected forward by `velocity * PROJECTION_MS`,
 * then the candidate snap nearest that projected position wins. This makes
 * fast flicks "throw" the sheet to a farther snap with minimal travel and
 * slow drags settle close to where the finger lifted.
 *
 * Directional guard: `peek` + downward gesture never closes — peek collapses
 * only via explicit dismiss paths.
 */
export const resolveFlexibleReleaseSnap = ({
  startedSnap,
  startedVisualHeight,
  startedMaxHeight,
  releasedHeight,
  velocityY,
  halfHeight,
  peekHeight,
  hasPeek,
}: {
  startedSnap: ModalBottomSheetSnap;
  startedVisualHeight: number;
  startedMaxHeight: number;
  releasedHeight: number;
  velocityY: number;
  halfHeight: number;
  peekHeight: number;
  hasPeek: boolean;
}): ReleaseResolution => {
  const projectedHeight = projectReleaseHeight(releasedHeight, velocityY);

  // Jitter guard: a tap or barely-moved drag stays on the starting snap.
  if (
    Math.abs(projectedHeight - startedVisualHeight) <
    BOTTOM_SHEET_MIN_PROJECTION_DELTA
  ) {
    return { type: 'snap', snap: startedSnap };
  }

  // peek + downward projection → keep peek (peek doesn't close from below).
  if (startedSnap === 'peek' && projectedHeight <= peekHeight) {
    return { type: 'snap', snap: 'peek' };
  }

  const candidates: Array<Candidate> = [
    { result: { type: 'snap', snap: 'half' }, height: halfHeight },
    { result: { type: 'snap', snap: 'full' }, height: startedMaxHeight },
  ];
  if (hasPeek) {
    candidates.unshift({
      result: { type: 'snap', snap: 'peek' },
      height: peekHeight,
    });
  } else {
    candidates.unshift({ result: { type: 'close' }, height: 0 });
  }

  return pickNearest(candidates, projectedHeight).result;
};

/**
 * Decide which snap (or close) to settle on when a non-flexible
 * (`hug`/`fixed`/`fill`) sheet with `handle` ends a drag.
 *
 * Same projection model as flexible, but with only `peek`/`close` and `full`
 * as candidates (no `half`).
 *
 * Directional guards:
 * - `full` + upward projection → keep full (sheet doesn't grow upward).
 * - `peek` + downward projection → keep peek.
 */
export const resolveNonFlexibleReleaseSnap = ({
  startedSnap,
  startedVisualHeight,
  startedMaxHeight,
  releasedHeight,
  velocityY,
  peekHeight,
  hasPeek,
}: {
  startedSnap: ModalBottomSheetSnap;
  startedVisualHeight: number;
  startedMaxHeight: number;
  releasedHeight: number;
  velocityY: number;
  peekHeight: number;
  hasPeek: boolean;
}): ReleaseResolution => {
  const projectedHeight = projectReleaseHeight(releasedHeight, velocityY);

  if (
    Math.abs(projectedHeight - startedVisualHeight) <
    BOTTOM_SHEET_MIN_PROJECTION_DELTA
  ) {
    return { type: 'snap', snap: startedSnap };
  }

  if (startedSnap === 'full' && projectedHeight >= startedMaxHeight) {
    return { type: 'snap', snap: 'full' };
  }

  if (startedSnap === 'peek' && projectedHeight <= peekHeight) {
    return { type: 'snap', snap: 'peek' };
  }

  const candidates: Array<Candidate> = [
    { result: { type: 'snap', snap: 'full' }, height: startedMaxHeight },
  ];
  if (hasPeek) {
    candidates.unshift({
      result: { type: 'snap', snap: 'peek' },
      height: peekHeight,
    });
  } else {
    candidates.unshift({ result: { type: 'close' }, height: 0 });
  }

  return pickNearest(candidates, projectedHeight).result;
};

/**
 * Compute the inline style values needed to render the in-flight drag.
 *
 * Returns one of:
 * - `mode='height'`: set `--wds-modal-max-height` to `height`, clear translate.
 * - `mode='translate'`: set `--wds-modal-translate` to `translate` (and
 *   optionally fix `--wds-modal-max-height` so the sheet doesn't reflow as it
 *   slides). `peek` start derives translate from the live `visualHeight` so
 *   re-grabs mid-settle pick up at the actual current visible position.
 */
export const computeDragStyle = ({
  isFlexible,
  startedSnap,
  startedVisualHeight,
  startedMaxHeight,
  visualHeight,
  diffY,
  halfHeight,
}: {
  isFlexible: boolean;
  startedSnap: ModalBottomSheetSnap;
  startedVisualHeight: number;
  startedMaxHeight: number;
  visualHeight: number;
  diffY: number;
  halfHeight: number;
}):
  | { mode: 'height'; height: number }
  | { mode: 'translate'; translate: string; fixedHeight: number } => {
  const mode = resolveDragMode({
    isFlexible,
    startedSnap,
    visualHeight,
    diffY,
    halfHeight,
  });

  if (mode === 'height') {
    return { mode, height: visualHeight };
  }

  // Anchor `height` at the natural height at the moment we entered
  // translate mode:
  //   - flexible + full → halfHeight (the boundary where the mode flips)
  //   - everything else → startedVisualHeight
  let fixedHeight =
    isFlexible && startedSnap === 'full' ? halfHeight : startedVisualHeight;

  let translate = `${Math.max(0, fixedHeight - visualHeight)}px`;

  if (startedSnap === 'peek') {
    // Express the translate via the current `visualHeight` rather than
    // `diffY + peekHeight`. They're mathematically equivalent when the
    // gesture starts at the peek snap, but if the user re-grabs mid-
    // settle the spring rebases `startedVisualHeight` to the live visible
    // position and `diffY` restarts at 0 — in which case a peekHeight-
    // anchored formula snaps the sheet back to peek on the first frame.
    // Using `visualHeight` (= `startedVisualHeight - diffY`) keeps the
    // sheet anchored at the actual current visible position regardless of
    // where the previous gesture left off.
    translate = `max(calc(100% - ${visualHeight}px), 0px)`;
    // flexible 이면 max-height 변경 없이 CSS 기본값 사용.
    fixedHeight = isFlexible ? 0 : startedMaxHeight;
  }

  return { mode, translate, fixedHeight };
};

/**
 * Dimmer opacity during an in-flight drag. For `peek`-originated drags the
 * opacity follows the finger position (`calcOpacityRatio` between the min/max
 * vertical positions); otherwise it falls back to the height-based formula.
 *
 * `fullMaxHeight` is the snap-INDEPENDENT full max — what the sheet's height
 * would be at `data-snap='full'`. The height-based fade formula resolves
 * `halfHeight` against this value so a drag starting at `half` (where the
 * computed height is halfHeight, not fullMax) still picks the correct fade
 * band. Without this fix the formula would compute `halfHeight = halfHeight *
 * 0.5` and the dimmer would stay visible across the entire half↔peek travel.
 *
 * When `largestUndimmedSnap='half'` (flexible only), the peek-start fade band
 * shifts upward — the dimmer stays at 0 until the sheet grows past `halfHeight`
 * and only fades in between `halfHeight` and `fullMaxHeight`.
 */
export const computeDimmerOpacityDuringDrag = ({
  startedSnap,
  visualHeight,
  startedMaxHeight,
  fullMaxHeight,
  peekHeight,
  isFlexible,
  diffY,
  largestUndimmedSnap = 'peek',
}: {
  startedSnap: ModalBottomSheetSnap;
  visualHeight: number;
  startedMaxHeight: number;
  fullMaxHeight: number;
  peekHeight: number;
  isFlexible: boolean;
  diffY: number;
  largestUndimmedSnap?: 'peek' | 'half';
}): number => {
  if (startedSnap === 'peek') {
    const undimmedAtHalf = isFlexible && largestUndimmedSnap === 'half';
    if (undimmedAtHalf) {
      const halfHeight = fullMaxHeight * BOTTOM_SHEET_HALF_RATIO;
      // Fade band [halfHeight, fullMaxHeight]: dimmer stays 0 across the entire
      // peek↔half region and only fades in as the sheet grows past half.
      const minPosition = window.innerHeight - fullMaxHeight;
      const maxPosition = window.innerHeight - halfHeight;
      return calcOpacityRatio(
        window.innerHeight - peekHeight + diffY,
        minPosition,
        maxPosition,
      );
    }
    // Default behavior — use `startedMaxHeight` for the upper bound so the
    // dimmer reaches opacity 1 at the same on-screen position the at-rest CSS
    // does for that variant (halfHeight for flexible peek, fullMax otherwise).
    const minPosition = window.innerHeight - startedMaxHeight;
    const maxPosition = window.innerHeight - peekHeight;
    return calcOpacityRatio(
      window.innerHeight - peekHeight + diffY,
      minPosition,
      maxPosition,
    );
  }

  return computeDimmerOpacity({
    height: visualHeight,
    maxHeight: fullMaxHeight,
    peekHeight,
    isFlexible,
    largestUndimmedSnap,
  });
};
