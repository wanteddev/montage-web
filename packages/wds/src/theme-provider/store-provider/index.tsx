import { useRef } from 'react';
import { type StoreApi } from 'zustand';

import { DialogContext, createDialogStore } from '../../stores/dialog-store';
import { RegionContext, createRegionStore } from '../../stores/region-store';

import RegionArea from './region';
import DialogArea from './dialog';

import type { PropsWithChildren } from 'react';
import type { DialogStore } from '../../stores/dialog-store';
import type { RegionStore } from '../../stores/region-store';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const regionStoreRef = useRef<StoreApi<RegionStore> | undefined>(undefined);
  const dialogStoreRef = useRef<StoreApi<DialogStore> | undefined>(undefined);

  if (!regionStoreRef.current) {
    regionStoreRef.current = createRegionStore();
  }

  if (!dialogStoreRef.current) {
    dialogStoreRef.current = createDialogStore();
  }

  return (
    <DialogContext.Provider value={dialogStoreRef.current}>
      <RegionContext.Provider value={regionStoreRef.current}>
        {children}

        <RegionArea />
        <DialogArea />
      </RegionContext.Provider>
    </DialogContext.Provider>
  );
};

export default StoreProvider;
