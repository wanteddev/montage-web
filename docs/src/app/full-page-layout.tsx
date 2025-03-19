import { FlexBox } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const FullPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      sx={{
        width: '100%',
        height: 'calc(100dvh - var(--gnb-height))',
        margin: '0 auto',
      }}
      sm={{
        sx: { padding: '0px 0px 20px 20px', width: 'calc(100% - 250px)' },
      }}
      md={{
        sx: {
          padding: '0px 20px 20px 20px',
          width: 'calc(100% - 250px - 150px)',
        },
      }}
    >
      {children}
    </FlexBox>
  );
};

export default FullPageLayout;
