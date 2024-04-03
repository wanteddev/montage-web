import type { Merge, ResponsiveProps, ThemeColorsToken } from '../../types';

type IconButtonVariant = 'normal' | 'background' | 'outlined' | 'solid';

export type IconButtonDefaultProps = {
  variant?: IconButtonVariant;
  disabled?: boolean;
  disableInteraction?: boolean;
  pushBadge?: boolean;
  size?: number | 'normal' | 'small';
  color?: ThemeColorsToken;
  interactionColor?: ThemeColorsToken;
};

export type IconButtonResponsiveProps = ResponsiveProps<
  Pick<IconButtonDefaultProps, 'size'>
>;

export type IconButtonProps = Merge<
  IconButtonDefaultProps,
  IconButtonResponsiveProps
>;
