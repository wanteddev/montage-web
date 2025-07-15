import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
  Ref,
} from 'react';

export type TextFieldDefaultProps = WithSxProps<{
  invalid?: boolean;
  positive?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  onReset?: (prevValue: string) => void;
  children?: ReactNode;
  wrapperRef?: Ref<HTMLDivElement>;
}>;

export type TextFieldResponsiveProps = ResponsiveProps<
  Pick<TextFieldDefaultProps, 'width' | 'height'>
>;

export type TextFieldProps = Merge<
  TextFieldDefaultProps,
  TextFieldResponsiveProps
>;

export type TextFieldContentProps = WithSxProps<{
  variant?: 'custom' | 'text' | 'timer' | 'badge' | 'icon' | 'icon-button';
  color?: ThemeColorsToken;
  children?: ReactNode;
}>;

export type TextFieldButtonProps = WithSxProps<{
  variant?: 'normal' | 'assistive';
  loading?: boolean;
  /**
   * When `loading=true`, the event blocking action is disabled.
   */
  disableLoadingPreventEvents?: boolean;
  disabled?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  position?: 'right' | 'left';
  children?: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>;
