import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import GettingStarted from '@/features/docs/components/getting-started';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Designer';
const DESCRIPTION =
  'Montage는 원티드의 제품 경험을 위한 디자인 시스템으로, 구성원들이 효율적으로 제품을 만들 수 있도록 돕습니다. 원티드의 디자인 언어를 기반으로 한 코드, 리소스, UX 가이드라인으로 구성되어 있으며 제품 설계를 시작하는 데 필요한 모든 것을 제공합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/home/Thumbnails.png',
});

const GettingStartedPage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION} />

      <CustomRenderProvider>
        <GettingStarted />
      </CustomRenderProvider>
    </>
  );
};

export default GettingStartedPage;
