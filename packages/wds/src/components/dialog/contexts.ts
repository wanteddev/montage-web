import { createContext } from '@radix-ui/react-context';

import { DIALOG_CONTAINER_NAME, DIALOG_NAME } from './constants';

type DialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  headingId: string;
  descriptionId: string;
  containerId: string;
};

export const [DialogProvider, useDialogContext] =
  createContext<DialogContextType>(DIALOG_NAME);

type DialogContainerContextType = {
  disableOutsideClickClose?: boolean;
  onDismiss?: () => void;
};

export const [DialogContainerProvider, useDialogContainerContext] =
  createContext<DialogContainerContextType>(DIALOG_CONTAINER_NAME);
