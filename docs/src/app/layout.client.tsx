'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import { useLnbContext } from '@/features/docs/components/lnb/contexts';

import type { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const lnbContext = useLnbContext();

  return (
    <FlexBox
      justifyContent="center"
      flex="1 0 100%"
      sx={(theme) => ({
        paddingTop: 56,
        maxWidth: '100%',
        transition: 'all 0.2s ease',
        [respondMore(theme.breakpoint.lg)]: {
          flex: lnbContext.hide ? '2 0 100%' : '1 0 calc(100% - 240px)',
        },
      })}
    >
      {children}
    </FlexBox>
  );
};

export default ClientLayout;
