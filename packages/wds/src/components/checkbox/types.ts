import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type CheckboxDefaultProps = WithSxProps<{
  name?: string;
  /** Whether the checkbox is checked. */
  checked?: boolean;
  /** Whether the checkbox is checked by default. */
  defaultChecked?: boolean;
  /** Callback function when the checked state changes. */
  onCheckedChange?: (state: boolean) => void;
  /** Use this prop to provide a custom check icon. */
  icon?: ReactNode;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Whether the checkbox is required. */
  required?: boolean;
  /** Whether to use bold style for `~ label` element. */
  bold?: boolean;
  /** The size of the checkbox. */
  size?: 'medium' | 'small';
  /** Whether the checkbox is invalid. */
  invalid?: boolean;
  /** Whether the checkbox is indeterminate. */
  indeterminate?: boolean;
  /** Use this prop to provide a custom indeterminate icon. */
  indeterminateIcon?: ReactNode;
  /** If you want to remove the left/right spacing to align items, use this prop. */
  tight?: boolean;
}>;

export type CheckboxResponsiveProps = ResponsiveProps<
  Pick<CheckboxDefaultProps, 'size' | 'bold'>
>;

export type CheckboxProps = Merge<
  CheckboxDefaultProps,
  CheckboxResponsiveProps
>;
