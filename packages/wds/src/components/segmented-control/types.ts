import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SegmentedControlDefaultProps = WithSxProps<{
  /** The default value of the segmented control. */
  defaultValue?: string;
  /** The value of the segmented control. */
  value?: string;
  /** Callback function when the value changes. */
  onValueChange?: (tab: string) => void;
  /** The variant of the segmented control. */
  variant?: 'solid' | 'outlined';
  /** The size of the segmented control. */
  size?: 'large' | 'medium' | 'small';
  /** The children of the segmented control. */
  children?: ReactNode;
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
  /** The leading content of the segmented control item. */
  leadingContent?: ReactNode;
  /** The trailing content of the segmented control item. */
  trailingContent?: ReactNode;
  /** Whether the segmented control item is disabled. */
  disabled?: boolean;
  /** The value of the segmented control item. */
  value: string;
  children?: ReactNode;
}>;
