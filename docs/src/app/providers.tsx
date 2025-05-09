'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider } from '@wanteddev/wds';

import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode disableTransitionOnChange>
        {children}

        <Global
          styles={() => ({
            [':root']: {
              '--gnb-height': `${GNB_HEIGHT}px`,
            },
          })}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
