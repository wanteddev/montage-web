import type { ReactNode } from 'react';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';

type AvatarGroupDefaultProps = WithSxProps<{
  /**
   * The size of the avatar group.
   * It is recommended to use sizes consistent with `Avatar` for visual harmony.
   */
  size?: 'xsmall' | 'small';
  /**
   * The content of the avatar group. Use `Avatar` components as the children.
   * A maximum of 5 children are rendered; the rest are ignored.
   */
  children?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `AvatarGroupContent`.
   */
  trailingContent?: ReactNode;
}>;

type AvatarGroupResponsiveProps = ResponsiveProps<
  Pick<AvatarGroupDefaultProps, 'size'>
>;

export type AvatarGroupProps = Merge<
  AvatarGroupDefaultProps,
  AvatarGroupResponsiveProps
>;

export type AvatarGroupContentProps = WithSxProps<{
  /** The variant of the `AvatarGroupContent`. */
  variant?: 'text' | 'text-button';
  children?: ReactNode;
}>;
