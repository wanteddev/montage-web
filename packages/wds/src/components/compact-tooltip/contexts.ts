import { createContext } from '@radix-ui/react-context';

import { COMPACT_TOOLTIP_NAME } from './constants';

import type {
  FocusEventHandler,
  MouseEventHandler,
  MutableRefObject,
  RefObject,
} from 'react';
import type { CompactTooltipProps } from './types';

type CompactTooltipContextValue = {
  isDismissed: MutableRefObject<boolean>;
  containerRef: RefObject<HTMLDivElement>;
  open: boolean;
  onOpenChange: Exclude<CompactTooltipProps['onOpenChange'], undefined>;
  containerId: string;
  handleMouseOver: MouseEventHandler<any>;
  handleMouseLeave: MouseEventHandler<any>;
  handleFocus: FocusEventHandler<any>;
  handleBlur: FocusEventHandler<any>;
  handleMouseDown: MouseEventHandler<any>;
};

export const [CompactTooltipProvider, useCompactTooltipContext] =
  createContext<CompactTooltipContextValue>(COMPACT_TOOLTIP_NAME);
