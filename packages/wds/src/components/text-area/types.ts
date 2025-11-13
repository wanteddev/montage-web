import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type TextAreaDefaultProps = WithSxProps<{
  invalid?: boolean;
  maxLength?: number;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  disabled?: boolean;
  width?: CSSProperties['width'];
  maxRows?: number;
  minRows?: number;
  value?: string;
}>;

export type TextAreaResponsiveProps = ResponsiveProps<
  Pick<TextAreaDefaultProps, 'width'>
>;

export type TextAreaProps = Merge<
  TextAreaDefaultProps,
  TextAreaResponsiveProps
>;

export type TextAreaContentProps = WithSxProps<{
  variant?:
    | 'custom'
    | 'button'
    | 'characterCounter'
    | 'badge'
    | 'chip'
    | 'icon'
    | 'icon-button';
  children?: ReactNode;
}>;
