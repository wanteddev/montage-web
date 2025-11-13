import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ContentBadgeDefaultProps = WithSxProps<{
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  size?: 'xsmall' | 'small' | 'medium';
  variant?: 'solid' | 'outlined';
  color?: 'neutral' | 'accent';
  accentColor?: ThemeColorsToken;
  neutralColor?: ThemeColorsToken;
  children?: ReactNode;
}>;

export type ContentBadgeResponsiveProps = ResponsiveProps<
  Pick<ContentBadgeDefaultProps, 'size'>
>;

export type ContentBadgeProps = Merge<
  ContentBadgeDefaultProps,
  ContentBadgeResponsiveProps
>;
