import type { Merge, ResponsiveProps } from '../../types';

type ProgressStepIndicatorDefaultProps = {
  size?: 'small' | 'medium';
  divider?: boolean;
  steps: Array<number>;
  activeStep?: number;
  onStepClick?: (step: number) => void;
};

type ProgressStepIndicatorResponsiveProps = ResponsiveProps<
  Pick<ProgressStepIndicatorDefaultProps, 'size' | 'divider'>
>;

export type ProgressStepIndicatorProps = Merge<
  ProgressStepIndicatorDefaultProps,
  ProgressStepIndicatorResponsiveProps
>;
