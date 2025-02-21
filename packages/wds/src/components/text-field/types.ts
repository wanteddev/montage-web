import type {
  Merge,
  ResponsiveProps,
  SxProp,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  Ref,
} from 'react';

export type TextFieldDefaultProps = {
  invalid?: boolean;
  positive?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  onReset?: (prevValue: string) => void;
  children?: ReactNode;
  wrapperRef?: Ref<HTMLDivElement>;
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
  color?: ThemeColorsToken;
  sx?: SxProp;
}>;

export type TextFieldButtonProps = {
  variant?: 'normal' | 'assistive';
  loading?: boolean;
  /**
   * loading=true 일 때 event 막는 동작을 비활성화합니다.
   */
  disableLoadingPreventEvents?: boolean;
  disabled?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  position?: 'right' | 'left';
  children?: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};
