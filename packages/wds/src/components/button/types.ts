import type { Merge, ResponsiveProps } from '../../types';
import type { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outlined';

export type ButtonColor = 'primary' | 'secondary' | 'assistive';

export type ButtonDefaultProps<T extends ButtonVariant = 'solid'> = {
  size?: 'small' | 'medium' | 'large';
  variant?: T;
  color?: T extends 'solid'
    ? Exclude<ButtonColor, 'secondary' | 'assistive'>
    : ButtonColor;
  disabled?: boolean;
  disableInteraction?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps<ButtonVariant>, 'fullWidth' | 'size'>
>;

export type ButtonProps<T extends ButtonVariant = 'solid'> = Merge<
  ButtonDefaultProps<T>,
  ButtonResponsiveProps
>;
