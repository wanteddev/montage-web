import type { ReactNode } from 'react';

export type ProgressTrackerDesktopProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type ProgressTrackerDesktopItemProps = {
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
};
