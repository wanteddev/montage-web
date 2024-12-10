'use client';

import { EmptyState, EmptyStateButton } from '@wanteddev/wds';
import Link from 'next/link';

import ClientFullPageLayout from './full-page-layout.client';

const RootPage = () => {
  return (
    <ClientFullPageLayout>
      <EmptyState platform="mobile" sm={{ platform: 'desktop' }}>
        <EmptyStateButton as={Link} href="/docs/overview/getting-started">
          문서 확인하기
        </EmptyStateButton>
      </EmptyState>
    </ClientFullPageLayout>
  );
};

export default RootPage;
