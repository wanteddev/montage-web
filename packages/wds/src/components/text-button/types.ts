import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TextButtonVariant = 'primary' | 'assistive';

export type TextButtonDefaultProps = {
  variant?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: 'small' | 'medium';
  disableInteraction?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
  /**
   * loading=true 일 때 event 막는 동작을 비활성화합니다.
   */
  disableLoadingPreventEvents?: boolean;
};

export type TextButtonResponsiveProps = ResponsiveProps<
  Pick<TextButtonDefaultProps, 'size'>
>;

export type TextButtonProps = Merge<
  TextButtonDefaultProps,
  TextButtonResponsiveProps
>;
