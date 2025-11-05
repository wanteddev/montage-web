'use client';
import { FlexBox } from '@wanteddev/wds';

import Sidebar from '@/features/docs/components/sidebar';
import Lnb from '@/features/docs/components/lnb';
import Footer from '@/features/layout/components/footer';

import type { PropsWithChildren } from 'react';

export const dynamic = 'force-static';

const WithLnbLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox
      gap="40px"
      sx={{
        width: '100%',
        margin: '0 auto',
        maxWidth: 'var(--layout-max-width)',
        boxSizing: 'content-box',
      }}
    >
      <Lnb />

      <FlexBox
        as="main"
        gap="20px"
        sx={{ width: '100%' }}
        sm={{ justifyContent: 'center' }}
        lg={{
          sx: { width: 'calc(100% - 200px)', paddingLeft: '60px' },
        }}
      >
        <FlexBox
          data-algolia-page-scope
          flexDirection="column"
          sx={{
            padding: '56px var(--layout-padding-inline) 0px',
            width: '100%',
            maxWidth: 'min(840px, 100%)',
          }}
          flex="1 1 0"
        >
          {children}

          <Footer
            sx={{
              marginTop: '120px',
            }}
          />
        </FlexBox>

        <Sidebar />
      </FlexBox>
    </FlexBox>
  );
};

export default WithLnbLayout;
