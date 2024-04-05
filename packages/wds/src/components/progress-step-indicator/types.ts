import type { Merge, ResponsiveProps } from '../../types';

type ProgressStepIndicatorDefaultProps = {
  size?: 'small' | 'medium';
  divider?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
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
};
