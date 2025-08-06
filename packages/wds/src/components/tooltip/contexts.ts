import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import { TOOLTIP_GROUP_NAME, TOOLTIP_NAME } from './constants';

import type { PointerDownOutsideEvent } from '../dismissable-layer/types';
import type {
  FocusEventHandler,
  MouseEventHandler,
  MutableRefObject,
  RefObject,
} from 'react';
import type { TooltipProps } from './types';

type TooltipContextValue = {
  mode: Exclude<TooltipProps['mode'], undefined>;
  containerRef: RefObject<HTMLDivElement | null>;
  triggerRef: MutableRefObject<HTMLElement | null>;
  open: boolean;
  containerId: string;
  handleMouseOver: MouseEventHandler<HTMLElement>;
  handleMouseLeave: MouseEventHandler<HTMLElement>;
  handleFocus: FocusEventHandler<HTMLElement>;
  handleBlur: FocusEventHandler<HTMLElement>;
  handleMouseDown: MouseEventHandler<HTMLElement>;
  handleDismiss: () => void;
  handleClick: MouseEventHandler<HTMLElement>;
  handlePointerDownOutside: (e: PointerDownOutsideEvent) => void;
};

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContextValue>(TOOLTIP_NAME);

type TooltipGroupContextValue = {
  onOpen: () => void;
  onClose: () => void;
  isOpenWithoutDelayRef: RefObject<boolean>;
};

export const [TooltipGroupProvider, useTooltipGroupContext] =
  createLooseContext<TooltipGroupContextValue>(TOOLTIP_GROUP_NAME);
