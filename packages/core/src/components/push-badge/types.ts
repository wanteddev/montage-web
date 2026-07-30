import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@montage-ui/engine';

type PushBadgeDefaultProps = WithSxProps<{
  /** The variant of the push badge. */
  variant?: 'dot' | 'text' | 'max-count';
  /** The content of the push badge when `variant=text` or `variant=max-count`. */
  text?: number | string;
  /** The maximum numeric value of `text` when `variant=max-count`. A larger value renders as `{maxCount}+`. */
  maxCount?: number;
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
  /** Whether the push badge has an outline border. */
  outlineBorder?: boolean;
  /** The color of the outline border when `outlineBorder=true`. */
  outlineBorderColor?: ThemeColorsToken;
}>;

type PushBadgeResponsiveProps = ResponsiveProps<
  Pick<PushBadgeDefaultProps, 'size' | 'offsetX' | 'offsetY'>
>;

export type PushBadgeProps = Merge<
  PushBadgeDefaultProps,
  PushBadgeResponsiveProps
>;
