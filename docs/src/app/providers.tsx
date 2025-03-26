'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider, respondMore } from '@wanteddev/wds';

import { GNB_HEIGHT } from '@/features/menu/components/gnb/constants';

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
              '--layout-padding': 'clamp(20px, calc(25vw - 320px), 40px)',
              '--layout-max-width': '1680px',

              [respondMore('1680px')]: {
                '--layout-max-width': '100%',
                '--layout-padding':
                  'clamp(40px, calc(16.6666666667vw - 240px), 60px)',
              },
              [respondMore('1800px')]: {
                '--layout-max-width': '1800px',
              },
            },
          })}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
