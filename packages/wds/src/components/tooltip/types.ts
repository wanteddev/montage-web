import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type TooltipProps = {
  mode?: 'hover' | 'always';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
};

export type TooltipContentProps = {
  arrow?: boolean;
  action?: ReactNode;
  children?: ReactNode;
  variant?: 'normal' | 'inverse' | 'accent';
  position?: PopperContentProps['position'];
};
