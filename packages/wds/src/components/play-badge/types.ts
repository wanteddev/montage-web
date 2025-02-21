import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type PlayBadgeDefaultProps = {
  size?: 'medium' | 'large' | 'small';
  alternative?: boolean;
};

export type PlayBadgeResponsiveProps = ResponsiveProps<
  Pick<PlayBadgeDefaultProps, 'size'>
>;

export type PlayBadgeProps = Merge<
  PlayBadgeDefaultProps,
  PlayBadgeResponsiveProps
>;
