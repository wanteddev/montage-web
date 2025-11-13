import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type AvatarGroupDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small';
  children?: ReactNode;
  trailingContent?: ReactNode;
}>;

type AvatarGroupResponsiveProps = ResponsiveProps<
  Pick<AvatarGroupDefaultProps, 'size'>
>;

export type AvatarGroupProps = Merge<
  AvatarGroupDefaultProps,
  AvatarGroupResponsiveProps
>;
