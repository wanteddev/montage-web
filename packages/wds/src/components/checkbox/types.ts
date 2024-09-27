import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type CheckboxDefaultProps = {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  bold?: boolean;
  size?: 'normal' | 'small';
  invalid?: boolean;
  indeterminate?: boolean;
  indeterminateIcon?: ReactNode;
  onCheckedChange?: (state: boolean) => void;
};

export type CheckboxResponsiveProps = ResponsiveProps<
  Pick<CheckboxDefaultProps, 'size' | 'bold'>
>;

export type CheckboxProps = Merge<
  CheckboxDefaultProps,
  CheckboxResponsiveProps
>;
