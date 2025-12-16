import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TextButtonColor = 'primary' | 'assistive';

export type TextButtonDefaultProps = WithSxProps<{
  color?: 'primary' | 'assistive';
  /** Whether the text button is disabled. */
  disabled?: boolean;
  /** The size of the text button. */
  size?: 'small' | 'medium';
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** The leading content of the text button. */
  leadingContent?: ReactNode;
  /** The trailing content of the text button. */
  trailingContent?: ReactNode;
  /** The children of the text button. */
  children?: ReactNode;
  /** Whether the text button is loading. */
  loading?: boolean;
  /** When `loading=true`, the event blocking action is disabled. */
  disableLoadingPreventEvents?: boolean;
}>;

export type TextButtonResponsiveProps = ResponsiveProps<
  Pick<TextButtonDefaultProps, 'size'>
>;

export type TextButtonProps = Merge<
  TextButtonDefaultProps,
  TextButtonResponsiveProps
>;
