import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';

type IconButtonVariant = 'normal' | 'background' | 'outlined' | 'solid';

export type IconButtonDefaultProps = {
  variant?: IconButtonVariant;
  disabled?: boolean;
  disableInteraction?: boolean;
  pushBadge?: boolean;
  size?: number | 'normal' | 'small';
  color?: ThemeColorsToken;
  interactionColor?: ThemeColorsToken;
  alternative?: boolean;
};

export type IconButtonResponsiveProps = ResponsiveProps<
  Pick<IconButtonDefaultProps, 'size'>
>;

export type IconButtonProps = Merge<
  IconButtonDefaultProps,
  IconButtonResponsiveProps
>;
