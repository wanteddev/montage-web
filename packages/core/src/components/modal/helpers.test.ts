import { describe, expect, it } from 'vitest';

import {
  calcOpacityRatio,
  computeDimmerOpacity,
  computeDimmerOpacityDuringDrag,
  computeDragStyle,
  isMouseDownOnPeek,
  resolveDragMode,
  resolveFlexibleReleaseSnap,
  resolveNonFlexibleReleaseSnap,
} from './helpers';

// Canonical setup mirroring BEHAVIOR.md §7-1 (maxHeight=600, halfHeight=300,
// peekHeight=80) with the post-tuning BOTTOM_SHEET_PROJECTION_MS=250.
const MAX = 600;
const HALF = 300;
const PEEK = 80;

describe('resolveFlexibleReleaseSnap', () => {
  const base = {
    startedMaxHeight: MAX,
    halfHeight: HALF,
    peekHeight: PEEK,
    hasPeek: true,
  };

  it('keeps starting snap on tap / micro-jitter (projection delta < 5px)', () => {
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'half',
        startedVisualHeight: 300,
        releasedHeight: 302,
        velocityY: 0,
      }),
    ).toEqual({ type: 'snap', snap: 'half' });
  });

  it('keeps peek on downward fling (peek directional guard)', () => {
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'peek',
        startedVisualHeight: 80,
        releasedHeight: 60,
        velocityY: 0.5,
      }),
    ).toEqual({ type: 'snap', snap: 'peek' });
  });

  it('settles full → half on slow medium-distance downward drag', () => {
    // released 400, v≈0 → projected 400 → nearest of [80, 300, 600] is 300.
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'full',
        startedVisualHeight: 600,
        releasedHeight: 400,
        velocityY: 0,
      }),
    ).toEqual({ type: 'snap', snap: 'half' });
  });

  it('settles full → peek on a strong downward fling (~3.5 px/ms)', () => {
    // released 500, v=3.5 → projected = 500 - 3.5*150 = -25 → nearest 80 (peek).
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'full',
        startedVisualHeight: 600,
        releasedHeight: 500,
        velocityY: 3.5,
      }),
    ).toEqual({ type: 'snap', snap: 'peek' });
  });

  it('expands half → full on upward fling', () => {
    // released 400, v=-1 → projected = 400 + 250 = 650 → nearest 600 (full).
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'half',
        startedVisualHeight: 300,
        releasedHeight: 400,
        velocityY: -1,
      }),
    ).toEqual({ type: 'snap', snap: 'full' });
  });

  it('peek + moderate upward → half (one-step transition)', () => {
    // released 200, v=-0.3 → projected = 200 + 75 = 275 → nearest 300 (half).
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'peek',
        startedVisualHeight: 80,
        releasedHeight: 200,
        velocityY: -0.3,
      }),
    ).toEqual({ type: 'snap', snap: 'half' });
  });

  it('peek + strong upward fling (~3.5 px/ms) → full (overshoots half)', () => {
    // released 200, v=-3.5 → projected = 200 + 3.5*150 = 725 → nearest 600 (full).
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'peek',
        startedVisualHeight: 80,
        releasedHeight: 200,
        velocityY: -3.5,
      }),
    ).toEqual({ type: 'snap', snap: 'full' });
  });

  it('half + downward without peek → close', () => {
    // released 200, v=0.5 → projected 75. Candidates without peek [0, 300, 600].
    // |75-0|=75 wins.
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        hasPeek: false,
        startedSnap: 'half',
        startedVisualHeight: 300,
        releasedHeight: 200,
        velocityY: 0.5,
      }),
    ).toEqual({ type: 'close' });
  });

  it('half + downward with peek → peek (close is replaced as candidate)', () => {
    // Same projection (75) but candidates [80, 300, 600]. |75-80|=5 wins.
    expect(
      resolveFlexibleReleaseSnap({
        ...base,
        startedSnap: 'half',
        startedVisualHeight: 300,
        releasedHeight: 200,
        velocityY: 0.5,
      }),
    ).toEqual({ type: 'snap', snap: 'peek' });
  });
});

