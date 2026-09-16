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
   * - `number`: box size in px (clamped to ≥ 24); icon size and radius snap to the nearest tokens.
   * - With `useLegacyInteractionLayer`, `size` is the icon size instead (a token contributes only its icon size) — see that prop.
   */
  size?: number | 'xlarge' | 'large' | 'medium' | 'small';
  /**
   * Restores the pre-4.0 layout of the `normal` variant for backward compatibility.
   * `size` is the icon size (a `number` in px, or a token's icon size — `xlarge` = 24 by default) and the box is exactly the icon, so the button takes up the same space as before.
   * The interaction layer and radius still follow the current size policy (e.g. a 24px icon gets the 36px / radius 10 of `xlarge`)
   * but overlay the icon without affecting layout. Ignored by other variants, where `size` has always been the box size.
   */
  useLegacyInteractionLayer?: boolean;
  /** The color of the icon. */
  color?: ThemeColorsToken;
  /**
   * The interaction effect shown on hover / press. Defaults to `normal`.
   * - `normal`: Overlays the interaction layer filled with `interactionColor`.
   * - `dim`: Hides the interaction layer and instead switches the icon color to `interactionColor` with reduced opacity. Only applies to the `normal` variant; other variants behave like `normal`.
   * - `none`: Disables the interaction effect.
   */
  interactionEffect?: 'normal' | 'dim' | 'none';
  /**
   * The color used for the hover / press feedback. Defaults to `semantic.foreground.neutral.primary`.
   * - `normal` effect: Fills the interaction layer that fades in.
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
