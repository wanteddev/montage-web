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
  disabled?: boolean;
  disableInteraction?: boolean;
  size?: number | 'medium' | 'small';
  color?: ThemeColorsToken;
  interactionColor?: ThemeColorsToken;
  /**
   * When using `background` button, if `alternative` is true, the dark theme is activated.
   */
  alternative?: boolean;
  children?: ReactNode;
}>;

export type IconButtonResponsiveProps = ResponsiveProps<
  Pick<IconButtonDefaultProps, 'size'>
>;

export type IconButtonProps = Merge<
  IconButtonDefaultProps,
  IconButtonResponsiveProps
>;
