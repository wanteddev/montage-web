import { createContext } from '@radix-ui/react-context';

import { ALERT_CONTAINER_NAME, ALERT_NAME } from './constants';

import type { RefObject } from 'react';

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
  dimmerRef: RefObject<HTMLDivElement | null>;
};

export const [AlertContainerProvider, useAlertContainerContext] =
  createContext<AlertContainerContextType>(ALERT_CONTAINER_NAME);
