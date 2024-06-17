'use client';

import { FlexBox } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const DocsLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox
      as="main"
      sx={{ width: '100%', minHeight: '100dvh', position: 'relative' }}
    >
      {children}
    </FlexBox>
  );
};

export default DocsLayout;
