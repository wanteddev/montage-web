import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PushBadgeDefaultProps = WithSxProps<{
  variant?: 'dot' | 'number' | 'new';
  count?: number;
  invisible?: boolean;
  size?: 'xsmall' | 'small' | 'medium';
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  offsetX?: string;
  offsetY?: string;
  children?: ReactNode;
}>;

type PushBadgeResponsiveProps = ResponsiveProps<
  Pick<PushBadgeDefaultProps, 'size' | 'offsetX' | 'offsetY'>
>;

export type PushBadgeProps = Merge<
  PushBadgeDefaultProps,
  PushBadgeResponsiveProps
>;
