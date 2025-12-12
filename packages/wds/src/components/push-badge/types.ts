import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PushBadgeDefaultProps = WithSxProps<{
  /** The variant of the push badge. */
  variant?: 'dot' | 'number' | 'new';
  /** The count of the push badge. */
  count?: number;
  /** Whether the push badge is invisible. */
  invisible?: boolean;
  /** The size of the push badge. */
  size?: 'xsmall' | 'small' | 'medium';
  /** The position of the push badge. */
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
  /** The offset x of the push badge. */
  offsetX?: string;
  /** The offset y of the push badge. */
  offsetY?: string;
  /** The element on which the push badge will be displayed. */
  children?: ReactNode;
}>;

type PushBadgeResponsiveProps = ResponsiveProps<
  Pick<PushBadgeDefaultProps, 'size' | 'offsetX' | 'offsetY'>
>;

export type PushBadgeProps = Merge<
  PushBadgeDefaultProps,
  PushBadgeResponsiveProps
>;
