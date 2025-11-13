'use client';

import Fallback from '@/components/fallback';

import FullPageLayout from './full-page-layout';

const NotFoundPage = () => {
  return (
    <FullPageLayout>
      <Fallback
        title="404"
        subtitle="페이지를 찾을 수 없습니다."
        description={
          <>
            오류로 요청하신 페이지를 찾을 수 없어요.
            <br />
            주소가 잘못 입력 되었거나 변경, 삭제 되었을 수 있어요.
          </>
        }
      />
    </FullPageLayout>
  );
};

export default NotFoundPage;
