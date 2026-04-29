'use client';
import { Box } from '@wanteddev/wds';

import { useReactDemoRunner } from '@/features/docs/components/mdx/demo/hooks';
import { JOBLIST_SOURCE_CODE } from '@/features/docs/components/templates/joblist/constants';

const JoblistPreviewPage = () => {
  const { element } = useReactDemoRunner({ code: JOBLIST_SOURCE_CODE });

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

export default JoblistPreviewPage;
