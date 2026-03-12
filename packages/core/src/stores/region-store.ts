import { createStore as create } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

import { generateId } from './helpers';

import type { TextButton } from '../components';
import type { ComponentProps, ReactNode } from 'react';
import type { StoreApi } from 'zustand';

export type UseRegionStoreAddDuration = number | 'short' | 'long';

export type RegionToastItem = {
  id?: string;
  type: 'toast';
  duration?: UseRegionStoreAddDuration;
  variant?: 'normal' | 'positive' | 'cautionary' | 'negative';
  icon?: ReactNode;
  content: ReactNode;
  onAnimationEnd?: (type: 'hide' | 'show') => void;
};

export type RegionSnackbarItem = {
  id?: string;
  type: 'snackbar';
  duration?: UseRegionStoreAddDuration;
  variant?: 'normal';
  title?: ReactNode;
  description?: ReactNode;
  extraContent?: ReactNode;
  action: ComponentProps<typeof TextButton>;
  closeButton?: boolean;
  onAnimationEnd?: (type: 'hide' | 'show') => void;
};

export type RegionItem = RegionToastItem | RegionSnackbarItem;

export type WithSystemRegionStoreItem<T extends RegionItem> = T & {
  visibility?: 'visible' | 'hidden';
};

export type RegionState = {
  items: Array<WithSystemRegionStoreItem<RegionItem>>;
  config: {
    viewportMaxWidth: string | number;
    viewportBottom: string | number;
  };
};

export type RegionActions = {
  setConfig: (config: Partial<RegionState['config']>) => void;
  add: (item: RegionItem) => void;
  remove: (id: RegionItem['id']) => void;
  removeAll: () => void;
  hide: (id: RegionItem['id']) => void;
  hideAll: () => void;
};

export type RegionStore = RegionState & RegionActions;

export const defaultInitState: RegionState = {
  items: [],
  config: {
    viewportMaxWidth: '1060px',
    viewportBottom: '0px',
  },
};

export const createRegionStore = (
  initState: RegionState = defaultInitState,
) => {
  return create<RegionStore>()((set) => ({
    ...initState,
    add: (item) =>
      set((state) => {
        const id = item.id ?? generateId();

        if (state.items.find((v) => v.id === id)) {
          return state;
        }

        return {
          items: [
            ...state.items,
            {
              ...item,
              visibility: 'visible',
              id,
            },
          ],
        };
      }),
    removeAll: () => set(() => ({ items: [] })),
    remove: (id) =>
      set((state) => ({
        items: state.items.filter(({ id: diffId }) => diffId !== id),
      })),
    hide: (id) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, visibility: 'hidden' } : item,
        ),
      })),
    hideAll: () =>
      set((state) => ({
        items: state.items.map((item) => ({ ...item, visibility: 'hidden' })),
      })),
    setConfig: (config) =>
      set((state) => ({ config: { ...state.config, ...config } })),
  }));
};

export const RegionContext = createContext<StoreApi<RegionStore> | null>(null);

export const useRegionStore = <T>(selector: (store: RegionStore) => T): T => {
  const context = useContext(RegionContext);

  if (!context) {
    throw new Error(`useRegionStore must be use within RegionProvider`);
  }

  return useStore(context, selector);
};
