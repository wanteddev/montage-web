import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

type AvatarGroupDefaultProps = {
  size?: 'xsmall' | 'small';
};

type AvatarGroupResponsiveProps = ResponsiveProps<
  Pick<AvatarGroupDefaultProps, 'size'>
>;

export type AvatarGroupProps = Merge<
  AvatarGroupDefaultProps,
  AvatarGroupResponsiveProps
>;
