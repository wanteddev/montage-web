import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import ElevationTab from '@/features/docs/components/foundations/elevation/tab';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

const TITLE = 'Elevation';
const DESCRIPTION =
  'Elevation은 Z축을 기준으로 두 표면 사이의 거리를 나타내는 시각적 체계로, 그림자와 빛 등의 요소들을 조합하여 UI 컴포넌트 간의 명확한 깊이감과 시각적 계층을 만들어냅니다. 원티드랩에서는 일관된 Elevation 규칙을 통해 사용자에게 직관적인 UI 구조를 전달하고 정교한 사용자 경험을 제공합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const ElevationLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION}>
        <ElevationTab />
      </CustomRenderSummary>

      {children}
    </>
  );
};

export default ElevationLayout;