describe('resolveNonFlexibleReleaseSnap', () => {
  const base = {
    startedMaxHeight: MAX,
    peekHeight: PEEK,
    hasPeek: true,
  };

  it('full + upward projection → keep full (no-grow guard)', () => {
    expect(
      resolveNonFlexibleReleaseSnap({
        ...base,
        startedSnap: 'full',
        startedVisualHeight: 600,
        releasedHeight: 600,
        velocityY: -0.5,
      }),
    ).toEqual({ type: 'snap', snap: 'full' });
  });

  it('full + clear downward fling with peek → peek', () => {
    // released 450, v=1.0 → projected = 450 - 180 = 270. Candidates [80, 600].
    // |270-80|=190 < |270-600|=330.
    expect(
      resolveNonFlexibleReleaseSnap({
        ...base,
        startedSnap: 'full',
        startedVisualHeight: 600,
        releasedHeight: 450,
        velocityY: 1.0,
      }),
    ).toEqual({ type: 'snap', snap: 'peek' });
  });

  it('full + clear downward without peek → close', () => {
    // released 200, v=0 → projected 200. Candidates [0, 600]. |200-0|=200 wins.
    expect(
      resolveNonFlexibleReleaseSnap({
        ...base,
        hasPeek: false,
        startedSnap: 'full',
        startedVisualHeight: 600,
        releasedHeight: 200,
        velocityY: 0,
      }),
    ).toEqual({ type: 'close' });
  });

  it('jitter guard preserves full on near-zero drag', () => {
    expect(
      resolveNonFlexibleReleaseSnap({
        ...base,
        startedSnap: 'full',
        startedVisualHeight: 600,
        releasedHeight: 598,
        velocityY: 0,
      }),
    ).toEqual({ type: 'snap', snap: 'full' });
  });

  it('peek + downward → keep peek', () => {
    expect(
      resolveNonFlexibleReleaseSnap({
        ...base,
        startedSnap: 'peek',
        startedVisualHeight: 80,
        releasedHeight: 70,
        velocityY: 0.5,
      }),
    ).toEqual({ type: 'snap', snap: 'peek' });
  });
});

describe('resolveDragMode', () => {
  it('non-flexible always returns translate', () => {
    expect(
      resolveDragMode({
        isFlexible: false,
        startedSnap: 'full',
        visualHeight: 400,
        diffY: 200,
        halfHeight: HALF,
      }),
    ).toBe('translate');
    expect(
      resolveDragMode({
        isFlexible: false,
        startedSnap: 'peek',
        visualHeight: 150,
        diffY: -70,
        halfHeight: HALF,
      }),
    ).toBe('translate');
  });

  it('flexible + half + downward → translate', () => {
    expect(
      resolveDragMode({
        isFlexible: true,
        startedSnap: 'half',
        visualHeight: 250,
        diffY: 50,
        halfHeight: HALF,
      }),
    ).toBe('translate');
  });

  it('flexible + half + upward → height (top grows)', () => {
    expect(
      resolveDragMode({
        isFlexible: true,
        startedSnap: 'half',
        visualHeight: 350,
        diffY: -50,
        halfHeight: HALF,
      }),
    ).toBe('height');
  });

  it('flexible + full + downward above halfHeight → height', () => {
    expect(
      resolveDragMode({
        isFlexible: true,
        startedSnap: 'full',
        visualHeight: 400,
        diffY: 200,
        halfHeight: HALF,
      }),
    ).toBe('height');
  });

  it('flexible + full + downward past halfHeight → translate (mode flips)', () => {
    expect(
      resolveDragMode({
        isFlexible: true,
        startedSnap: 'full',
        visualHeight: 250,
        diffY: 350,
        halfHeight: HALF,
      }),
    ).toBe('translate');
  });

  it('flexible + peek + upward below halfHeight → translate (slides up)', () => {
    expect(
      resolveDragMode({
        isFlexible: true,
        startedSnap: 'peek',
        visualHeight: 150,
        diffY: -70,
        halfHeight: HALF,
      }),
    ).toBe('translate');
  });

  it('flexible + peek + upward past halfHeight → height (mode flips)', () => {
    expect(
      resolveDragMode({
        isFlexible: true,
        startedSnap: 'peek',
        visualHeight: 350,
        diffY: -270,
        halfHeight: HALF,
      }),
    ).toBe('height');
  });
});

