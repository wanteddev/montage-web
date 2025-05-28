import { createContext } from '@radix-ui/react-context';

import { DIALOG_NAME } from './constants';

type DialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  headingId: string;
  descriptionId: string;
};

export const [DialogProvider, useDialogContext] =
  createContext<DialogContextType>(DIALOG_NAME);
