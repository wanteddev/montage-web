import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';

export type SegmentedControlDefaultProps = WithSxProps<{
  /** The default value of the segmented control. */
  defaultValue?: string;
  /** The value of the segmented control. */
  value?: string;
  /** Callback function when the value changes. */
  onValueChange?: (tab: string) => void;
  /** The size of the segmented control. */
  size?: 'large' | 'medium' | 'small';
  /** The children of the segmented control. */
  children?: ReactNode;
  /** Whether to show only the icon. If `iconOnly` is enabled, you must provide an icon component as the SegmentedControlItem's `children`. */
  iconOnly?: boolean;
  /** The name of the segmented control. */
  name?: string;
}>;

type SegmentedControlResponsiveProps = ResponsiveProps<
  Pick<SegmentedControlDefaultProps, 'size'>
>;

export type SegmentedControlProps = Merge<
  SegmentedControlDefaultProps,
  SegmentedControlResponsiveProps
>;

export type SegmentedControlItemProps = WithSxProps<{
  /** The leading icon of the segmented control item. */
  leadingIcon?: ReactNode;
  /** Whether the segmented control item is disabled. */
  disabled?: boolean;
  /** The value of the segmented control item. */
  value: string;
  children?: ReactNode;
}>;
