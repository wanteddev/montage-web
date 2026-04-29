import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsSpacing from '@/features/docs/components/foundations/spacing';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Spacing';
const DESCRIPTION =
  '여백과 간격을 정의하는 기본 단위입니다. 4px 단위의 일관된 스케일을 사용해 UI 전반의 리듬과 균형을 유지합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const SpacingPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsSpacing />
      </CustomRenderProvider>
    </>
  );
};

export default SpacingPage;
