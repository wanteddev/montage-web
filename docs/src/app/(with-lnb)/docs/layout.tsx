'use client';
import { useParams } from 'next/navigation';

import DocsSummary from '@/features/docs/components/summary';

import type { SlugParams } from '@/features/docs/components/lnb/types';

export const dynamic = 'force-static';

const DocsLayout = ({ children }: LayoutProps<'/docs'>) => {
  const { slug = [] } = useParams<SlugParams>();

  return (
    <>
      {slug.length !== 0 && <DocsSummary />}

      {children}
    </>
  );
};

export default DocsLayout;
