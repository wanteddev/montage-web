'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode>
        {children}

        <Global
          styles={() => ({
            [':root']: {
              '--header-height': '81px',
            },
          })}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
