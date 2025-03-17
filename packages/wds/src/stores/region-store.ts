import { createStore as create } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

import { generateId } from './helpers';

import type { Merge } from '@wanteddev/wds-engine';
import type { TextButton } from '../components';
import type { ComponentProps, ReactNode } from 'react';
import type { StoreApi } from 'zustand';

export type RegionToastItem = {
  id?: string;
  type: 'toast';
  duration?: number;
  variant?: 'normal' | 'positive' | 'cautionary' | 'negative';
  icon?: ReactNode;
  content: ReactNode;
  onAnimationEnd?: (type: 'hide' | 'show') => void;
};

export type RegionSnackbarItem = {
  id?: string;
  type: 'snackbar';
  duration?: number;
  variant?: 'normal';
  title?: ReactNode;
  description?: ReactNode;
  extraContent?: ReactNode;
  action: ComponentProps<typeof TextButton>;
  onAnimationEnd?: (type: 'hide' | 'show') => void;
};

export type RegionItem = RegionToastItem | RegionSnackbarItem;

export type WithRegionSystem<T extends object> = Merge<
  T,
  {
    createdAt: number;
    pausedAt?: number;
    height?: number;
    status: 'visible' | 'hidden';
  }
>;

export type RegionItemWithSystem = WithRegionSystem<RegionItem>;

export type RegionState = {
  items: Array<RegionItemWithSystem>;
  config: {
    viewportMaxWidth: string | number;
    viewportBottom: string | number;
  };
};

export type RegionActions = {
  setConfig: (config: Partial<RegionState['config']>) => void;

  add: (item: RegionItem) => void;
  remove: (id: RegionItemWithSystem['id']) => void;
  removeAll: () => void;
  hide: (id: RegionItemWithSystem['id']) => void;
  pause: (id: RegionItemWithSystem['id']) => void;
  resume: (id: RegionItemWithSystem['id']) => void;
  updateHeight: (
    id: RegionItemWithSystem['id'],
    height: RegionItemWithSystem['height'],
  ) => void;
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
              createdAt: Date.now(),
              ...item,
              id,
              status: 'visible',
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
        items: state.items.map((item) => {
          if (item.id === id) {
            return { ...item, status: 'hidden' };
          }

          return item;
        }),
      })),
    pause: (id) =>
      set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            return { ...item, pausedAt: Date.now() };
          }

          return item;
        }),
      })),
    resume: (id) =>
      set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              pausedAt: undefined,
              duration:
                item.duration! -
                (item.pausedAt ?? Date.now()) -
                item.createdAt +
                // 애니메이션 정지 후 바로 사라지면 어색하기 때문에 1초의 보정 추가
                1000,
            };
          }

          return item;
        }),
      })),

    updateHeight: (id, height) =>
      set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            return { ...item, height };
          }

          return item;
        }),
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
