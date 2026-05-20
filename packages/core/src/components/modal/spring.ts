import {
  BOTTOM_SHEET_SPRING_DAMPING,
  BOTTOM_SHEET_SPRING_MASS,
  BOTTOM_SHEET_SPRING_MAX_FRAME_DT_S,
  BOTTOM_SHEET_SPRING_REST_THRESHOLD_PX,
  BOTTOM_SHEET_SPRING_REST_VELOCITY_PX_S,
  BOTTOM_SHEET_SPRING_STIFFNESS,
  BOTTOM_SHEET_SPRING_SUB_STEP_S,
} from './constants';

type SpringRunOptions = {
  from: number;
  to: number;
  /**
   * Initial velocity in same units/s as `from`/`to`, signed so that positive
   * means the value is increasing. Pass finger release velocity here after
   * mapping its sign into the spring's domain.
   */
  velocity: number;
  onUpdate: (value: number) => void;
  onComplete: () => void;
};

export type SpringHandle = {
  cancel: () => void;
};

/**
 * Numerical integration of a damped-harmonic-oscillator spring. Drives a
 * scalar from `from` toward `to`, seeded with `velocity` so a fling carries
 * its energy into the settle animation (the iOS sheet feel).
 *
 * Why not CSS transitions: a `cubic-bezier`/`linear()` curve has a fixed
 * shape regardless of release velocity. Two releases at the same position
 * but different speeds animate identically — exactly the "unnatural" feel
 * we're trying to fix.
 *
 * Integration: semi-implicit Euler with fixed sub-steps so behavior stays
 * consistent across 60Hz/120Hz displays and the spring doesn't blow up on
 * the first frame after a tab regains focus.
 */
export const runSpring = ({
  from,
  to,
  velocity,
  onUpdate,
  onComplete,
}: SpringRunOptions): SpringHandle => {
  const k = BOTTOM_SHEET_SPRING_STIFFNESS;
  const c = BOTTOM_SHEET_SPRING_DAMPING;
  const m = BOTTOM_SHEET_SPRING_MASS;
  const subDt = BOTTOM_SHEET_SPRING_SUB_STEP_S;

  // Condition the release velocity so the settle never "throws" the sheet
  // past its target before pulling it back:
  //
  // - Velocity *opposing* the target direction (snap-back case — finger
  //   moved down a bit but projection picked the starting snap above)
  //   would carry the spring further *away* from target before reversing.
  //   Visible as a "wrong-way" excursion past the release point.
  //   → Zero it. The spring force alone returns the sheet smoothly.
  //
  // - Velocity *aligned* with target direction but larger than the
  //   no-overshoot threshold `ω₀ × |displacement|` would push the spring
  //   past target. For an interior target (half) the overshoot appears
  //   as a bounce; for a boundary target (full / peek / close) it's
  //   either CSS-clamped and shows up as a rebound, or it visibly
  //   springs past the snap.
  //   → Cap to the threshold so a critically-damped approach completes
  //     the rest of the motion. Slight underdamping (current ζ≈0.9)
  //     leaves sub-pixel residual overshoot.
  //
  // The lift-off acceleration captured in the velocity window is the
  // dominant source of these visible artifacts — the user perceives them
  // as a separate "spring to pointer, then to target" two-step motion.
  const naturalFrequency = Math.sqrt(k / m);
  const initialDisplacement = to - from;
  const targetDirection = Math.sign(initialDisplacement);
  const velocityDirection = Math.sign(velocity);
  let initialVelocity = velocity;
  if (targetDirection !== 0 && velocityDirection !== 0) {
    if (targetDirection !== velocityDirection) {
      initialVelocity = 0;
    } else {
      const cap = naturalFrequency * Math.abs(initialDisplacement);
      if (Math.abs(velocity) > cap) {
        initialVelocity = velocityDirection * cap;
      }
    }
  }

  let position = from;
  let v = initialVelocity;
  let lastT = performance.now();
  let rafId: number | null = null;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;

    const elapsed = Math.min(
      BOTTOM_SHEET_SPRING_MAX_FRAME_DT_S,
      (now - lastT) / 1000,
    );
    lastT = now;

    const steps = Math.max(1, Math.ceil(elapsed / subDt));
    const dt = elapsed / steps;
    for (let i = 0; i < steps; i++) {
      const displacement = position - to;
      const acceleration = (-k * displacement - c * v) / m;
      v += acceleration * dt;
      position += v * dt;
    }

    const atRest =
      Math.abs(position - to) < BOTTOM_SHEET_SPRING_REST_THRESHOLD_PX &&
      Math.abs(v) < BOTTOM_SHEET_SPRING_REST_VELOCITY_PX_S;

    if (atRest) {
      // Snap to exact target so callers can rely on `to` being the final value
      // (avoids 0.3px residual differences on the spring → CSS handoff).
      onUpdate(to);
      onComplete();
      return;
    }

    onUpdate(position);
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return {
    cancel: () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
    },
  };
};
