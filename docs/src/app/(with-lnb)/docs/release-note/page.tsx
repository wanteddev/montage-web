import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import ReleaseNote from '@/features/docs/components/release-note';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Release note';
const DESCRIPTION =
  '릴리즈 노트에서는 Web, iOS, Android 각 플랫폼의 패키지 버전 업데이트 내역과 상세한 변경사항, 그리고 향후 배포 일정에 대한 정보를 투명하게 공유하여 개발자들이 안정적으로 디자인 시스템을 활용할 수 있도록 지원합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/home/Thumbnails.png',
});

const ReleaseNotePage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <ReleaseNote />
      </CustomRenderProvider>
    </>
  );
};

export default ReleaseNotePage;
