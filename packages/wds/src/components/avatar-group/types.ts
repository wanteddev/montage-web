import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type AvatarGroupDefaultProps = WithSxProps<{
  /**
   * The size of the avatar group.
   * It is recommended to use sizes consistent with `Avatar` for visual harmony.
   */
  size?: 'xsmall' | 'small';
  /** The content of the avatar group. Use `Avatar` components as the children. */
  children?: ReactNode;
  /** The content displayed in the trailing area. */
  trailingContent?: ReactNode;
}>;

type AvatarGroupResponsiveProps = ResponsiveProps<
  Pick<AvatarGroupDefaultProps, 'size'>
>;

export type AvatarGroupProps = Merge<
  AvatarGroupDefaultProps,
  AvatarGroupResponsiveProps
>;
