import { FlexBox } from '@wanteddev/wds';

import Hero from '@/features/home/components/hero';
import HomeLayout from '@/features/home/components/layout';
import Resources from '@/features/home/components/resources';
import Behind from '@/features/home/components/behind';
import Faq from '@/features/home/components/faq';
// import Intro from '@/features/new-home/components/intro';

export const dynamic = 'force-static';

const RootPage = () => {
  return (
    <FlexBox flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
      <Hero />

      <HomeLayout>
        <Resources />

        <Behind />

        <Faq />
      </HomeLayout>
    </FlexBox>
  );
};

export default RootPage;

// import { FlexBox } from '@wanteddev/wds';

// import Intro from '@/features/home/components/intro';
// import Banners from '@/features/home/components/banners';
// import Resources from '@/features/home/components/resources';
// import Faq from '@/features/home/components/faq';
// import Articles from '@/features/home/components/articles';
// import Layout from '@/features/home/components/layout';

// const RootPage = () => {
//   return (
//     <FlexBox flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
//       <Intro />

//       <Layout>
//         <Banners />

//         <Resources />

//         <Articles />

//         <Faq />
//       </Layout>
//     </FlexBox>
//   );
// };

// export default RootPage;
