import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outlined';

export type ButtonColor = 'primary' | 'secondary' | 'assistive';

export type ButtonDefaultProps = {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  disableInteraction?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
};

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps, 'fullWidth' | 'size'>
>;

export type ButtonProps = Merge<ButtonDefaultProps, ButtonResponsiveProps>;
