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
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /**
   * The size of the icon button.
   * - `normal` variant: token maps to box/icon size (`xlarge` = 36/24, `large` = 32/20, `medium` = 28/18, `small` = 24/16).
   * - `outlined` / `solid` variant: `medium` = 40px box, `small` = 32px box. `xlarge` / `large` is not supported and falls back to `medium`.
   * - `number`: box size in px (clamped to ≥ 24); icon size and radius snap to the nearest tokens.
   */
  size?: number | 'xlarge' | 'large' | 'medium' | 'small';
  /** The color of the icon. */
  color?: ThemeColorsToken;
  /** The color of the icon button when the interaction is triggered. */
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
