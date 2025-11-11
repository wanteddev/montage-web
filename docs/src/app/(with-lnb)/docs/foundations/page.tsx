import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsOverview from '@/features/docs/components/foundations/overview';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Foundations';
const DESCRIPTION =
  '모든 디자인 요소의 기반이 되는 가장 원자적인 단위들로 컬러, 타이포그래피, 스페이싱, 그리드 등 시각적 언어의 최소 단위들로 구성됩니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const FoundationsPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsOverview />
      </CustomRenderProvider>
    </>
  );
};

export default FoundationsPage;
