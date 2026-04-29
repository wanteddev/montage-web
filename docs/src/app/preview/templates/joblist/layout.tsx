import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Joblist — Preview',
  description: 'Joblist 템플릿 풀 화면 미리보기',
});

const JoblistPreviewLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default JoblistPreviewLayout;
