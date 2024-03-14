import { createContext } from '@radix-ui/react-context';

import { POPPER_CONTENT_NAME, POPPER_NAME } from './constants';

import type { Side } from '@floating-ui/react';

type PopperContextValue = {
  anchor: HTMLElement | null;
  onAnchorChange(anchor: HTMLElement | null): void;
};

export const [PopperProvider, usePopperContext] =
  createContext<PopperContextValue>(POPPER_NAME);

type PopperContentContextValue = {
  side: Side;
  onArrowChange(arrow: HTMLSpanElement | null): void;
  arrowX?: number;
  arrowY?: number;
  shouldHideArrow: boolean;
};

export const [PopperContentProvider, usePopperContentContext] =
  createContext<PopperContentContextValue>(POPPER_CONTENT_NAME);
