import DocsCollection from '@/features/docs/components/docs-collection';
import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Components';
const DESCRIPTION =
  '사용자 인터페이스를 구성하는 재사용 가능한 독립적인 UI 단위입니다. 특정 기능과 시각적 스타일을 가진 요소들로 일관된 사용자 경험을 제공하기 위해 표준화된 규칙에 따라 설계되었습니다. 각 컴포넌트는 다양한 상황에서 반복적으로 활용될 수 있으며 디자인과 개발 효율성을 높이는 동시에 제품 전반의 일관성을 유지합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/components/Thumbnails.png',
});

const ComponentsOverviewPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <DocsCollection category="components" />
      </CustomRenderProvider>
    </>
  );
};

export default ComponentsOverviewPage;
