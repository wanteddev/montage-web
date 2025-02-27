'use client';

import {
  EmptyState,
  EmptyStateButton,
  EmptyStateContent,
  EmptyStateImage,
  EmptyStateText,
  ImageLoader,
} from '@wanteddev/wds';
import Link from 'next/link';

import ClientFullPageLayout from './full-page-layout.client';

const NotFoundPage = () => {
  return (
    <ClientFullPageLayout>
      <EmptyState platform="mobile" sm={{ platform: 'desktop' }}>
        <EmptyStateImage>
          <ImageLoader
            src="https://static.wanted.co.kr/images/ghost.png"
            width={200}
            quality={100}
            alt="ghost"
          />
        </EmptyStateImage>
        <EmptyStateContent>
          <EmptyStateText
            title="페이지를 찾을 수 없어요."
            description={
              <>
                잘못된 경로로 접근했거나 페이지가 삭제되었어요.
                <br />
                다시 시도해 주세요.
              </>
            }
          />
          <EmptyStateButton as={Link} href="/docs/overview/getting-started">
            문서 확인하기
          </EmptyStateButton>
        </EmptyStateContent>
      </EmptyState>
    </ClientFullPageLayout>
  );
};

export default NotFoundPage;
