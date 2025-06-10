'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import { useLnbContext } from '@/features/docs/components/lnb/contexts';

import type { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const lnbContext = useLnbContext();

  return (
    <FlexBox
      justifyContent="center"
      flex="1 1 0"
      sx={(theme) => ({
        paddingTop: 56,
        maxWidth: '100%',
        [respondMore(theme.breakpoint.lg)]: {
          maxWidth: lnbContext.hide ? '100%' : 'calc(100% - 240px)',
        },
      })}
    >
      {children}
    </FlexBox>
  );
};

export default ClientLayout;
