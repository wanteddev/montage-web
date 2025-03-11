import type { Merge, ResponsiveProps, SxProp } from '@wanteddev/wds-engine';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type TextAreaDefaultProps = {
  invalid?: boolean;
  maxLength?: number;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
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
