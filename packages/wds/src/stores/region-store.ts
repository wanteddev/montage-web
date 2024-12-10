import { createStore as create } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

import { generateId } from './helpers';

import type { TextButton } from '../components';
import type { ComponentProps, ReactNode } from 'react';
import type { StoreApi } from 'zustand';

export type RegionToastItem = {
  id?: string;
  type: 'toast';
  duration?: number;
  variant?: 'normal' | 'success' | 'warning' | 'custom';
  icon?: ReactNode;
  content: ReactNode;
  onAnimationEnd?: (type: 'hide' | 'show') => void;
};

export type RegionSnackbarItem = {
  id?: string;
  type: 'snackbar';
  duration?: number;
  variant?: 'normal';
  heading?: ReactNode;
  description?: ReactNode;
  extraContent?: ReactNode;
  action: ComponentProps<typeof TextButton>;
  onAnimationEnd?: (type: 'hide' | 'show') => void;
};

export type RegionItem = RegionToastItem | RegionSnackbarItem;

export type RegionState = {
  items: Array<RegionItem>;
  config: {
    viewportMaxWidth: string | number;
    viewportTop: string | number;
    viewportBottom: string | number;
  };
};

export type RegionActions = {
  show: (item: RegionItem) => void;
  hide: (id: RegionItem['id']) => void;
  hideAll: () => void;
  setConfig: (config: Partial<RegionState['config']>) => void;
};

export type RegionStore = RegionState & RegionActions;

export const defaultInitState: RegionState = {
  items: [],
  config: {
    viewportMaxWidth: '1060px',
    viewportTop: '60px',
    viewportBottom: '0px',
  },
};

export const createRegionStore = (
  initState: RegionState = defaultInitState,
) => {
  return create<RegionStore>()((set) => ({
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
    hideAll: () => set(() => ({ items: [] })),
    hide: (id) =>
      set((state) => ({
        items: state.items.filter(({ id: diffId }) => diffId !== id),
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
