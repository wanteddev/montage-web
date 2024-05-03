'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider, respondTo } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode>
        {children}

        <Global
          styles={(theme) => ({
            [':root']: {
              '--header-height': '61px',
              [respondTo(theme.breakpoint.sm)]: {
                '--header-height': '57px',
              },
            },
          })}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
