import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type ProgressStepIndicatorDefaultProps = WithSxProps<{
  /** The size of the progress step indicator. */
  size?: 'small' | 'medium';
  /** Whether to show the divider. */
  divider?: boolean;
  /** The value of the progress step indicator. */
  value?: string;
  /** The default value of the progress step indicator. */
  defaultValue?: string;
  /** Callback function when the value changes. */
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
