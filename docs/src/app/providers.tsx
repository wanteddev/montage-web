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
              [respondTo('960px')]: {
                '--gnb-height': `${GNB_HEIGHTS[0]}px`,
              },
              [respondMore('1760px')]: {
                '--layout-padding':
                  'clamp(20px, calc(16.6666666667vw - 253.3333333333px), 60px)',
              },
            },
          })}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
