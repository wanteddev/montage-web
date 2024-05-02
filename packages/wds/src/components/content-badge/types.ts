import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ContentBadgeDefaultProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'xsmall' | 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  color?: 'neutral' | 'accent';
  accentColor?: ThemeColorsToken;
};

export type ContentBadgeResponsiveProps = ResponsiveProps<
  Pick<ContentBadgeDefaultProps, 'size'>
>;

export type ContentBadgeProps = Merge<
  ContentBadgeDefaultProps,
  ContentBadgeResponsiveProps
>;
