'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider, respondMore, respondTo } from '@wanteddev/wds';
import { type PropsWithChildren, useState } from 'react';

import { GnbContext } from '@/features/menu/components/gnb/contexts';
import { GNB_HEIGHTS } from '@/features/menu/components/gnb/constants';

const Providers = ({ children }: PropsWithChildren) => {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode>
        <GnbContext.Provider value={{ isSticky, setIsSticky }}>
          {children}
        </GnbContext.Provider>

        <Global
          styles={() => ({
            [':root']: {
              '--gnb-height': `${GNB_HEIGHTS[960]}px`,
              '--layout-padding': 'clamp(20px, calc(25vw - 320px), 40px)',
              '--layout-max-width': '1680px',
              [respondTo('960px')]: {
                '--gnb-height': `${GNB_HEIGHTS[0]}px`,
              },
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
