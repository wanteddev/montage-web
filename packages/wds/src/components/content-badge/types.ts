import type { Merge, ResponsiveProps } from '@/types';
import type { ReactNode } from 'react';

export type ContentBadgeDefaultProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'xsmall' | 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  color?: 'neutral' | 'accent';
  accentColor?:
    | 'lime'
    | 'cyan'
    | 'lightBlue'
    | 'violet'
    | 'pink'
    | 'redOrange'
    | 'positive'
    | 'cautionary'
    | 'negative';
};

export type ContentBadgeResponsiveProps = ResponsiveProps<
  Pick<ContentBadgeDefaultProps, 'size' | 'color' | 'accentColor' | 'variant'>
>;

export type ContentBadgeProps = Merge<
  ContentBadgeDefaultProps,
  ContentBadgeResponsiveProps
>;
