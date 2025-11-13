import { FlexBox } from '@wanteddev/wds';

import Hero from '@/features/home/components/hero';
import HomeLayout from '@/features/home/components/layout';
import Resources from '@/features/home/components/resources';
import Behind from '@/features/home/components/behind';
import Faq from '@/features/home/components/faq';
import Footer from '@/features/layout/components/footer';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = createMetadata({
  title: 'Wanted Design System',
  description: '일하는 사람들의 모든 가능성을 위해, 원티드 디자인 시스템',
  image: '/home/Thumbnails.png',
});

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
