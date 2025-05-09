'use client';

import { FlexBox, respondMore } from '@wanteddev/wds';

import Sidebar from '@/features/docs/components/sidebar';

import type { PropsWithChildren } from 'react';

const DocsClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox
      justifyContent="center"
      flex="1 1 0"
      sx={(theme) => ({
        paddingTop: 56,
        [respondMore(theme.breakpoint.lg)]: {
          maxWidth: 'calc(100% - 240px)',
        },
      })}
    >
      <FlexBox
        data-algolia-page-scope
        flexDirection="column"
        sx={(theme) => ({
          padding: '0px 20px',
          maxWidth: '840px',
          [respondMore(theme.breakpoint.sm)]: {
            padding: '0px 40px',
          },
          [respondMore(theme.breakpoint.xl)]: {
            maxWidth: 'min(840px, calc(100% - 208px))',
          },
        })}
        flex="1 1 0"
      >
        {children}
      </FlexBox>

      <Sidebar />
    </FlexBox>
  );
};

export default DocsClientLayout;
