import { Suspense } from 'react';

import Playground from '@/features/playground/components/playground';
import PlaygroundFallback from '@/features/playground/components/fallback';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = createMetadata({
  title: 'Playground',
});

const PlaygroundPage = () => {
  return (
    <Suspense fallback={<PlaygroundFallback />}>
      <Playground />
    </Suspense>
  );
};

export default PlaygroundPage;
