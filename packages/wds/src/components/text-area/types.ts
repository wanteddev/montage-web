import type { Merge, ResponsiveProps, SxProp } from '@wanteddev/wds-engine';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type TextAreaDefaultProps = {
  invalid?: boolean;
  /**
   * 실제 dom에는 전달 되지 않으며 아래 글자 수를 표시할 때 사용합니다.
   */
  maxLength?: number;
  /**
   * 실제 dom에 전달 되는 maxLength 옵션입니다.
   */
  htmlMaxLength?: number;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
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

export type TextAreaContentProps = PropsWithChildren<{
  variant?:
    | 'custom'
    | 'button'
    | 'characterCounter'
    | 'badge'
    | 'chip'
    | 'icon'
    | 'icon-button';
  sx?: SxProp;
}>;
