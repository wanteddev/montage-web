import type { Merge, ResponsiveProps } from '../../types';

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
