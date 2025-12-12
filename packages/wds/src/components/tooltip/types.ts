import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { SlotProps } from '@radix-ui/react-slot';
import type { DismissableLayerProps } from '@radix-ui/react-dismissable-layer';
import type { PropsWithChildren, ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type TooltipGroupProps = PropsWithChildren<{
  /** The skip delay duration of the tooltip group. */
  skipDelayDuration?: number;
}>;

export type TooltipProps = {
  /** The mode of the tooltip. */
  mode?: 'hover' | 'always' | 'click';
  /** Whether the tooltip is open. */
  open?: boolean;
  /** Whether the tooltip is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (state: boolean) => void;
  /** When `mode="hover"`, the delay (ms) until the mouseenter event appears. */
  enterDelay?: number;
  /** When `mode="hover"`, the delay (ms) until the mouseleave event disappears. */
  leaveDelay?: number;
  /** When `mode="hover"`, whether the tooltip closes when the pointdown event occurs. */
  disableCloseOnPointDown?: boolean;
  /** When `mode="hover"`, whether the tooltip opens when the focus event occurs. */
  disableOpenOnFocus?: boolean;
  /** When `mode="hover"`, whether the tooltip opens when the focus-visible event occurs. */
  enableOpenOnFocusVisibleOnly?: boolean;
  children?: ReactNode;
};

export type TooltipTriggerProps = SlotProps;

type TooltipDefaultProps = WithSxProps<{
  children?: ReactNode;
  /**
   * @deprecated
   * tooltip should not have a focusable element.
   */
  action?: ReactNode;
  /**
   * @deprecated
   * tooltip should not have a focusable element.
   */
  closeButton?: boolean;
  /** The offset of the tooltip. */
  offset?: PopperContentProps['offset'];
  /** The position of the tooltip. */
  position?: PopperContentProps['position'];
  /** The container of the tooltip. */
  container?: PopperContentProps['container'];
  /** Whether to disable the portal. */
  disablePortal?: PopperContentProps['disablePortal'];
  /** When the element is hidden, it is hidden. */
  referenceHidden?: PopperContentProps['referenceHidden'];
  /** When the element is hidden, the offset is adjusted. */
  referenceHiddenOffsets?: PopperContentProps['referenceHiddenOffsets'];
  /** The floating ui context can be obtained through a callback. */
  setContext?: PopperContentProps['setContext'];
  /** Whether to force mount the tooltip. */
  forceMount?: boolean;
  /** The size of the tooltip. */
  size?: 'small' | 'medium';
  /** The shortcut of the tooltip. For example, "⌘C". */
  shortcut?: ReactNode;
}>;

type TooltipResponsiveProps = ResponsiveProps<
  Pick<TooltipDefaultProps, 'size'>
>;

export type TooltipContentProps = Merge<
  TooltipDefaultProps,
  TooltipResponsiveProps
>;

export type TooltipContentWrapperProps = {
  isAlways?: boolean;
  children?: ReactNode;
} & Pick<
  DismissableLayerProps,
  'onPointerDownOutside' | 'onDismiss' | 'onFocusOutside'
>;
