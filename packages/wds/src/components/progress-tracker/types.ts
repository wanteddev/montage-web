import type { ReactNode } from 'react';

export type ProgressTrackerProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  children?: ReactNode;
};

export type ProgressTrackerItemProps = {
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
  children?: ReactNode;
};
