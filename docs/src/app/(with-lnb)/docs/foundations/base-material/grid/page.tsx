import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsGrid from '@/features/docs/components/foundations/grid';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Grid';
const DESCRIPTION =
  '원티드의 그리드 시스템은 8px 기반의 일관된 간격 체계를 사용하여 모든 화면에서 조화로운 비율과 정렬을 만들어냅니다. 반응형 그리드는 다양한 디바이스 환경에서 콘텐츠가 자연스럽게 재배치되도록 지원함으로써 가독성과 시각적 안정감을 보장합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const GridPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsGrid />
      </CustomRenderProvider>
    </>
  );
};

export default GridPage;
