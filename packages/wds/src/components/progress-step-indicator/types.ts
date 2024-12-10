import type { ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

type ProgressStepIndicatorDefaultProps = {
  size?: 'small' | 'medium';
  divider?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

type ProgressStepIndicatorResponsiveProps = ResponsiveProps<
  Pick<ProgressStepIndicatorDefaultProps, 'size' | 'divider'>
>;

export type ProgressStepIndicatorProps = Merge<
  ProgressStepIndicatorDefaultProps,
  ProgressStepIndicatorResponsiveProps
>;

export type ProgressStepIndicatorItemProps = {
  value: string;
  children?: ReactNode;
};
