import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import UtilitiesTab from '@/features/docs/components/utilities/tab';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

const TITLE = 'Utilities';
const DESCRIPTION =
  '파운데이션은 모든 디자인 요소의 기반이 되는 가장 원자적인 단위들입니다.\n컬러, 타이포그래피, 스페이싱, 그리드 등 시각적 언어의 최소 단위들로 구성됩니다.';

export const generateMetadata = (): Metadata =>
  createMetadata({
    title: TITLE,
    description: DESCRIPTION,
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
