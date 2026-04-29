import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsRadius from '@/features/docs/components/foundations/radius';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Radius';
const DESCRIPTION =
  '컴포넌트의 모서리를 둥글게 처리하는 곡률 단위입니다. 일관된 라디우스 스케일을 통해 부드럽고 통일된 시각적 인상을 만들어냅니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const RadiusPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsRadius />
      </CustomRenderProvider>
    </>
  );
};

export default RadiusPage;
