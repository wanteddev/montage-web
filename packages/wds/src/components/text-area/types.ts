import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type TextAreaDefaultProps = {
  invalid?: boolean;
  maxLength?: number;
  rightIcon?: ReactNode;
  disabled?: boolean;
  width?: CSSProperties['width'];
  maxRows?: number;
  minRows?: number;
  value?: string;
};

export type TextAreaResponsiveProps = ResponsiveProps<
  Pick<TextAreaDefaultProps, 'width'>
>;

export type TextAreaProps = Merge<
  TextAreaDefaultProps,
  TextAreaResponsiveProps
>;
