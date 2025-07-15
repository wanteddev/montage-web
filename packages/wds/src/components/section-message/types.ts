import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SectionMessageProps = WithSxProps<{
  variant?: 'info' | 'positive' | 'cautionary' | 'negative' | 'custom';
  children?: ReactNode;
  show?: boolean;
  defaultShow?: boolean;
  onShowChange?: (state: boolean) => void;
  /**
   * Displays the close button.
   */
  closeButton?: boolean;
  /**
   * Displays the icon according to the `variant`.
   */
  leadingContent?: ReactNode;
  trailingButton?: ReactNode;
  description?: ReactNode;
  bottomButton?: ReactNode;
}>;
