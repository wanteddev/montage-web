import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type PlayBadgeDefaultProps = WithSxProps<{
  size?: 'medium' | 'large' | 'small';
  alternative?: boolean;
}>;

export type PlayBadgeResponsiveProps = ResponsiveProps<
  Pick<PlayBadgeDefaultProps, 'size'>
>;

export type PlayBadgeProps = Merge<
  PlayBadgeDefaultProps,
  PlayBadgeResponsiveProps
>;
