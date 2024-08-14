import type { Merge, ResponsiveProps, SxProp } from '@wanteddev/wds-engine';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type TextInputDefaultProps = {
  invalid?: boolean;
  positive?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

export type TextInputResponsiveProps = ResponsiveProps<
  Pick<TextInputDefaultProps, 'width' | 'height'>
>;

export type TextInputProps = Merge<
  TextInputDefaultProps,
  TextInputResponsiveProps
>;

export type TextInputContentProps = PropsWithChildren<{
  variant?: 'custom' | 'text' | 'timer' | 'badge' | 'icon' | 'icon-button';
  sx?: SxProp;
}>;

export type TextInputButtonProps = {
  variant?: 'normal' | 'assistive';
  disabled?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  position?: 'right' | 'left';
};
