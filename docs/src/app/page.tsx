'use client';

import { FlexBox } from '@wanteddev/wds';

import Footer from '@/features/layout/components/footer';

// import HomeIntro from '@/features/home/components/intro';

const RootPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      flex="1"
      // sx={{ marginTop: 'calc(var(--gnb-height) * -1)' }}
    >
      {/* <HomeIntro /> */}
      <Footer />
    </FlexBox>
  );
};

export default RootPage;
