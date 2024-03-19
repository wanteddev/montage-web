'use client';

import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { ThemeProvider } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
