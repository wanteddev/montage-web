import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type TextAreaDefaultProps = {
  invalid?: boolean;
  /**
   * 실제 dom에는 전달 되지 않으며 아래 글자 수를 표시할 때 사용합니다.
   * react-hook-form의 rules와 함께 사용해야합니다.
   */
  maxLength?: number;
  /**
   * 실제 dom에 전달 되는 maxLength 옵션입니다.
   */
  htmlMaxLength?: number;
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
