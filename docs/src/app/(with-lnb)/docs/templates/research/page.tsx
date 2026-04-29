import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import TemplatesResearch from '@/features/docs/components/templates/research';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Explore';
const DESCRIPTION =
  'GNB부터 Footer까지 PC 1440 기준의 풀 화면 시안입니다. 5컬럼 카드 그리드 두 섹션과 3컬럼 ListCard 그리드 한 섹션을 Layout 토큰으로 정렬하고, GNB·Footer는 wds의 Button·IconButton·Avatar·Divider·로고 아이콘을 그대로 조합합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
});

const ResearchTemplatePage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <TemplatesResearch />
      </CustomRenderProvider>
    </>
  );
};

export default ResearchTemplatePage;
