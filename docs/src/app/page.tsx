'use client';

import { Button, FlexBox } from '@wanteddev/wds';
import { useRouter } from 'next/navigation';

const RootPage = () => {
  const router = useRouter();

  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      css={{ width: '100%' }}
      sm={{
        css: { padding: '0px 0px 20px 20px', width: 'calc(100% - 250px)' },
      }}
      md={{
        css: {
          padding: '0px 20px 20px 20px',
          width: 'calc(100% - 250px - 150px)',
        },
      }}
    >
      <Button
        variant="solid"
        size="medium"
        onClick={() => router.push('/docs/overview/getting-started')}
      >
        문서 확인하기
      </Button>
    </FlexBox>
  );
};

export default RootPage;
