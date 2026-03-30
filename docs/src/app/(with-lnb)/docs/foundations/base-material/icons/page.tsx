import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import FoundationsIcons from '@/features/docs/components/foundations/icons';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Icons';
const DESCRIPTION =
  '원티드의 아이콘은 기능이나 콘텐츠를 시각적으로 표현하는 요소로, 사용자가 인터페이스를 빠르게 탐색할 수 있도록 돕습니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const IconsPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <FoundationsIcons />
      </CustomRenderProvider>
    </>
  );
};

export default IconsPage;
