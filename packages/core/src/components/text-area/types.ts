import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { CSSProperties, ReactNode } from 'react';

export type TextAreaDefaultProps = WithSxProps<{
  /** The status of the text area. `negative` marks the field invalid. */
  status?: 'normal' | 'negative';
  /** The maximum length of the text area. */
  maxLength?: number;
  /** The leading content of the text area. Pass an element wrapped with `TextAreaContent`. */
  leadingContent?: ReactNode;
  /** The trailing content of the text area. Pass an element wrapped with `TextAreaContent`. */
  trailingContent?: ReactNode;
  /** Whether the text area is disabled. */
  disabled?: boolean;
  /** The width of the text area. */
  width?: CSSProperties['width'];
  /** The maximum rows of the text area. */
  maxRows?: number;
  /** The minimum rows of the text area. */
  minRows?: number;
  /** The value of the text area. */
  value?: string;
  /** The size of the text area. */
  size?: 'large' | 'medium';
}>;

export type TextAreaResponsiveProps = ResponsiveProps<
  Pick<TextAreaDefaultProps, 'width' | 'size'>
>;

export type TextAreaProps = Merge<
  TextAreaDefaultProps,
  TextAreaResponsiveProps
>;

export type TextAreaContentProps = WithSxProps<{
  variant?:
    | 'custom'
    | 'button'
    | 'content-badge'
    | 'icon'
    | 'icon-button'
    | 'primary-icon-button'
    | 'segmented-control';
  children?: ReactNode;
}>;
