import { createStore as create } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

import { generateId } from './helpers';

import type { SxProp } from '@wanteddev/wds-engine';
import type { StoreApi } from 'zustand';
import type { ReactNode } from 'react';

export type AlertReturnType = 'cancel' | 'confirm';

export type AlertItem = {
  id: string;
  title?: ReactNode;
  content: ReactNode;
  direction?: 'normal' | 'reverse';
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
  resolve: (value: AlertReturnType | PromiseLike<AlertReturnType>) => void;
  confirm: ReactNode;
  cancel?: ReactNode;
  sx?: SxProp;
};

export type AlertState = {
  items: Array<AlertItem>;
};

export type AlertActions = {
  show: (item: Omit<AlertItem, 'id'>) => void;
  hide: (id: AlertItem['id']) => void;
};

export type AlertStore = AlertState & AlertActions;

export const defaultInitState: AlertState = {
  items: [],
};

export const createAlertStore = (initState: AlertState = defaultInitState) => {
  return create<AlertStore>()((set) => ({
    ...initState,
    show: (item) =>
      set((state) => ({
        items: [
          ...state.items,
          {
            id: generateId(),
            ...item,
          },
        ],
      })),
    hide: (id) =>
      set((state) => ({
        items: state.items.filter(({ id: diffId }) => diffId !== id),
      })),
  }));
};

export const AlertContext = createContext<StoreApi<AlertStore> | null>(null);

export const useAlertStore = <T>(selector: (store: AlertStore) => T): T => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(`useAlertStore must be use within AlertProvider`);
  }

  return useStore(context, selector);
};
