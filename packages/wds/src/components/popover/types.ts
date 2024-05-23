import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
};

export type PopoverContentProps = {
  children?: ReactNode;
  position?: PopperContentProps['position'];
  offset?: PopperContentProps['offset'];
  arrow?: boolean;
  /**
   * Portal로 표시될 container를 지정합니다.
   */
  container?: PopperContentProps['container'];
  disablePortal?: PopperContentProps['disablePortal'];
};
