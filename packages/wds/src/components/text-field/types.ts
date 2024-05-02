import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type TextFieldDefaultProps = {
  invalid?: boolean;
  rightIcon?: ReactNode;
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
