import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Explore — Preview',
  description: 'Explore 템플릿 풀 화면 미리보기',
});

const ResearchPreviewLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ResearchPreviewLayout;
