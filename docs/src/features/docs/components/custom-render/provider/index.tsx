'use client';
import { FlexBox } from '@wanteddev/wds';

import { HeadingProvider } from '@/features/docs/contexts';

import { wrapperStyle } from './style';

import type { PropsWithChildren } from 'react';

const CustomRenderProvider = ({ children }: PropsWithChildren) => {
  return (
    <HeadingProvider>
      <FlexBox flexDirection="column" sx={wrapperStyle}>
        {children}
      </FlexBox>
    </HeadingProvider>
  );
};

export default CustomRenderProvider;
