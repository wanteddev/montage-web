import { FlexBox } from '@wanteddev/wds';

import Footer from '@/features/layout/components/footer';
import Container from '@/features/layout/components/container';
import Intro from '@/home/components/intro';

const RootPage = () => {
  return (
    <FlexBox flexDirection="column" flex="1">
      <Intro />

      <Container>
        <Footer />
      </Container>
    </FlexBox>
  );
};

export default RootPage;
