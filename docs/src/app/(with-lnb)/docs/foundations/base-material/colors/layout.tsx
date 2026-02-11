import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import ColorsTab from '@/features/docs/components/foundations/colors/tab';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

const TITLE = 'Colors';
const DESCRIPTION =
  '원티드의 컬러시스템은 시각적 일관성을 유지하고 효율적인 디자인 작업을 돕습니다. 시멘틱 컬러를 통해 상황에 맞는 적절한 색상을 일관되게 사용할 수 있습니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/foundations/Thumbnails.png',
});

const ElevationLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION}>
        <ColorsTab />
      </CustomRenderSummary>

      {children}
    </>
  );
};

export default ElevationLayout;
