import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';

export type PlayBadgeDefaultProps = WithSxProps<{
  /** The size of the play badge. */
  size?: 'medium' | 'large' | 'small';
  /** Whether to use the alternative background style. */
  alternative?: boolean;
}>;

export type PlayBadgeResponsiveProps = ResponsiveProps<
  Pick<PlayBadgeDefaultProps, 'size'>
>;

export type PlayBadgeProps = Merge<
  PlayBadgeDefaultProps,
  PlayBadgeResponsiveProps
>;
