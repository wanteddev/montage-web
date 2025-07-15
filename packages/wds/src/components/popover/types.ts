import type { WithSxProps } from '@wanteddev/wds-engine';
import type { SlotProps } from '@radix-ui/react-slot';
import type { FocusScopeProps } from '../focus-scope/types';
import type { ReactNode } from 'react';
import type { PopperContentProps } from '../popper/types';

export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  children?: ReactNode;
};

export type PopoverTriggerProps = SlotProps;

export type PopoverContentProps = WithSxProps<{
  children?: ReactNode;
  position?: PopperContentProps['position'];
  offset?: PopperContentProps['offset'];
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
  arrow?: boolean;
  /**
   * Specifies the container to be displayed by Portal.
   */
  container?: PopperContentProps['container'];
  disablePortal?: PopperContentProps['disablePortal'];
  wrapperProps?: PopperContentProps['wrapperProps'];
  forceMount?: boolean;
}> &
  Pick<
    FocusScopeProps,
    | 'trappedContent'
    | 'onMountAutoFocus'
    | 'onUnmountAutoFocus'
    | 'trapped'
    | 'loop'
  >;
