import type { WithSxProps } from '@wanteddev/wds-engine';
import type { TooltipContentProps } from '../tooltip/types';
import type { ReactNode } from 'react';

export type CompactTooltipContentProps = WithSxProps<{
  variant?: 'normal' | 'inverse';
  shortcut?: ReactNode;
  offset?: TooltipContentProps['offset'];
  position?: TooltipContentProps['position'];
  container?: TooltipContentProps['container'];
  disablePortal?: TooltipContentProps['disablePortal'];
  /**
   * When the element is hidden, it is hidden.
   */
  referenceHidden?: TooltipContentProps['referenceHidden'];
  /**
   * When the element is hidden, the offset is adjusted.
   */
  referenceHiddenOffsets?: TooltipContentProps['referenceHiddenOffsets'];
  /**
   * The floating ui context can be obtained through a callback.
   */
  setContext?: TooltipContentProps['setContext'];
  children?: ReactNode;
}>;
