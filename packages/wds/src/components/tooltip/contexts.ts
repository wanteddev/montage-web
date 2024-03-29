import { createContext } from '@radix-ui/react-context';

import { TOOLTIP_NAME } from './constants';

import type {
  FocusEventHandler,
  MouseEventHandler,
  MutableRefObject,
  RefObject,
} from 'react';
import type { TooltipProps } from './types';

type TooltipContextValue = {
  isDismissed: MutableRefObject<boolean>;
  mode: Exclude<TooltipProps['mode'], undefined>;
  containerRef: RefObject<HTMLDivElement>;
  open: boolean;
  onOpenChange: Exclude<TooltipProps['onOpenChange'], undefined>;
  containerId: string;
  handleMouseOver: MouseEventHandler<any>;
  handleMouseLeave: MouseEventHandler<any>;
  handleFocus: FocusEventHandler<any>;
  handleBlur: FocusEventHandler<any>;
  handleMouseDown: MouseEventHandler<any>;
};

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContextValue>(TOOLTIP_NAME);
