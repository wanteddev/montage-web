import { createContext } from '@radix-ui/react-context';

import { MODAL_ACTION_AREA_NAME, MODAL_NAME } from './constants';

import type { ModalActionAreaProps } from './types';

type ModalContextValue = {
  innerContainerRef: React.RefObject<HTMLDivElement>;
  scrollHeight: number;
  onChangeScrollHeight: (value: number) => void;
  containerId: string;
  titleId: string;
  headingId: string;
  summaryId: string;
  descriptionId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  disableDimmer: boolean;
  disableOutsideClickClose: boolean;
  disableEscapeKeyDownClose: boolean;
};

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>(MODAL_NAME);

type ModalActionAreaContextValue = Pick<ModalActionAreaProps, 'priority'>;

export const [ModalActionAreaProvider, useModalActionAreaContext] =
  createContext<ModalActionAreaContextValue>(MODAL_ACTION_AREA_NAME);
