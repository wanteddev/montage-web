'use client';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { Global, ThemeProvider, respondMore } from '@wanteddev/wds';
import { type PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LnbProvider } from '@/features/docs/components/lnb/contexts';
import { GNB_HEIGHT } from '@/features/layout/constants';
import { RouteContextProvider } from '@/contexts';

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RouteContextProvider>
      <AppRouterCacheProvider>
        <ThemeProvider enableDarkMode>
          <QueryClientProvider client={queryClient}>
            <LnbProvider>
              {children}

              <Global
                styles={(theme) => ({
                  [':root']: {
                    '--gnb-height': `${GNB_HEIGHT}px`,
                    '--layout-padding-inline': '20px',
                    '--layout-max-width': '100%',
                    '--font-family-wanted-sans':
                      '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',

                    [respondMore(theme.breakpoint.sm)]: {
                      '--layout-padding-inline': '40px',
                    },

                    [respondMore(theme.breakpoint.lg)]: {
                      '--layout-max-width': '1060px',
                    },

                    [respondMore(theme.breakpoint.xl)]: {
                      '--layout-max-width': '1400px',
                    },
                  },
                })}
              />
            </LnbProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </RouteContextProvider>
  );
};

export default Providers;
