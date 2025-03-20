'use client';
import { FlexBox, respondTo } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const DocsClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox
      sx={{
        width: '100%',
        paddingTop: 'var(--layout-padding)',
        maxWidth: 'var(--layout-max-width)',
        margin: '0 auto',
        [respondTo('1360px')]: {
          justifyContent: 'center',
        },
      }}
    >
      {children}
    </FlexBox>
  );
};

export default DocsClientLayout;
