import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsLayout from '@/features/docs/components/foundations/layout';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Layout';
const DESCRIPTION =
  '화면 단위의 여백·간격을 정의하는 의미론적 레이아웃 토큰입니다. PC와 mobile 모드를 별도로 제공하여 반응형 환경에서 일관된 리듬을 유지합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const LayoutPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsLayout />
      </CustomRenderProvider>
    </>
  );
};

export default LayoutPage;
