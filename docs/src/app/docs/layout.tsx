'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';
import { useParams } from 'next/navigation';

import Sidebar from '@/features/docs/components/sidebar';
import DocsDescription from '@/features/docs/components/description';
import Footer from '@/features/layout/components/footer';
import { shouldNotSerializeMDX } from '@/features/docs/helpers/overview';
import Container from '@/features/layout/components/container';

import type { SlugParams } from '@/features/docs/components/lnb/types';

export const dynamic = 'force-static';

const DocsLayout = ({ children }: LayoutProps<'/docs'>) => {
  const params = useParams<SlugParams>();

  if (shouldNotSerializeMDX(params.slug ?? [])) {
    return (
      <Container data-algolia-page-scope>
        {children}

        <Footer />
      </Container>
    );
  }

  return (
    <FlexBox
      sx={{
        paddingTop: 56,
        width: '100%',
      }}
      justifyContent="center"
    >
      <FlexBox
        data-algolia-page-scope
        flexDirection="column"
        sx={(theme) => ({
          padding: '0px 20px',
          maxWidth: '100%',
          [respondMore(theme.breakpoint.sm)]: {
            padding: '0px 40px',
            maxWidth: '840px',
          },
          [respondMore(theme.breakpoint.xl)]: {
            maxWidth: 'min(840px, calc(100% - 208px))',
          },
        })}
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
  );
};

export default DocsLayout;
