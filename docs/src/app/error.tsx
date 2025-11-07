'use client';

import Fallback from '@/components/fallback';

import FullPageLayout from './full-page-layout';

const ErrorPage = () => {
  return (
    <FullPageLayout>
      <Fallback
        title="Error"
        subtitle="오류가 발생했습니다."
        description={
          <>
            시스템 오류로 요청하신 페이지를 표시할 수 없어요.
            <br />
            관리자에게 문의하거나 잠시 후 다시 시도하세요.
          </>
        }
      />
    </FullPageLayout>
  );
};

export default ErrorPage;
