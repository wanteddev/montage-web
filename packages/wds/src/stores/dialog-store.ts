import { createStore } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

import { generateId } from './helpers';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { StoreApi } from 'zustand';

export type DialogReturnType = 'cancel' | 'confirm';

export type DialogItem = {
  id: string;
  title?: string;
  content: string;
  confirmText: string;
  cancelText?: string;
  confirmColor?: ThemeColorsToken;
  focusTrap?: 'confirm' | 'cancel';
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
  resolve: (value: DialogReturnType | PromiseLike<DialogReturnType>) => void;
};

export type DialogState = {
  items: Array<DialogItem>;
};

export type DialogActions = {
  show: (item: Omit<DialogItem, 'id'>) => void;
  hide: (id: DialogItem['id']) => void;
};

export type DialogStore = DialogState & DialogActions;

export const defaultInitState: DialogState = {
  items: [],
};

export const createDialogStore = (
  initState: DialogState = defaultInitState,
) => {
  return createStore<DialogStore>()((set) => ({
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

export const DialogContext = createContext<StoreApi<DialogStore> | null>(null);

export const useDialogStore = <T>(selector: (store: DialogStore) => T): T => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(`useDialogStore must be use within DialogProvider`);
  }

  return useStore(context, selector);
};
