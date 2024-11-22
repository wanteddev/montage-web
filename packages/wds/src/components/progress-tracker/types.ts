import type { ReactNode } from 'react';

export type ProgressTrackerProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
};

export type ProgressTrackerItemProps = {
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
};