describe('computeDragStyle', () => {
  const base = {
    startedMaxHeight: MAX,
    halfHeight: HALF,
  };

  it('non-flexible + downward → translate using startedVisualHeight as anchor', () => {
    const r = computeDragStyle({
      ...base,
      isFlexible: false,
      startedSnap: 'full',
      startedVisualHeight: 600,
      visualHeight: 500,
      diffY: 100,
    });
    expect(r.mode).toBe('translate');
    if (r.mode === 'translate') {
      expect(r.fixedHeight).toBe(600);
      expect(r.translate).toBe('100px');
    }
  });

  it('flexible + full + downward above halfHeight → height = visualHeight', () => {
    const r = computeDragStyle({
      ...base,
      isFlexible: true,
      startedSnap: 'full',
      startedVisualHeight: 600,
      visualHeight: 400,
      diffY: 200,
    });
    expect(r.mode).toBe('height');
    if (r.mode === 'height') expect(r.height).toBe(400);
  });

  it('flexible + full + downward past halfHeight → translate anchored at halfHeight', () => {
    const r = computeDragStyle({
      ...base,
      isFlexible: true,
      startedSnap: 'full',
      startedVisualHeight: 600,
      visualHeight: 250,
      diffY: 350,
    });
    expect(r.mode).toBe('translate');
    // fixedHeight switches to halfHeight at the boundary so the sheet doesn't
    // jump when modes flip mid-gesture.
    if (r.mode === 'translate') {
      expect(r.fixedHeight).toBe(HALF);
      expect(r.translate).toBe('50px'); // halfHeight(300) - visualHeight(250)
    }
  });

  it('peek + downward → translate from current visualHeight', () => {
    const r = computeDragStyle({
      ...base,
      isFlexible: false,
      startedSnap: 'peek',
      startedVisualHeight: 80,
      visualHeight: 60,
      diffY: 20,
    });
    expect(r.mode).toBe('translate');
    if (r.mode === 'translate') {
      // Peek-start formula reads the live visualHeight so a re-grab mid-
      // settle picks up the actual visible position (instead of anchoring
      // back to peekHeight via the old diffY-based formula).
      expect(r.translate).toBe('max(calc(100% - 60px), 0px)');
      expect(r.fixedHeight).toBe(MAX); // non-flexible peek anchors at maxHeight
    }
  });

  it('flexible peek + upward below halfHeight → translate using visualHeight, fixedHeight=0', () => {
    const r = computeDragStyle({
      ...base,
      isFlexible: true,
      startedSnap: 'peek',
      startedVisualHeight: 80,
      visualHeight: 150,
      diffY: -70,
    });
    expect(r.mode).toBe('translate');
    if (r.mode === 'translate') {
      expect(r.translate).toBe('max(calc(100% - 150px), 0px)');
      // flexible peek skips inline max-height so the CSS half/peek default
      // (calc(default × 0.5)) keeps driving the element height.
      expect(r.fixedHeight).toBe(0);
    }
  });

  it('flexible peek + upward past halfHeight → height (mode flips, grows from top)', () => {
    const r = computeDragStyle({
      ...base,
      isFlexible: true,
      startedSnap: 'peek',
      startedVisualHeight: 80,
      visualHeight: 350,
      diffY: -270,
    });
    expect(r.mode).toBe('height');
    if (r.mode === 'height') expect(r.height).toBe(350);
  });
});

