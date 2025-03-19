'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider, respondTo } from '@wanteddev/wds';
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
              [respondTo('960px')]: {
                '--gnb-height': `${GNB_HEIGHTS[0]}px`,
              },
            },
          })}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
