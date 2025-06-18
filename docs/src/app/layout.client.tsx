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
        display: 'grid',
        gridTemplateColumns: '1fr',
        transition: 'all 0.2s ease',
        [respondMore(theme.breakpoint.lg)]: {
          gridTemplateColumns: lnbContext.hide ? '0px 1fr' : '240px 1fr',
        },
      })}
    >
      <Lnb />

      <FlexBox
        justifyContent="center"
        sx={{
          paddingTop: 56,
          maxWidth: '100%',
        }}
      >
        {children}
      </FlexBox>
    </Box>
  );
};

export default ClientLayout;
