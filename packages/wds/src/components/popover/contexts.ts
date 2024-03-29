import { createContext } from '@radix-ui/react-context';

import { POPOVER_NAME } from './constants';

import type { PopoverProps } from './types';

type PopoverContextValue = {
  contentId: string;
  triggerId: string;
  open: boolean;
  onOpenChange: Exclude<PopoverProps['onOpenChange'], undefined>;
};

export const [PopoverProvider, usePopoverContext] =
  createContext<PopoverContextValue>(POPOVER_NAME);
