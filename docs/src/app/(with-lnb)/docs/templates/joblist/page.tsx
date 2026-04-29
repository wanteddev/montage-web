import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import { createMetadata } from '@/helpers/metadata';
import TemplatesJoblist from '@/features/docs/components/templates/joblist';

import type { Metadata } from 'next';

const TITLE = 'Joblist';
const DESCRIPTION =
  '카테고리·필터·정렬 컨트롤과 함께 채용 카드 그리드를 노출하는 검색 결과 화면입니다. 사용자가 조건을 좁혀가며 다수의 포지션을 비교·탐색할 수 있도록 합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
});

const JoblistTemplatePage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <TemplatesJoblist />
      </CustomRenderProvider>
    </>
  );
};

export default JoblistTemplatePage;
