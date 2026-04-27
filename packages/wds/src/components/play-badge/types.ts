import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type PlayBadgeDefaultProps = WithSxProps<{
  /** The size of the play badge. */
  size?: 'medium' | 'large' | 'small';
  /** If true, renders a fallback style that looks natural in environments where `blur` is not supported. */
  alternative?: boolean;
}>;

export type PlayBadgeResponsiveProps = ResponsiveProps<
  Pick<PlayBadgeDefaultProps, 'size'>
>;

export type PlayBadgeProps = Merge<
  PlayBadgeDefaultProps,
  PlayBadgeResponsiveProps
>;
