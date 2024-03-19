'use client';

import { FlexBox } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const ClientRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox justifyContent="center" css={{ padding: '20px 20px 0px 20px' }}>
      <FlexBox as="main" css={{ width: '100%', maxWidth: '1100px' }}>
        {children}
      </FlexBox>
    </FlexBox>
  );
};

export default ClientRootLayout;
