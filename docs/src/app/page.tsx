'use client';

import { FlexBox } from '@wanteddev/wds';

// import HomeIntro from '@/features/home/components/intro';

const RootPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      sx={{ marginTop: 'calc(var(--header-height) * -1)' }}
    >
      {/* <HomeIntro /> */}
    </FlexBox>
  );
};

export default RootPage;
