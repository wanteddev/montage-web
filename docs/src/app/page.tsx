import { FlexBox } from '@wanteddev/wds';

import Intro from '@/features/home/components/intro';
import Banners from '@/features/home/components/banners';
import Resources from '@/features/home/components/resources';
import Faq from '@/features/home/components/faq';
import Articles from '@/features/home/components/articles';
import Layout from '@/features/home/components/layout';

export const dynamic = 'force-static';

const RootPage = () => {
  return (
    <FlexBox flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
      <Intro />

      <Layout>
        <Banners />

        <Resources />

        <Articles />

        <Faq />
      </Layout>
    </FlexBox>
  );
};

export default RootPage;
