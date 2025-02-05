/* FIXME 마이그레이션 시 filled 제거 필요 */
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ContentBadgeDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  size?: 'normal' | 'medium' | 'large';
  variant?:
    | 'solid'
    | 'outlined'
    /** @deprecated */
    | 'filled';
  color?: 'neutral' | 'accent';
  accentColor?: ThemeColorsToken;
  children?: ReactNode;
};

export type ContentBadgeResponsiveProps = ResponsiveProps<
  Pick<ContentBadgeDefaultProps, 'size'>
>;

export type ContentBadgeProps = Merge<
  ContentBadgeDefaultProps,
  ContentBadgeResponsiveProps
>;
