import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SectionMessageProps = WithSxProps<{
  variant?: 'info' | 'positive' | 'cautionary' | 'negative' | 'custom';
  /** The content of the section message. */
  children?: ReactNode;
  /** Whether the section message is open. */
  open?: boolean;
  /** Whether the section message is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (state: boolean) => void;
  /** Whether to display the close button. */
  closeButton?: boolean;
  /** The icon of the section message. */
  leadingContent?: ReactNode;
  /** The trailing button of the section message. */
  trailingButton?: ReactNode;
  /** The description of the section message. */
  description?: ReactNode;
  /** The bottom button of the section message. */
  bottomButton?: ReactNode;
}>;
