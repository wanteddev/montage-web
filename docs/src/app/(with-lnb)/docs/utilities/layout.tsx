import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import UtilitiesTab from '@/features/docs/components/utilities/tab';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

const TITLE = 'Utilities';
const DESCRIPTION =
  '디자인 시스템 전반에서 반복적으로 사용되는 보조 기능과 스타일링 도구들의 모음입니다. UI 개발 시 필수적인 헬퍼 함수와 유틸리티 클래스들을 제공합니다.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  image: '/utilities/Thumbnails.png',
});

const UtilitiesLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CustomRenderSummary title={TITLE} description={DESCRIPTION}>
        <UtilitiesTab />
      </CustomRenderSummary>

      {children}
    </>
  );
};

export default UtilitiesLayout;
