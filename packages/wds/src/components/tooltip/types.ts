import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type TooltipProps = {
  mode?: 'hover' | 'always';
  variant?: 'normal' | 'inverse';
  position?: PopperContentProps['position'];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
};

export type TooltipContentProps = {
  action?: ReactNode;
  children?: ReactNode;
};
