'use client';

import { FlexBox, containerStyle } from '@wanteddev/wds';

import Header from '@/features/menu/components/header';
import Menu from '@/features/menu/components/menu';
import MobileMenu from '@/features/menu/components/mobile-menu';
import { MobileMenuProvider } from '@/features/menu/context';

import type { PropsWithChildren } from 'react';

const DocsLayout = ({ children }: PropsWithChildren) => {
  return (
    <MobileMenuProvider>
      <Header />
      <FlexBox as="main" sx={containerStyle(true)}>
        <Menu />
        <MobileMenu />
        {children}
      </FlexBox>
    </MobileMenuProvider>
  );
};

export default DocsLayout;
