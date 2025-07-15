import type { WithSxProps } from '@wanteddev/wds-engine';
import type { SlotProps } from '@radix-ui/react-slot';
import type { DismissableLayerProps } from '@radix-ui/react-dismissable-layer';
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
   * When `mode="hover"`, the delay (ms) until the mouseenter event appears.
   */
  enterDelay?: number;
  /**
   * When `mode="hover"`, the delay (ms) until the mouseleave event disappears.
   */
  leaveDelay?: number;
  /**
   * When `mode="hover"`, whether the tooltip closes when the pointdown event occurs.
   */
  disableCloseOnPointDown?: boolean;
  /**
   * When `mode="hover"`, whether the tooltip opens when the focus event occurs.
   */
  disableOpenOnFocus?: boolean;
  /**
   * When `mode="hover"`, whether the tooltip opens when the focus-visible event occurs.
   */
  enableOpenOnFocusVisibleOnly?: boolean;
  children?: ReactNode;
};

export type TooltipTriggerProps = SlotProps;

export type TooltipContentProps = WithSxProps<{
  arrow?: boolean;
  action?: ReactNode;
  children?: ReactNode;
  closeButton?: boolean;
  offset?: PopperContentProps['offset'];
  position?: PopperContentProps['position'];
  container?: PopperContentProps['container'];
  disablePortal?: PopperContentProps['disablePortal'];
  /**
   * When the element is hidden, it is hidden.
   */
  referenceHidden?: PopperContentProps['referenceHidden'];
  /**
   * When the element is hidden, the offset is adjusted.
   */
  referenceHiddenOffsets?: PopperContentProps['referenceHiddenOffsets'];
  /**
   * The floating ui context can be obtained through a callback.
   */
  setContext?: PopperContentProps['setContext'];
  forceMount?: boolean;
  /**
   * Used for compact tooltip.
   */
  __wdsCustomChildren?: ReactNode;
}>;

export type TooltipContentWrapperProps = {
  isAlways?: boolean;
  children?: ReactNode;
} & Pick<
  DismissableLayerProps,
  'onPointerDownOutside' | 'onDismiss' | 'onFocusOutside'
>;
