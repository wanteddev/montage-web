import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type CompactTooltipContentProps = {
  shortcut?: ReactNode;
  offset?: PopperContentProps['offset'];
  position?: PopperContentProps['position'];
  container?: PopperContentProps['container'];
  disablePortal?: PopperContentProps['disablePortal'];
};
