'use client';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { useSearchParams } from 'next/navigation';

import Editor from '@/features/playground/components/editor';

const PlaygroundPage = () => {
  const searchParams = useSearchParams();

  const initialCode = decompressFromEncodedURIComponent(
    searchParams.get('code')?.toString() ?? '',
  );

  return <Editor initialCode={initialCode} />;
};

export default PlaygroundPage;
