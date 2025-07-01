'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import Footer from '@/features/layout/components/footer';
import Intro from '@/features/home/components/intro';
import Banners from '@/features/home/components/banners';
import Resources from '@/features/home/components/resources';
import Faq from '@/features/home/components/faq';
import Articles from '@/features/home/components/articles';

const RootPage = () => {
  return (
    <FlexBox flexDirection="column" flex="1" alignItems="center">
      <Intro />

      <FlexBox
        flex="1"
        flexDirection="column"
        sx={{
          width: '100%',
          padding: '64px 20px 0px',
          maxWidth: '1400px',
          gap: '88px',
          [respondMore('500px')]: {
            padding: '56px clamp(20px, calc(8vw - 16px), 80px)',
          },
          [respondMore('620px')]: {
            gap: '104px',
          },
        }}
      >
        <FlexBox
          flexDirection="column"
          gap="88px"
          sx={{
            gap: '88px',
            [respondMore('620px')]: {
              gap: '96px',
            },
            [respondMore('780px')]: {
              gap: '114px',
            },
          }}
        >
          <Banners />

          <Resources />

          <Articles />

          <Faq />
        </FlexBox>

        <Footer />
      </FlexBox>
    </FlexBox>
  );
};

export default RootPage;
