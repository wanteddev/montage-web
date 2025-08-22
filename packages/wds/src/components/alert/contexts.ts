import { createContext } from '@radix-ui/react-context';

import { ALERT_CONTAINER_NAME, ALERT_NAME } from './constants';

type AlertContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  headingId: string;
  descriptionId: string;
  containerId: string;
};

export const [AlertProvider, useAlertContext] =
  createContext<AlertContextType>(ALERT_NAME);

type AlertContainerContextType = {
  disableOutsideClickClose?: boolean;
  onDismiss?: () => void;
};

export const [AlertContainerProvider, useAlertContainerContext] =
  createContext<AlertContainerContextType>(ALERT_CONTAINER_NAME);
