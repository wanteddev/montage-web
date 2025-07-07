import type { TooltipContentProps } from '../tooltip/types';
import type { ReactNode } from 'react';

export type CompactTooltipContentProps = {
  variant?: 'normal' | 'inverse';
  shortcut?: ReactNode;
  offset?: TooltipContentProps['offset'];
  position?: TooltipContentProps['position'];
  container?: TooltipContentProps['container'];
  disablePortal?: TooltipContentProps['disablePortal'];
  /**
   * 요소가 가려질 경우 숨김 처리 합니다.
   */
  referenceHidden?: TooltipContentProps['referenceHidden'];
  /**
   * 요소가 가려질 경우 숨김 처리 할 때 넘치는 offset을 조정합니다.
   */
  referenceHiddenOffsets?: TooltipContentProps['referenceHiddenOffsets'];
  /**
   * floating ui context를 콜백을 통해 가져올 수 있습니다.
   */
  setContext?: TooltipContentProps['setContext'];
  children?: ReactNode;
};
