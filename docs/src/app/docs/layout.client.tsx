'use client';
import { FlexBox } from '@wanteddev/wds';

import { layoutStyle } from '@/styles';

import type { PropsWithChildren } from 'react';

const DocsClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox sx={layoutStyle} flexDirection="column">
      <FlexBox gap="24px" md={{ gap: '40px' }} xl={{ gap: '80px' }}>
        {children}
      </FlexBox>
    </FlexBox>
  );
};

export default DocsClientLayout;
