'use client';
import { FlexBox } from '@wanteddev/wds';

import Footer from '@/features/layout/components/footer';
import { useLnbContext } from '@/features/docs/components/lnb/contexts';

import { contentWrapperStyle, wrapperStyle } from './style';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  const { hide } = useLnbContext();

  return (
    <FlexBox flexDirection="column" alignItems="center" sx={wrapperStyle}>
      <FlexBox
        flexDirection="column"
        gap="104px"
        alignItems="center"
        sx={{
          width: '100%',
          maxWidth: '1040px',
        }}
      >
        <FlexBox
          alignItems="center"
          flexDirection="column"
          gap="96px"
          data-lnb-hide={hide}
          sm={{ gap: '114px' }}
          sx={contentWrapperStyle}
        >
          {children}
        </FlexBox>

        <Footer />
      </FlexBox>
    </FlexBox>
  );
};

export default Layout;
