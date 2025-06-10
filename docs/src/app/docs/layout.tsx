'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import Sidebar from '@/features/docs/components/sidebar';
import DocsDescription from '@/features/docs/components/description';
import Footer from '@/features/layout/components/footer';

import type { PropsWithChildren } from 'react';

const DocsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
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

        <Footer />
      </FlexBox>

      <Sidebar />
    </>
  );
};

export default DocsLayout;
