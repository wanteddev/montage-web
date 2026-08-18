export const PLAYGROUND_QUERY_KEY = {
  code: 'code',
  transparent: 'transparent',
  showCode: 'showCode',
} as const;

export const PLAYGROUND_DEFAULT_CODE = `import { FlexBox, Typography } from '@montage-ui/core';

const Demo = () => {
  return (
    <FlexBox flexDirection="column" gap="16px">
      <Typography variant="title3" weight="bold">
        Playground
      </Typography>
    </FlexBox>
  );
};

export default Demo;
`;
