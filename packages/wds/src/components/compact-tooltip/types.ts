import type { TooltipContentProps } from '../tooltip/types';
import type { ReactNode } from 'react';

export type CompactTooltipContentProps = {
  variant?: 'normal' | 'inverse';
  shortcut?: ReactNode;
  offset?: TooltipContentProps['offset'];
  position?: TooltipContentProps['position'];
  container?: TooltipContentProps['container'];
  disablePortal?: TooltipContentProps['disablePortal'];
  animationDuration?: TooltipContentProps['animationDuration'];
};
