import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ProgressTrackerDesktopProps = WithSxProps<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}>;

export type ProgressTrackerDesktopItemProps = WithSxProps<{
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
  children?: ReactNode;
}>;
