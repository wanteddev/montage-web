import type { Merge, ResponsiveProps, SxProp } from '@wanteddev/wds-engine';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type TextFieldDefaultProps = {
  invalid?: boolean;
  positive?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

export type TextFieldResponsiveProps = ResponsiveProps<
  Pick<TextFieldDefaultProps, 'width' | 'height'>
>;

export type TextFieldProps = Merge<
  TextFieldDefaultProps,
  TextFieldResponsiveProps
>;

export type TextFieldContentProps = PropsWithChildren<{
  variant?: 'custom' | 'text' | 'timer' | 'badge' | 'icon' | 'icon-button';
  sx?: SxProp;
}>;

export type TextFieldButtonProps = {
  variant?: 'normal' | 'assistive';
  disabled?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  position?: 'right' | 'left';
};