describe('computeDimmerOpacity', () => {
  it('flexible: stays at 1 across the entire full↔half region', () => {
    expect(
      computeDimmerOpacity({
        height: 600,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
      }),
    ).toBe(1);
    expect(
      computeDimmerOpacity({
        height: 300,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
      }),
    ).toBe(1);
    expect(
      computeDimmerOpacity({
        height: 450,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
      }),
    ).toBe(1);
  });

  it('flexible: fades linearly between half and peek/close', () => {
    // span = halfHeight(300) - peek(80) = 220; midpoint at 80 + 110 = 190.
    expect(
      computeDimmerOpacity({
        height: 190,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
      }),
    ).toBeCloseTo(0.5, 2);
    expect(
      computeDimmerOpacity({
        height: 80,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
      }),
    ).toBe(0);
  });

  it('non-flexible: linear fade across the full↔peek span', () => {
    // span = 600 - 80 = 520; midpoint at 80 + 260 = 340.
    expect(
      computeDimmerOpacity({
        height: 340,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: false,
      }),
    ).toBeCloseTo(0.5, 2);
    expect(
      computeDimmerOpacity({
        height: 600,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: false,
      }),
    ).toBe(1);
    expect(
      computeDimmerOpacity({
        height: 80,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: false,
      }),
    ).toBe(0);
  });

  it('clamps outside the fade band', () => {
    expect(
      computeDimmerOpacity({
        height: 0,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: false,
      }),
    ).toBe(0);
    expect(
      computeDimmerOpacity({
        height: 700,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: false,
      }),
    ).toBe(1);
  });

  // iOS `largestUndimmedDetentIdentifier`-style override: when the largest
  // undimmed snap is `half`, the dimmer stays at 0 across the entire
  // `peek ↔ half` region and only fades in between half and full.
  it('flexible + largestUndimmedSnap=half: 0 at half, fades to 1 at full', () => {
    expect(
      computeDimmerOpacity({
        height: 600,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        largestUndimmedSnap: 'half',
      }),
    ).toBe(1);
    expect(
      computeDimmerOpacity({
        height: 300,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        largestUndimmedSnap: 'half',
      }),
    ).toBe(0);
    // span = 600 - 300 = 300; midpoint at 300 + 150 = 450.
    expect(
      computeDimmerOpacity({
        height: 450,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        largestUndimmedSnap: 'half',
      }),
    ).toBeCloseTo(0.5, 2);
  });

  it('flexible + largestUndimmedSnap=half: stays 0 between peek and half', () => {
    expect(
      computeDimmerOpacity({
        height: 80,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        largestUndimmedSnap: 'half',
      }),
    ).toBe(0);
    expect(
      computeDimmerOpacity({
        height: 200,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        largestUndimmedSnap: 'half',
      }),
    ).toBe(0);
  });

  // largestUndimmedSnap only meaningful with flexible — the non-flexible
  // formula ignores the option and keeps the full↔peek linear fade.
  it('non-flexible: largestUndimmedSnap=half is ignored', () => {
    expect(
      computeDimmerOpacity({
        height: 340,
        maxHeight: 600,
        peekHeight: 80,
        isFlexible: false,
        largestUndimmedSnap: 'half',
      }),
    ).toBeCloseTo(0.5, 2);
  });
});

