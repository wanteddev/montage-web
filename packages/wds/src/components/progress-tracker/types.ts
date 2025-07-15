import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ProgressTrackerProps = WithSxProps<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  children?: ReactNode;
}>;

export type ProgressTrackerItemProps = WithSxProps<{
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
  children?: ReactNode;
  /**
   * Only when `direction='vertical'`.
   */
  labelContent?: ReactNode;
}>;

export type ProgressTrackerLabelContentProps = WithSxProps<{
  variant?: 'badge' | 'caption' | 'custom';
  children?: ReactNode;
}>;
