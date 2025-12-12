import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type StepperProps = WithSxProps<{
  /** The value of the stepper. */
  value?: string;
  /** The default value of the stepper. */
  defaultValue?: string;
  /** Callback function when the value changes. */
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}>;

export type StepperItemProps = WithSxProps<{
  value: string;
  label?: ReactNode;
  completedLabel?: ReactNode;
  children?: ReactNode;
}>;
