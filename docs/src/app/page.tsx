'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import Footer from '@/features/layout/components/footer';
import Intro from '@/features/home/components/intro';
import Banners from '@/features/home/components/banners';

const RootPage = () => {
  return (
    <FlexBox flexDirection="column" flex="1" alignItems="center">
      <Intro />

      <FlexBox
        flex="1"
        flexDirection="column"
        sx={{
          width: '100%',
          padding: '0px 20px',
          maxWidth: '1400px',
          [respondMore('500px')]: {
            padding: '0px clamp(20px, calc(8vw - 16px), 80px)',
          },
        }}
      >
        <Banners />

        <Footer />
      </FlexBox>
    </FlexBox>
  );
};

export default RootPage;
