'use client';

import { Button } from '@wanteddev/wds';
import Link from 'next/link';

import ClientFullPageLayout from './full-page-layout.client';

const RootPage = () => {
  return (
    <ClientFullPageLayout>
      <Button
        variant="solid"
        size="medium"
        as={Link}
        href="/docs/overview/getting-started"
      >
        문서 확인하기
      </Button>
    </ClientFullPageLayout>
  );
};

export default RootPage;
