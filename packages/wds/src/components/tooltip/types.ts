import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type TooltipProps = {
  mode?: 'hover' | 'always';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  /**
   * mouseenter 이벤트 이후 나타나기까지 딜레이 (ms)
   */
  enterDelay?: number;
  /**
   * mouseleave 이벤트 이후 사라지기까지 딜레이 (ms)
   */
  leaveDelay?: number;
  /**
   * pointdown 이벤트 시 툴팁 닫힘 여부
   */
  disableCloseOnPointDown?: boolean;
  /**
   * focus 이벤트 시 툴팁 열림 여부
   */
  disableOpenOnFocus?: boolean;
};

export type TooltipContentProps = {
  arrow?: boolean;
  action?: ReactNode;
  children?: ReactNode;
  closeButton?: boolean;
  offset?: PopperContentProps['offset'];
  position?: PopperContentProps['position'];
  container?: PopperContentProps['container'];
  disablePortal?: PopperContentProps['disablePortal'];
  animationDuration?: number;
  /**
   * compact tooltip을 위해 사용
   */
  __wdsCustomChildren?: ReactNode;
};
