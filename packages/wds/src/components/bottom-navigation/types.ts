import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type BottomNavigationProps = WithSxProps<{
  /** The default value of the bottom navigation. */
  defaultValue?: string;
  /** The value of the bottom navigation. */
  value?: string;
  /** Callback function when the value changes. */
  onValueChange?: (value: string) => void;
  /** The content of the bottom navigation. Use `BottomNavigationItem` components as the children. */
  children?: ReactNode;
}>;

export type BottomNavigationItemProps = WithSxProps<{
  /** The label of the bottom navigation item. */
  label?: ReactNode;
  /** The icon of the bottom navigation item. */
  icon?: ReactNode;
  /** Use `label`, `icon` instead of `children`. */
  children?: ReactNode;
  /** The value of the bottom navigation item. */
  value: string;
}>;