describe('computeDimmerOpacityDuringDrag', () => {
  // Regression: half-start downward drag used to read `halfHeight = startedMaxHeight * 0.5`,
  // which resolves to 150 when startedMaxHeight is the half-state computed
  // height (300). That made the dimmer stay at opacity 1 across the entire
  // visible 300→150 range, only fading in the last 70px to peek. The fix
  // passes the snap-INDEPENDENT `fullMaxHeight` so halfHeight resolves to the
  // true 300, restoring the expected 1→0 fade across [halfHeight, peekHeight].
  it('half-start: dimmer immediately starts fading on downward drag (default)', () => {
    const opacityAtStart = computeDimmerOpacityDuringDrag({
      startedSnap: 'half',
      visualHeight: 300,
      startedMaxHeight: 300, // half-state computed height
      fullMaxHeight: 600, // snap-independent full max
      peekHeight: 80,
      isFlexible: true,
      diffY: 0,
    });
    expect(opacityAtStart).toBe(1);

    // 50px into the drag: visualHeight=250. With the fix, span=[80, 300]
    // so opacity = (250-80)/(300-80) ≈ 0.77. Without the fix it would still be 1.
    const opacityMidDrag = computeDimmerOpacityDuringDrag({
      startedSnap: 'half',
      visualHeight: 250,
      startedMaxHeight: 300,
      fullMaxHeight: 600,
      peekHeight: 80,
      isFlexible: true,
      diffY: 50,
    });
    expect(opacityMidDrag).toBeCloseTo(0.77, 2);
  });

  it('half-start + largestUndimmedSnap=half: dimmer stays at 0 across half↔peek', () => {
    // At rest at half: dimmer 0.
    expect(
      computeDimmerOpacityDuringDrag({
        startedSnap: 'half',
        visualHeight: 300,
        startedMaxHeight: 300,
        fullMaxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        diffY: 0,
        largestUndimmedSnap: 'half',
      }),
    ).toBe(0);

    // Mid-drag down toward peek: still 0 (visualHeight 200, below halfHeight).
    expect(
      computeDimmerOpacityDuringDrag({
        startedSnap: 'half',
        visualHeight: 200,
        startedMaxHeight: 300,
        fullMaxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        diffY: 100,
        largestUndimmedSnap: 'half',
      }),
    ).toBe(0);

    // Drag back upward past half (visualHeight 450): fades in across [300, 600].
    expect(
      computeDimmerOpacityDuringDrag({
        startedSnap: 'half',
        visualHeight: 450,
        startedMaxHeight: 300,
        fullMaxHeight: 600,
        peekHeight: 80,
        isFlexible: true,
        diffY: -150,
        largestUndimmedSnap: 'half',
      }),
    ).toBeCloseTo(0.5, 2);
  });
});

describe('calcOpacityRatio', () => {
  it('returns 1 below or at the minimum', () => {
    expect(calcOpacityRatio(50, 100, 200)).toBe(1);
    expect(calcOpacityRatio(100, 100, 200)).toBe(1);
  });
  it('returns 0 at or above the maximum', () => {
    expect(calcOpacityRatio(200, 100, 200)).toBe(0);
    expect(calcOpacityRatio(250, 100, 200)).toBe(0);
  });
  it('linear interpolation between bounds', () => {
    expect(calcOpacityRatio(150, 100, 200)).toBe(0.5);
    expect(calcOpacityRatio(125, 100, 200)).toBe(0.75);
  });
});

describe('isMouseDownOnPeek', () => {
  const makeEvent = (clientY: number, rectTop: number) =>
    ({
      type: 'mousedown',
      clientY,
      currentTarget: {
        getBoundingClientRect: () => ({ top: rectTop }) as DOMRect,
      },
    }) as unknown as React.MouseEvent;

  it('returns false outside peek snap state', () => {
    expect(isMouseDownOnPeek(makeEvent(550, 500), 80, 'full')).toBe(false);
    expect(isMouseDownOnPeek(makeEvent(550, 500), 80, 'half')).toBe(false);
  });

  it('returns false when peekHeight is zero (defensive guard)', () => {
    expect(isMouseDownOnPeek(makeEvent(550, 500), 0, 'peek')).toBe(false);
  });

  it('returns true inside the visible peek strip', () => {
    // rect.top=500, peekHeight=80 → band [500, 580].
    expect(isMouseDownOnPeek(makeEvent(540, 500), 80, 'peek')).toBe(true);
    expect(isMouseDownOnPeek(makeEvent(500, 500), 80, 'peek')).toBe(true);
    expect(isMouseDownOnPeek(makeEvent(580, 500), 80, 'peek')).toBe(true);
  });

  it('returns false outside the peek band', () => {
    expect(isMouseDownOnPeek(makeEvent(490, 500), 80, 'peek')).toBe(false);
    expect(isMouseDownOnPeek(makeEvent(600, 500), 80, 'peek')).toBe(false);
  });
});
