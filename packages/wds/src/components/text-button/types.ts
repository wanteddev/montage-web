import type { Merge, ResponsiveProps } from '../../types';
import type { ReactNode } from 'react';

export type TextButtonDefaultProps = {
  variant?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: 'small' | 'medium';
  disableInteraction?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type TextButtonResponsiveProps = ResponsiveProps<
  Pick<TextButtonDefaultProps, 'size'>
>;

export type TextButtonProps = Merge<
  TextButtonDefaultProps,
  TextButtonResponsiveProps
>;
