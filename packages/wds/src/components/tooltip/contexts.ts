import { createContext } from '@radix-ui/react-context';

import { TOOLTIP_NAME } from './constants';

import type { PointerDownOutsideEvent } from '../dismissable-layer/types';
import type {
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  RefObject,
} from 'react';
import type { TooltipProps } from './types';

type TooltipContextValue = {
  mode: Exclude<TooltipProps['mode'], undefined>;
  containerRef: RefObject<HTMLDivElement>;
  open: boolean;
  containerId: string;
  handleMouseOver: MouseEventHandler<any>;
  handleMouseLeave: MouseEventHandler<any>;
  handleFocus: FocusEventHandler<any>;
  handleBlur: FocusEventHandler<any>;
  handleMouseDown: (event: PointerDownOutsideEvent | MouseEvent<any>) => void;
  handleDismiss: () => void;
};

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContextValue>(TOOLTIP_NAME);
