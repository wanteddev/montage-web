import { FallbackView, FallbackViewButton } from '@wanteddev/wds';
import Link from 'next/link';

import FullPageLayout from './full-page-layout';

const RootPage = () => {
  return (
    <FullPageLayout>
      <FallbackView platform="mobile" sm={{ platform: 'desktop' }}>
        <FallbackViewButton as={Link} href="/docs/overview/getting-started">
          문서 확인하기
        </FallbackViewButton>
      </FallbackView>
    </FullPageLayout>
  );
};

export default RootPage;
