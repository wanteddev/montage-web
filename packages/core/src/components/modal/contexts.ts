import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import { MODAL_CONTAINER_NAME, MODAL_NAME } from './constants';

import type { RefObject } from 'react';

type ModalContextValue = {
  containerRef: RefObject<HTMLDivElement | null>;
  innerContainer: HTMLDivElement | null;
  setInnerContainer: (innerContainer: HTMLDivElement | null) => void;
  containerId: string;
  titleId: string;
  headingId: string;
  summaryId: string;
  descriptionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isBottomSheet: boolean;
  setIsBottomSheet: (isBottomSheet: boolean) => void;
  visibility: 'hidden' | 'visible';
  setVisibility: (visibility: 'hidden' | 'visible') => void;
};

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>(MODAL_NAME);

type ModalDimmerContextValue = {
  dimmerRef: RefObject<HTMLDivElement | null>;
  isBottomSheetWithHandle: boolean;
  handleVisibilityHidden: () => void;
  disableOutsideClickClose?: boolean;
};

export const [ModalDimmerProvider, useModalDimmerContext] =
  createContext<ModalDimmerContextValue>(MODAL_CONTAINER_NAME);

type ModalNavigationContextValue = {
  titleId: string;
  onOpenChange: (open: boolean) => void;
  sticky: boolean;
};

export const [ModalNavigationProvider, useModalNavigationContext] =
  createContext<ModalNavigationContextValue>(MODAL_CONTAINER_NAME);

type ModalActionAreaContextValue = {
  sticky: boolean;
};

export const [ModalActionAreaProvider, useModalActionAreaContext] =
  createLooseContext<ModalActionAreaContextValue>(MODAL_CONTAINER_NAME);
