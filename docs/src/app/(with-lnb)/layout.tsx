'use client';
import { Box, FlexBox } from '@wanteddev/wds';
import { usePathname } from 'next/navigation';

import Sidebar from '@/features/docs/components/sidebar';
import Lnb from '@/features/docs/components/lnb';
import Footer from '@/features/layout/components/footer';

import type { PropsWithChildren } from 'react';

export const dynamic = 'force-static';

const WithLnbLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const hideSidebar = pathname.startsWith('/docs/templates');

  return (
    <Box
      sx={{
        width: '100%',
        padding: '0 var(--layout-padding-inline)',
        boxSizing: 'border-box',
      }}
    >
      <FlexBox
        gap="40px"
        sx={{
          width: '100%',
          margin: '0 auto',
          maxWidth: 'var(--layout-max-width)',
        }}
      >
        <Lnb />

        <FlexBox
          as="main"
          gap="20px"
          sx={{ width: '100%', minWidth: 0 }}
          sm={{ justifyContent: 'center' }}
          lg={{
            sx: hideSidebar
              ? { paddingLeft: '60px' }
              : { width: 'calc(100% - 200px)', paddingLeft: '60px' },
          }}
        >
          <FlexBox
            data-algolia-page-scope
            flexDirection="column"
            sx={{
              paddingTop: '56px',
              width: '100%',
              maxWidth: hideSidebar ? 'none' : 'min(840px, 100%)',
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

          {!hideSidebar && <Sidebar />}
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

export default WithLnbLayout;
