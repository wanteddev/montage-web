'use client';
import { FlexBox } from '@wanteddev/wds';

import Sidebar from '@/features/docs/components/sidebar';
import DocsDescription from '@/features/docs/components/description';
import Footer from '@/features/layout/components/footer';
import Lnb from '@/features/docs/components/lnb';

export const dynamic = 'force-static';

const DocsLayout = ({ children }: LayoutProps<'/docs'>) => {
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
        gap="20px"
        sx={{ width: '100%' }}
        sm={{ justifyContent: 'center' }}
        lg={{
          sx: { width: 'calc(100% - 200px)' },
        }}
      >
        <FlexBox
          data-algolia-page-scope
          flexDirection="column"
          sx={{
            padding: '56px var(--layout-padding-inline) 0px',
            width: '100%',
            maxWidth: 'min(800px, 100%)',
          }}
          flex="1 1 0"
        >
          <DocsDescription />

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

export default DocsLayout;
