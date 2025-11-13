import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsTypography from '@/features/docs/components/foundations/typography';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Typography';
const DESCRIPTION =
  '타이포그래피는 텍스트를 읽기 쉽고 아름답게 표현하는 시각적 체계로 폰트 선택, 크기, 굵기, 행간, 자간 등의 요소들을 조합하여 정보의 위계와 가독성을 만들어냅니다. 원티드랩에서는 일관된 타이포그래피 규칙을 통해 브랜드의 목소리를 전달하고 사용자 경험을 향상시킵니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const TypographyPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsTypography />
      </CustomRenderProvider>
    </>
  );
};

export default TypographyPage;
