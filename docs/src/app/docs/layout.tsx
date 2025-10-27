'use client';
import { FlexBox } from '@wanteddev/wds';
import { useParams } from 'next/navigation';

import Sidebar from '@/features/docs/components/sidebar';
import Footer from '@/features/layout/components/footer';
import Lnb from '@/features/docs/components/lnb';
import { shouldNotSerializeMDX } from '@/features/docs/helpers/overview';
import DocsSummary from '@/features/docs/components/summary';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';

import type { SlugParams } from '@/features/docs/components/lnb/types';

export const dynamic = 'force-static';

const DocsLayout = ({ children }: LayoutProps<'/docs'>) => {
  const { slug = [] } = useParams<SlugParams>();

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
            maxWidth: 'min(840px, 100%)',
          }}
          flex="1 1 0"
        >
          {shouldNotSerializeMDX(slug) ? (
            <CustomRenderSummary />
          ) : (
            <DocsSummary />
          )}

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
