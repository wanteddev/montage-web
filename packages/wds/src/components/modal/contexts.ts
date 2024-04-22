import { createContext } from '@radix-ui/react-context';

import {
  MODAL_ACTION_AREA_NAME,
  MODAL_CONTAINER_NAME,
  MODAL_NAME,
} from './constants';

import type { RefObject } from 'react';
import type { ModalActionAreaProps } from './types';

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
  disableDimmer: boolean;
  disableOutsideClickClose: boolean;
  disableEscapeKeyDownClose: boolean;
};

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>(MODAL_NAME);

type ModalContainerContextValue = {
  handleClose: () => void;
  scrollHeight: number;
  sticky: boolean;
  hasScroll: boolean;
};

export const [ModalContainerProvider, useModalContainerContext] =
  createContext<ModalContainerContextValue>(MODAL_CONTAINER_NAME);

type ModalActionAreaContextValue = Pick<ModalActionAreaProps, 'priority'>;

export const [ModalActionAreaProvider, useModalActionAreaContext] =
  createContext<ModalActionAreaContextValue>(MODAL_ACTION_AREA_NAME);
