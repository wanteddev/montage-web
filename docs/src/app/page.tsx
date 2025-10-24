import { FlexBox } from '@wanteddev/wds';

import Hero from '@/features/home/components/hero';
import HomeLayout from '@/features/home/components/layout';
import Resources from '@/features/home/components/resources';
import Behind from '@/features/home/components/behind';
import Faq from '@/features/home/components/faq';
import Footer from '@/features/layout/components/footer';

export const dynamic = 'force-static';

const RootPage = () => {
  return (
    <FlexBox
      as="main"
      flexDirection="column"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Hero />

      <HomeLayout>
        <Resources />

        <Behind />

        <Faq />

        <Footer sx={{ marginTop: '80px' }} />
      </HomeLayout>
    </FlexBox>
  );
};

export default RootPage;
