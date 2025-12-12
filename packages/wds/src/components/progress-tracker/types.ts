import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ProgressTrackerProps = WithSxProps<{
  /** The value of the progress tracker. */
  value?: string;
  /** The default value of the progress tracker. */
  defaultValue?: string;
  /** Callback function when the value changes. */
  onValueChange?: (value: string) => void;
  /** The direction of the progress tracker. */
  direction?: 'horizontal' | 'vertical';
  /** The children of the progress tracker. Pass an element `ProgressTrackerItem`. */
  children?: ReactNode;
}>;

export type ProgressTrackerItemProps = WithSxProps<{
  /** The value of the progress tracker item. */
  value: string;
  /** The label of the progress tracker item. */
  label?: ReactNode;
  /** The completed label of the progress tracker item. */
  completedLabel?: ReactNode;
  /** The children of the progress tracker item. */
  children?: ReactNode;
  /**
   * Only when `direction='vertical'`.
   * The content of the label area. Pass an element `ProgressTrackerLabelContent`.
   */
  labelContent?: ReactNode;
}>;

export type ProgressTrackerLabelContentProps = WithSxProps<{
  variant?: 'badge' | 'caption' | 'custom';
  children?: ReactNode;
}>;
