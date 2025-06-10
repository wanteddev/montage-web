'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider } from '@wanteddev/wds';

import { LnbProvider } from '@/features/docs/components/lnb/contexts';
import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode disableTransitionOnChange>
        <LnbProvider>
          {children}

          <Global
            styles={() => ({
              [':root']: {
                '--gnb-height': `${GNB_HEIGHT}px`,
              },
            })}
          />
        </LnbProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
