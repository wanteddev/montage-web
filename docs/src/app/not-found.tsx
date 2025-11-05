'use client';

import {
  FallbackView,
  FallbackViewButton,
  FallbackViewContent,
  FallbackViewText,
  typographyStyle,
} from '@wanteddev/wds';
import Link from 'next/link';

import FullPageLayout from './full-page-layout';

const NotFoundPage = () => {
  return (
    <FullPageLayout>
      <FallbackView>
        <FallbackViewContent>
          <FallbackViewText
            sx={{
              ['[data-role="fallback-view-text-title"]']: typographyStyle(
                'display2',
                'bold',
              ),
              ['[data-role="fallback-view-text-description"]']: typographyStyle(
                'body2',
                'regular',
              ),
            }}
            title="404"
            description={
              <>
                요청하신 페이지를 찾을 수 없습니다.
                <br />
                홈으로 돌아가 다시 시도해주세요.
              </>
            }
          />
          <FallbackViewButton
            as={Link}
            href="/"
            size="medium"
            sx={{ borderRadius: '999px !important' }}
          >
            Go Home
          </FallbackViewButton>
        </FallbackViewContent>
      </FallbackView>
    </FullPageLayout>
  );
};

export default NotFoundPage;
