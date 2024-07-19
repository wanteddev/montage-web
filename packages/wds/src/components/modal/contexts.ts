import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/use-loose-context';

import { MODAL_CONTAINER_NAME, MODAL_NAME } from './constants';

import type { TransitionStatus } from '../../hooks/use-transition-status';
import type { RefObject } from 'react';

type ModalContextValue = {
  containerRef: RefObject<HTMLDivElement>;
  innerContainerRef: RefObject<HTMLDivElement>;
  containerId: string;
  titleId: string;
  headingId: string;
  summaryId: string;
  descriptionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disableOutsideClickClose: boolean;
  disableEscapeKeyDownClose: boolean;
  status?: TransitionStatus;
  setTransitionDuration: (duration: number) => void;
};

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>(MODAL_NAME);

type ModalActionAreaContextValue = {
  sticky: boolean;
  hasScroll: boolean;
};

export const [ModalActionAreaProvider, useModalActionAreaContext] =
  createLooseContext<ModalActionAreaContextValue>(MODAL_CONTAINER_NAME);

type ModalTopNavigationContextValue = {
  scrolled: boolean;
  titleId: string;
  onOpenChange: (open: boolean) => void;
};

export const [ModalTopNavigationProvider, useModalTopNavigationContext] =
  createLooseContext<ModalTopNavigationContextValue>(MODAL_CONTAINER_NAME);
