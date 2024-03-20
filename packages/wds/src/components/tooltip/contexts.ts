import { createContext } from '@radix-ui/react-context';

import { TOOLTIP_NAME } from './constants';

import type { FocusEventHandler, MouseEventHandler, RefObject } from 'react';
import type { TooltipProps } from './types';

type TooltipContextValue = {
  mode: Exclude<TooltipProps['mode'], undefined>;
  variant: Exclude<TooltipProps['variant'], undefined>;
  position: Exclude<TooltipProps['position'], undefined>;
  containerRef: RefObject<HTMLDivElement>;
  open: boolean;
  onOpenChange: Exclude<TooltipProps['onOpenChange'], undefined>;
  containerId: string;
  handleMouseOver: MouseEventHandler<any>;
  handleMouseLeave: MouseEventHandler<any>;
  handleFocus: FocusEventHandler<any>;
  handleBlur: FocusEventHandler<any>;
  handleClick: MouseEventHandler<any>;
};

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContextValue>(TOOLTIP_NAME);
