import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import { MODAL_CONTAINER_NAME, MODAL_NAME } from './constants';

import type { RefObject } from 'react';
import type { ModalBottomSheetSnap, ModalNavigationProps } from './types';

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
};

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>(MODAL_NAME);

type ModalDimmerContextValue = {
  dimmerRef: RefObject<HTMLDivElement | null>;
  isBottomSheetWithHandle: boolean;
  collapseToPeekOrClose: () => void;
  disableOutsideClickClose?: boolean;
  snap: ModalBottomSheetSnap;
  largestUndimmedSnap: 'peek' | 'half';
};

export const [ModalDimmerProvider, useModalDimmerContext] =
  createContext<ModalDimmerContextValue>(MODAL_CONTAINER_NAME);

type ModalScrollContainerContextValue = {
  actionAreaSticky: boolean;
  navigationSticky: boolean;
};

export const [ModalScrollContainerProvider, useModalScrollContainerContext] =
  createLooseContext<ModalScrollContainerContextValue>(MODAL_CONTAINER_NAME);

type ModalNavigationContextValue = {
  variant?: ModalNavigationProps['variant'];
};

export const [ModalNavigationProvider, useModalNavigationContext] =
  createContext<ModalNavigationContextValue>(MODAL_CONTAINER_NAME);
