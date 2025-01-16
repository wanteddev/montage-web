import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type PlayIconBadgeDefaultProps = {
  size?: 'medium' | 'large' | 'small';
  alternative?: boolean;
};

export type PlayIconBadgeResponsiveProps = ResponsiveProps<
  Pick<PlayIconBadgeDefaultProps, 'size'>
>;

export type PlayIconBadgeProps = Merge<
  PlayIconBadgeDefaultProps,
  PlayIconBadgeResponsiveProps
>;
