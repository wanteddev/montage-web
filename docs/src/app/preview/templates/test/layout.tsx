import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'Test — Preview',
  description: 'Test 템플릿 풀 화면 미리보기',
});

const TestPreviewLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default TestPreviewLayout;
