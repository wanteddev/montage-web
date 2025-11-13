import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TextButtonColor = 'primary' | 'assistive';

export type TextButtonDefaultProps = WithSxProps<{
  color?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: 'small' | 'medium';
  disableInteraction?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
  /**
   * When `loading=true`, the event blocking action is disabled.
   */
  disableLoadingPreventEvents?: boolean;
}>;

export type TextButtonResponsiveProps = ResponsiveProps<
  Pick<TextButtonDefaultProps, 'size'>
>;

export type TextButtonProps = Merge<
  TextButtonDefaultProps,
  TextButtonResponsiveProps
>;
