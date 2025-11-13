import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type StepperProps = WithSxProps<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}>;

export type StepperItemProps = WithSxProps<{
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
  children?: ReactNode;
}>;
