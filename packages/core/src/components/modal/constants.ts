export const MODAL_NAME = 'Modal';
export const MODAL_TRIGGER_NAME = 'ModalTrigger';
export const MODAL_CONTAINER_NAME = 'ModalContainer';
export const MODAL_DIMMER_NAME = 'ModalDimmer';
export const MODAL_NAVIGATION_NAME = 'ModalNavigation';
export const MODAL_NAVIGATION_BUTTON_NAME = 'ModalNavigationButton';
export const MODAL_CLOSE_NAME = 'ModalClose';

export const BOTTOM_SHEET_SHADOW = '0 15px 75px 0 rgba(23, 23, 23, 0.16)';

export const BOTTOM_SHEET_PEEK_PADDING = 12;

/**
 * Top inset (px) reserved above the sheet at its full snap. Mirrors the `- 40px`
 * in the `--modal-default-max-height` CSS calc — keep in sync with style.ts.
 */
export const BOTTOM_SHEET_TOP_INSET_PX = 40;

/**
 * Asymptotic ceiling (px) for top-edge rubber-band overshoot. The actual
 * overshoot approaches but never reaches this value, so a small constant
 * still lets the gesture feel elastic over a long pull. Picked to roughly
 * match the visual reserved by `BOTTOM_SHEET_TOP_INSET_PX` (40px) so the
 * sheet never visibly intrudes into the safe-area band during a fling.
 */
export const BOTTOM_SHEET_RUBBER_BAND_MAX_PX = 40;

/**
 * CSS transition used for *non-gesture* sheet movement — snap changes
 * triggered programmatically (open/close, controlled `snap` prop change,
 * responsive variant flip). Gesture releases bypass this entirely and
 * settle via the velocity-seeded spring, so this curve only needs to feel
 * tidy on its own; `ease` is intentional.
 */
export const BOTTOM_SHEET_SETTLE_DURATION_MS = 280;
export const BOTTOM_SHEET_SETTLE_TRANSITION = `${BOTTOM_SHEET_SETTLE_DURATION_MS}ms ease`;

/**
 * Spring parameters for gesture-release settle. Drives a damped harmonic
 * oscillator (mass-spring-damper) numerically integrated per animation frame.
 * Carries the finger's release velocity into v₀, which the cubic-bezier CSS
 * transition path could not do — this is what makes the sheet feel like iOS.
 *
 * Tuning: stiffness=240, damping=28, mass=1 →
 *   ω₀ ≈ 15.5 rad/s, ζ ≈ 0.90 (slightly underdamped, ~1.5% overshoot),
 *   5%-settle ≈ 0.21s. Picked to land near iOS sheet response while
 *   avoiding visible bounce at snap targets.
 */
export const BOTTOM_SHEET_SPRING_STIFFNESS = 240;
export const BOTTOM_SHEET_SPRING_DAMPING = 28;
export const BOTTOM_SHEET_SPRING_MASS = 1;
/** Position tolerance (px) for rest-detection. */
export const BOTTOM_SHEET_SPRING_REST_THRESHOLD_PX = 0.4;
/** Velocity tolerance (px/s) for rest-detection. */
export const BOTTOM_SHEET_SPRING_REST_VELOCITY_PX_S = 8;
/**
 * Fixed sub-step duration (seconds) used inside one rAF tick. Semi-implicit
 * Euler is conditionally stable; with stiffness=240 we need dt < ~0.04s for
 * stability, so 1/120s gives plenty of margin and keeps results consistent
 * across 60Hz / 120Hz displays.
 */
export const BOTTOM_SHEET_SPRING_SUB_STEP_S = 1 / 120;
/**
 * Frame-delta clamp (seconds). When a tab is backgrounded then refocused,
 * the first `now - lastT` can be huge — clamping prevents the spring from
 * fast-forwarding through dozens of stiff sub-steps.
 */
export const BOTTOM_SHEET_SPRING_MAX_FRAME_DT_S = 0.064;

/**
 * Half snap height as a ratio of the sheet's max height. Boundary for
 * `flexible` mode transitions (height → translate, peek/half/full picks).
 */
export const BOTTOM_SHEET_HALF_RATIO = 0.5;

/**
 * Forward-projection horizon used when picking a snap on release. The release
 * position is projected forward by `velocity * PROJECTION_MS`, then the
 * candidate snap nearest to that projected position wins. A fast flick covers
 * a lot of projected distance and snaps far; a slow drag projects close to
 * where the finger lifted and snaps near.
 *
 * Tuned tighter than the canonical iOS scroll-deceleration band (~250ms) so
 * the gesture has to commit more deliberately to throw past an adjacent snap.
 * A "normal fling" (~1.5 px/ms) reaches the next snap; only a strong fling
 * (~3.5 px/ms+) clearly crosses two snaps.
 */
export const BOTTOM_SHEET_PROJECTION_MS = 150;

/**
 * Minimum projected-position delta (px) for a snap change to be considered.
 * If the projected position is within this band of the starting visual
 * height, the gesture is treated as a tap/jitter and the starting snap is
 * preserved.
 */
export const BOTTOM_SHEET_MIN_PROJECTION_DELTA = 5;

/**
 * Velocity sample window (ms). Velocity is averaged over the most recent
 * samples inside this window; older samples are dropped. Shorter windows
 * react to flicks more sharply, longer windows are steadier under noise.
 */
export const BOTTOM_SHEET_VELOCITY_WINDOW_MS = 100;

/**
 * Dimmer opacity at or below which the sheet renders its peek shadow.
 */
export const BOTTOM_SHEET_SHADOW_OPACITY_THRESHOLD = 0.25;
