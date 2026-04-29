import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import TemplatesTest from '@/features/docs/components/templates/test';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Test';
const DESCRIPTION =
  '진행도 표시·질문·답변 옵션으로 구성된 진단/테스트 화면입니다. 슬림 GNB와 좁은 컨테이너로 사용자가 한 번에 한 질문에 집중하도록 합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
});

const TestTemplatePage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <TemplatesTest />
      </CustomRenderProvider>
    </>
  );
};

export default TestTemplatePage;
