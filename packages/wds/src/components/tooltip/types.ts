import type { PropsWithChildren, ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type TooltipGroupProps = PropsWithChildren<{
  skipDelayDuration?: number;
}>;

export type TooltipProps = {
  mode?: 'hover' | 'always' | 'click';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  /**
   * mode="hover" 일 때 mouseenter 이벤트 이후 나타나기까지 딜레이 (ms)
   */
  enterDelay?: number;
  /**
   * mode="hover" 일 때 mouseleave 이벤트 이후 사라지기까지 딜레이 (ms)
   */
  leaveDelay?: number;
  /**
   * mode="hover" 일 때 pointdown 이벤트 시 툴팁 닫힘 여부
   */
  disableCloseOnPointDown?: boolean;
  /**
   * mode="hover" 일 때 focus 이벤트 시 툴팁 열림 여부
   */
  disableOpenOnFocus?: boolean;
  /**
   * mode="hover" 일 때 focus 이벤트가 아닌
   * focus-visible 일 때만 툴팁 열림 여부
   */
  enableOpenOnFocusVisibleOnly?: boolean;
  children?: ReactNode;
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
  /**
   * 요소가 가려질 경우 숨김 처리 합니다.
   */
  referenceHidden?: PopperContentProps['referenceHidden'];
  /**
   * floating ui context를 콜백을 통해 가져올 수 있습니다.
   */
  /**
   * 요소가 가려질 경우 숨김 처리 할 때 넘치는 offset을 조정합니다.
   */
  referenceHiddenOffsets?: PopperContentProps['referenceHiddenOffsets'];
  setContext?: PopperContentProps['setContext'];
  animationDuration?: number;
  /**
   * compact tooltip을 위해 사용
   */
  __wdsCustomChildren?: ReactNode;
};
