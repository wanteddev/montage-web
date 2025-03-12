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
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  iconOnly?: boolean;
  children?: ReactNode;
  loading?: boolean;
  /**
   * loading=true 일 때 event 막는 동작을 비활성화합니다.
   */
  disableLoadingPreventEvents?: boolean;
};

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps, 'fullWidth' | 'size'>
>;

export type ButtonProps = Merge<ButtonDefaultProps, ButtonResponsiveProps>;
