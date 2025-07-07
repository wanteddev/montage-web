import type { FocusScopeProps } from '../focus-scope/types';
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
  /**
   * 요소가 가려질 경우 숨김 처리 합니다.
   */
  referenceHidden?: PopperContentProps['referenceHidden'];
  /**
   * 요소가 가려질 경우 숨김 처리 할 때 넘치는 offset을 조정합니다.
   */
  referenceHiddenOffsets?: PopperContentProps['referenceHiddenOffsets'];
  /**
   * floating ui context를 콜백을 통해 가져올 수 있습니다.
   */
  setContext?: PopperContentProps['setContext'];
  arrow?: boolean;
  /**
   * Portal로 표시될 container를 지정합니다.
   */
  container?: PopperContentProps['container'];
  disablePortal?: PopperContentProps['disablePortal'];
  wrapperProps?: PopperContentProps['wrapperProps'];
  forceMount?: boolean;
} & Pick<
  FocusScopeProps,
  | 'trappedContent'
  | 'onMountAutoFocus'
  | 'onUnmountAutoFocus'
  | 'trapped'
  | 'loop'
>;
