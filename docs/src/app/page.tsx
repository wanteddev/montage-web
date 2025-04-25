import { EmptyState, EmptyStateButton } from '@wanteddev/wds';
import Link from 'next/link';

import FullPageLayout from './full-page-layout';

const RootPage = () => {
  return (
    <FullPageLayout>
      <EmptyState platform="mobile" sm={{ platform: 'desktop' }}>
        <EmptyStateButton as={Link} href="/docs/overview/getting-started">
          문서 확인하기
        </EmptyStateButton>
      </EmptyState>
    </FullPageLayout>
  );
};

export default RootPage;
