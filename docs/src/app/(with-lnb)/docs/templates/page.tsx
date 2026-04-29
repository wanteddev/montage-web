import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import TemplatesOverview from '@/features/docs/components/templates/overview';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Templates';
const DESCRIPTION =
  'Foundation 토큰과 Components를 조합해 만든 화면 단위 예시입니다. AI 코딩 에이전트가 디자인 규칙에 맞는 화면을 생성하도록 학습할 수 있도록, 각 템플릿에는 라이브 미리보기와 함께 사용된 토큰·컴포넌트·디자인 의도가 함께 명시되어 있습니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
});

const TemplatesPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <TemplatesOverview />
      </CustomRenderProvider>
    </>
  );
};

export default TemplatesPage;
