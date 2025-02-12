import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TextButtonVariant = 'primary' | 'assistive';

export type TextButtonDefaultProps = {
  variant?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: 'small' | 'medium';
  disableInteraction?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
};

export type TextButtonResponsiveProps = ResponsiveProps<
  Pick<TextButtonDefaultProps, 'size'>
>;

export type TextButtonProps = Merge<
  TextButtonDefaultProps,
  TextButtonResponsiveProps
>;
