import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type IconButtonVariant = 'normal' | 'background' | 'outlined' | 'solid';

export type IconButtonDefaultProps = WithSxProps<{
  variant?: IconButtonVariant;
  /** Whether the icon button is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** The size of the icon button. */
  size?: number | 'medium' | 'small';
  /** The color of the icon. */
  color?: ThemeColorsToken;
  /** The color of the icon button when the interaction is triggered. */
  interactionColor?: ThemeColorsToken;
  /**
   * When `variant` is `background`, if `alternative` is true, the icon button uses a dark-colored background.
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
