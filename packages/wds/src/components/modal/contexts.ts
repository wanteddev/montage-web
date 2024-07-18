import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/use-loose-context';

import {
  MODAL_CONTAINER_NAME,
  MODAL_NAME,
  MODAL_NAVIGATION_NAME,
} from './constants';

import type { TransitionStatus } from '../../hooks/use-transition-status';
import type { RefObject } from 'react';
import type { ModalNavigationProps } from './types';

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

type ModalContainerContextValue = {
  scrollHeight: number;
};

export const [ModalContainerProvider, useModalContainerContext] =
  createContext<ModalContainerContextValue>(MODAL_CONTAINER_NAME);

type ModalActionAreaContextValue = {
  sticky: boolean;
  hasScroll: boolean;
};

export const [ModalActionAreaProvider, useModalActionAreaContext] =
  createLooseContext<ModalActionAreaContextValue>(MODAL_CONTAINER_NAME);

type ModalNavigationContextValue = {
  variant: ModalNavigationProps['variant'];
};

export const [ModalNavigationProvider, useModalNavigationContext] =
  createContext<ModalNavigationContextValue>(MODAL_NAVIGATION_NAME);
