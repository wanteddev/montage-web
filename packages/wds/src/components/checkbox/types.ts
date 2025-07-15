import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type CheckboxDefaultProps = WithSxProps<{
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  bold?: boolean;
  size?: 'medium' | 'small';
  invalid?: boolean;
  indeterminate?: boolean;
  indeterminateIcon?: ReactNode;
  onCheckedChange?: (state: boolean) => void;
  tight?: boolean;
}>;

export type CheckboxResponsiveProps = ResponsiveProps<
  Pick<CheckboxDefaultProps, 'size' | 'bold'>
>;

export type CheckboxProps = Merge<
  CheckboxDefaultProps,
  CheckboxResponsiveProps
>;
