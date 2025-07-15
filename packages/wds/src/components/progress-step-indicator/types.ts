import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type ProgressStepIndicatorDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  divider?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}>;

type ProgressStepIndicatorResponsiveProps = ResponsiveProps<
  Pick<ProgressStepIndicatorDefaultProps, 'size' | 'divider'>
>;

/**
 * @deprecated
 */
export type ProgressStepIndicatorProps = Merge<
  ProgressStepIndicatorDefaultProps,
  ProgressStepIndicatorResponsiveProps
>;

/**
 * @deprecated
 */
export type ProgressStepIndicatorItemProps = WithSxProps<{
  value: string;
  children?: ReactNode;
}>;
