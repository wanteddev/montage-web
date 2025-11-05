'use client';

import {
  FallbackView,
  FallbackViewButton,
  FallbackViewContent,
  FallbackViewText,
  typographyStyle,
} from '@wanteddev/wds';
import Link from 'next/link';

import FullPageLayout from '@/app/full-page-layout';

const ErrorFallback = () => {
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
            title="Error 500"
            description={
              <>
                일시적인 오류가 발생했습니다.
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

export default ErrorFallback;
