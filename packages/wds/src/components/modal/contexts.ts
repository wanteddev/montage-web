import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/use-loose-context';

import { MODAL_CONTAINER_NAME, MODAL_NAME } from './constants';

import type { Dispatch, RefObject, SetStateAction } from 'react';

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
  isBottomSheet: boolean;
  setIsBottomSheet: (isBottomSheet: boolean) => void;
  visibility: 'hidden' | 'visible';
  setVisibility: (visibility: 'hidden' | 'visible') => void;
  wrapperRef: Dispatch<SetStateAction<HTMLElement | null>>;
};

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>(MODAL_NAME);

type ModalDimmerContextValue = {
  dimmerRef: RefObject<HTMLDivElement>;
  isBottomSheetWithHandle: boolean;
  handleVisibilityHidden: () => void;
};

export const [ModalDimmerProvider, useModalDimmerContext] =
  createContext<ModalDimmerContextValue>(MODAL_CONTAINER_NAME);

type ModalNavigationContextValue = {
  scrolled: boolean;
  titleId: string;
  onOpenChange: (open: boolean) => void;
};

export const [ModalNavigationProvider, useModalNavigationContext] =
  createContext<ModalNavigationContextValue>(MODAL_CONTAINER_NAME);

type ModalActionAreaContextValue = {
  sticky: boolean;
};

export const [ModalActionAreaProvider, useModalActionAreaContext] =
  createLooseContext<ModalActionAreaContextValue>(MODAL_CONTAINER_NAME);
