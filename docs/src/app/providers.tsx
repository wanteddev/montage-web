'use client';

import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';
import { ThemeProvider } from '@wanteddev/wds';
import { Global } from '@emotion/react';

import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider enableDarkMode>
        {children}

        <Global
          styles={{
            ['code, .npm__react-simple-code-editor__textarea, pre']: {
              fontFamily:
                'ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace !important',
            },
          }}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
