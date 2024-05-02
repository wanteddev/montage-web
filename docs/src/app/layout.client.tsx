'use client';

import { FlexBox, containerStyle } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const ClientRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox as="main" sx={containerStyle(true)}>
      {children}
    </FlexBox>
  );
};

export default ClientRootLayout;
