'use client';
import { useRef } from 'react';
import { type StoreApi } from 'zustand';
import { Box } from '@wanteddev/wds-engine';

import {
  RegionContext,
  createRegionStore,
  useRegionStore,
} from '../stores/region-store';
import RegionStatus from '../components/region-status';
import { DialogContext, createDialogStore } from '../stores/dialog-store';
import Dialog from '../components/dialog';

import type { DialogStore } from '../stores/dialog-store';
import type { CSSProperties, PropsWithChildren } from 'react';
import type { RegionStore } from '../stores/region-store';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const regionStoreRef = useRef<StoreApi<RegionStore>>();
  const dialogStoreRef = useRef<StoreApi<DialogStore>>();

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

        <RegionStatus />
        <RegionArea />
        <Dialog />
      </RegionContext.Provider>
    </DialogContext.Provider>
  );
};

export default StoreProvider;

const RegionArea = () => {
  const config = useRegionStore((state) => state.config);

  return (
    <Box
      wds-ignore-dismissable-layer="true"
      style={
        {
          '--wds-region-viewport-top': `calc(env(safe-area-inset-bottom, 0px) + ${config.viewportTop})`,
          '--wds-region-viewport-max-width': `calc(${config.viewportMaxWidth})`,
          '--wds-region-viewport-bottom': `calc(env(safe-area-inset-bottom, 0px) + ${config.viewportBottom})`,
        } as CSSProperties
      }
      role="region"
      aria-live="polite"
      id="wds-region-manager"
      aria-label="Notifications"
    >
      <Box
        id="wds-region-manager-bottom"
        sx={(theme) => ({
          position: 'fixed',
          gap: '14px',
          zIndex: 5500,
          justifyContent: 'center',
          pointerEvents: 'none',
          width: 'fit-content',
          minWidth: '100px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'var(--wds-region-viewport-max-width, 100%)',
          padding: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 'var(--wds-region-viewport-bottom, 0px)',
          paddingBottom: '40px',
          [`@media (max-width: ${theme.breakpoint.sm})`]: {
            paddingBottom: '34px',
          },
        })}
      />
    </Box>
  );
};
