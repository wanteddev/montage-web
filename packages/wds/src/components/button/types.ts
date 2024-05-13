import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outlined';

export type ButtonColor = 'primary' | 'secondary' | 'assistive';

export type ButtonDefaultProps = {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  disableInteraction?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps, 'fullWidth' | 'size'>
>;

export type ButtonUnionProps =
  | (ButtonDefaultProps & {
      variant: 'outlined';
      color?: ButtonColor;
    })
  | (ButtonDefaultProps & {
      variant?: 'solid';
      color?: 'primary';
    });

export type ButtonProps = Merge<ButtonUnionProps, ButtonResponsiveProps>;
