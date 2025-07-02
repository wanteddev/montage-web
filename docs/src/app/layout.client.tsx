'use client';
import { Box, FlexBox, respondMore } from '@wanteddev/wds';

import { useLnbContext } from '@/features/docs/components/lnb/contexts';
import Lnb from '@/features/docs/components/lnb';

import type { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const lnbContext = useLnbContext();

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '100%',
        transition: 'grid-template-columns 0.2s ease-out',
        [respondMore(theme.breakpoint.lg)]: {
          gridTemplateColumns: lnbContext.hide
            ? '0px 100%'
            : '240px calc(100% - 240px)',
        },
      })}
    >
      <Lnb />

      <FlexBox as="main" justifyContent="center">
        {children}
      </FlexBox>
    </Box>
  );
};

export default ClientLayout;
