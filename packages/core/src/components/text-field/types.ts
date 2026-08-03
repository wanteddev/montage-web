import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@montage-ui/engine';
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
  Ref,
} from 'react';

export type TextFieldDefaultProps = WithSxProps<{
  /**
   * The status of the text field.
   * `negative` marks the field invalid, `positive` shows the success indicator.
   */
  status?: 'normal' | 'negative' | 'positive';
  /** The leading content of the text field. Pass an element wrapped with `TextFieldContent`. */
  leadingContent?: ReactNode;
  /** The trailing content of the text field. Pass an element wrapped with `TextFieldContent`. */
  trailingContent?: ReactNode;
  /** The trailing button of the text field. Pass an `TextFieldButton` component. */
  trailingButton?: ReactNode;
  /** Whether the text field is disabled. */
  disabled?: boolean;
  /** The width of the text field. */
  width?: CSSProperties['width'];
  /** The height of the text field. */
  height?: CSSProperties['height'];
  /** Callback function when the reset button is clicked. */
  onReset?: (prevValue: string) => void;
  /** The children of the text field. */
  children?: ReactNode;
  /** The size of the text field. */
  size?: 'large' | 'medium';
  wrapperRef?: Ref<HTMLDivElement>;
}>;

export type TextFieldResponsiveProps = ResponsiveProps<
  Pick<TextFieldDefaultProps, 'width' | 'height' | 'size'>
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
  loading?: boolean;
  /**
   * When `loading=true`, the event blocking action is disabled.
   */
  disableLoadingPreventEvents?: boolean;
  disabled?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>;
