import { Box } from '@wanteddev/wds-engine';

import { useRegionStore } from '../../hooks';
import {
  Snackbar,
  SnackbarAction,
  SnackbarCloseButton,
  SnackbarContent,
  SnackbarDescription,
  SnackbarExtraContent,
  SnackbarHeading,
} from '../../components/snackbar';
import {
  Toast,
  ToastContainer,
  ToastContent,
  ToastIcon,
} from '../../components';

import type { CSSProperties } from 'react';
import type {
  RegionItem,
  RegionSnackbarItem,
  RegionToastItem,
  WithSystemRegionStoreItem,
} from '../../stores/region-store';

const isSnackbar = (item: RegionItem): item is RegionSnackbarItem => {
  return item.type === 'snackbar';
};

const RegionArea = () => {
  const config = useRegionStore((state) => state.config);
  const items = useRegionStore((state) => state.items);

  return (
    <>
      <Box
        wds-ignore-dismissable-layer="true"
        style={
          {
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
              minWidth: '100%',
              paddingBottom: '20px',
            },
          })}
        />
      </Box>

      {items.map((item) => {
        if (isSnackbar(item)) {
          return <SnackbarRegion item={item} key={item.id} />;
        }

        return <ToastRegion item={item} key={item.id} />;
      })}
    </>
  );
};

export default RegionArea;

const SnackbarRegion = ({
  item,
}: {
  item: WithSystemRegionStoreItem<RegionSnackbarItem>;
}) => {
  const remove = useRegionStore((state) => state.remove);
  const hide = useRegionStore((state) => state.hide);

  return (
    <Snackbar
      key={item.id}
      variant={item.variant}
      duration={item.duration}
      onAnimationEnd={(type) => {
        item.onAnimationEnd?.(type);

        if (type === 'hide') {
          remove(item.id);
        }
      }}
      onOpenChange={(open) => {
        if (!open) {
          hide(item.id);
        }
      }}
      open={item.visibility === 'visible'}
    >
      <SnackbarContent
        extraContent={
          item.extraContent && (
            <SnackbarExtraContent>{item.extraContent}</SnackbarExtraContent>
          )
        }
      >
        {Boolean(item.title) && <SnackbarHeading>{item.title}</SnackbarHeading>}

        {Boolean(item.description) && (
          <SnackbarDescription>{item.description}</SnackbarDescription>
        )}
      </SnackbarContent>

      {Boolean(item.action) && Object.keys(item.action).length > 0 && (
        <SnackbarAction {...item.action} />
      )}

      {Boolean(item.closeButton) && <SnackbarCloseButton />}
    </Snackbar>
  );
};

const ToastRegion = ({
  item,
}: {
  item: WithSystemRegionStoreItem<RegionToastItem>;
}) => {
  const remove = useRegionStore((state) => state.remove);
  const hide = useRegionStore((state) => state.hide);

  return (
    <Toast
      variant={item.variant}
      duration={item.duration}
      onAnimationEnd={(type) => {
        item.onAnimationEnd?.(type);

        if (type === 'hide') {
          remove(item.id);
        }
      }}
      onOpenChange={(open) => {
        if (!open) {
          hide(item.id);
        }
      }}
      open={item.visibility === 'visible'}
    >
      <ToastContainer>
        <ToastIcon>{item.icon}</ToastIcon>

        <ToastContent>{item.content}</ToastContent>
      </ToastContainer>
    </Toast>
  );
};
