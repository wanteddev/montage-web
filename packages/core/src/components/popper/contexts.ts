import { createScopeContext } from '../../hooks/internal/use-scope-context';

import { POPPER_CONTENT_NAME, POPPER_NAME } from './constants';

import type { Side } from '@floating-ui/react';

type PopperContextValue = {
  anchor: HTMLElement | null;
  onAnchorChange(anchor: HTMLElement | null): void;
};

export const [PopperProvider, usePopperContext] =
  createScopeContext<PopperContextValue>(POPPER_NAME);

type PopperContentContextValue = {
  side: Side;
  onArrowChange(arrow: HTMLElement | null): void;
  arrowX?: number;
  arrowY?: number;
};

export const [PopperContentProvider, usePopperContentContext] =
  createScopeContext<PopperContentContextValue>(POPPER_CONTENT_NAME);
