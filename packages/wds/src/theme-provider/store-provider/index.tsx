import { useRef } from 'react';
import { type StoreApi } from 'zustand';

import { AlertContext, createAlertStore } from '../../stores/alert-store';
import { RegionContext, createRegionStore } from '../../stores/region-store';

import RegionArea from './region';
import AlertArea from './alert';

import type { PropsWithChildren } from 'react';
import type { AlertStore } from '../../stores/alert-store';
import type { RegionStore } from '../../stores/region-store';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const regionStoreRef = useRef<StoreApi<RegionStore> | undefined>(undefined);
  const dialogStoreRef = useRef<StoreApi<AlertStore> | undefined>(undefined);

  if (!regionStoreRef.current) {
    regionStoreRef.current = createRegionStore();
  }

  if (!dialogStoreRef.current) {
    dialogStoreRef.current = createAlertStore();
  }

  return (
    <AlertContext.Provider value={dialogStoreRef.current}>
      <RegionContext.Provider value={regionStoreRef.current}>
        {children}

        <RegionArea />
        <AlertArea />
      </RegionContext.Provider>
    </AlertContext.Provider>
  );
};

export default StoreProvider;
