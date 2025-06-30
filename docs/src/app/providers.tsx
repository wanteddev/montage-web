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
                '--font-family-wanted-sans':
                  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
              },
            })}
          />
        </LnbProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
