import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type CompactTooltipContentProps = {
  shortcut?: ReactNode;
  position?: PopperContentProps['position'];
};
