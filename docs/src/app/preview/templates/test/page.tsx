'use client';
import { Box } from '@wanteddev/wds';

import { useReactDemoRunner } from '@/features/docs/components/mdx/demo/hooks';
import { TEST_SOURCE_CODE } from '@/features/docs/components/templates/test/constants';

const TestPreviewPage = () => {
  const { element } = useReactDemoRunner({ code: TEST_SOURCE_CODE });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        '& > *': {
          width: '100% !important',
          borderRadius: '0 !important',
        },
        '& > * > header > div, & > * > div, & > * > footer > div': {
          maxWidth: '1440px',
          margin: '0 auto',
        },
      }}
    >
      {element}
    </Box>
  );
};

export default TestPreviewPage;
