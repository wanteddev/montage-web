import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@montage-ui/engine';

export type IconButtonVariant = 'normal' | 'background' | 'outlined' | 'solid';

export type IconButtonDefaultProps = WithSxProps<{
  variant?: IconButtonVariant;
  /** Whether the icon button is disabled. */
  disabled?: boolean;
  /**
   * The size of the icon button.
   * - `normal` variant: token maps to box/icon size (`xlarge` = 36/24, `large` = 32/20, `medium` = 28/18, `small` = 24/16).
   * - `outlined` / `solid` variant: `medium` = 40px box, `small` = 32px box. `xlarge` / `large` is not supported and falls back to `medium`.
   * - `number`: box size in px (clamped to 24–the largest dimension token, warning in development when exceeded); icon size and radius snap to the nearest tokens.
   * - With `interactionOverflow`, `size` is the icon size instead (a token contributes only its icon size) — see that prop.
   */
  size?: number | 'xlarge' | 'large' | 'medium' | 'small';
  /**
   * `normal` variant only. When true, the layout shrinks to the icon size and the
   * interaction area overflows it without affecting layout. Defaults to `false`.
   */
  interactionOverflow?: boolean;
  /** The color of the icon. */
  color?: ThemeColorsToken;
  /**
   * The interaction effect shown on hover / press. Defaults to `highlight`.
   * - `highlight`: Overlays the interaction layer filled with `interactionColor`.
   * - `dim`: Hides the interaction layer and instead switches the icon color to `interactionColor` with reduced opacity. Only applies to the `normal` variant; other variants behave like `highlight`.
   * - `none`: Disables the interaction effect.
   */
  interactionEffect?: 'highlight' | 'dim' | 'none';
  /**
   * The color used for the hover / press feedback. Defaults to `semantic.foreground.neutral.primary`.
   * - `highlight` effect: Fills the interaction layer that fades in.
   * - `dim` effect: Applied to the icon itself (with reduced opacity).
   * Ignored when `interactionEffect` is `none`.
   */
  interactionColor?: ThemeColorsToken;
  /**
   * When `variant` is `background`, if `alternative` is true, renders a fallback style that looks natural in environments where `blur` is not supported.
   */
  alternative?: boolean;
  /** The content of the icon button. Use icon component as the children. */
  children?: ReactNode;
}>;

export type IconButtonResponsiveProps = ResponsiveProps<
  Pick<IconButtonDefaultProps, 'size'>
>;

export type IconButtonProps = Merge<
  IconButtonDefaultProps,
  IconButtonResponsiveProps
>;
