'use client';

import Demo from '@/features/mdx/components/demo';

type Props = {
  initialCode?: string;
};

const Editor = ({ initialCode }: Props) => {
  return (
    <Demo
      hideCode
      code={initialCode ?? ''}
      sx={{
        ['& > div']: {
          padding: 0,
          border: 0,
        },
      }}
    />
  );
};

export default Editor;
