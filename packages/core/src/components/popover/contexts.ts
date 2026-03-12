import { createScopeContext } from '../../hooks/internal/use-scope-context';

import { POPOVER_NAME } from './constants';

import type { PopoverProps } from './types';

type PopoverContextValue = {
  contentId: string;
  triggerId: string;
  open: boolean;
  onOpenChange: Exclude<PopoverProps['onOpenChange'], undefined>;
};

export const [PopoverProvider, usePopoverContext] =
  createScopeContext<PopoverContextValue>(POPOVER_NAME);
