import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outlined';

export type ButtonColor = 'primary' | 'assistive';

export type ButtonDefaultProps = WithSxProps<{
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  disableInteraction?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  fullWidth?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  iconOnly?: boolean;
  children?: ReactNode;
  loading?: boolean;
  /**
   * When `loading=true`, the event blocking action is disabled.
   */
  disableLoadingPreventEvents?: boolean;
}>;

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps, 'fullWidth' | 'size'>
>;

export type ButtonProps = Merge<ButtonDefaultProps, ButtonResponsiveProps>;
