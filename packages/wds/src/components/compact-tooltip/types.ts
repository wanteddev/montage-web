import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type CompactTooltipProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
};

export type CompactTooltipContentProps = {
  shortcut?: ReactNode;
  position?: PopperContentProps['position'];
};
