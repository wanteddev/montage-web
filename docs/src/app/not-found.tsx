'use client';

import {
  FallbackView,
  FallbackViewButton,
  FallbackViewContent,
  FallbackViewImage,
  FallbackViewText,
} from '@wanteddev/wds';
import Link from 'next/link';

import FullPageLayout from './full-page-layout';

const NotFoundPage = () => {
  return (
    <FullPageLayout>
      <FallbackView platform="mobile" sm={{ platform: 'desktop' }}>
        <FallbackViewImage>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://static.wanted.co.kr/images/ghost.png" alt="ghost" />
        </FallbackViewImage>
        <FallbackViewContent>
          <FallbackViewText
            title="페이지를 찾을 수 없어요."
            description={
              <>
                잘못된 경로로 접근했거나 페이지가 삭제되었어요.
                <br />
                다시 시도해 주세요.
              </>
            }
          />
          <FallbackViewButton as={Link} href="/docs/overview/getting-started">
            문서 확인하기
          </FallbackViewButton>
        </FallbackViewContent>
      </FallbackView>
    </FullPageLayout>
  );
};

export default NotFoundPage;
