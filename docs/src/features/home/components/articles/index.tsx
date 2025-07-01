import { Box, FlexBox } from '@wanteddev/wds';

import { breakWordStyle } from '@/styles/text';

import { homeTitleStyle } from '../../helpers';

const Articles = () => {
  return (
    <FlexBox flexDirection="column" as="section">
      <Box as="h2" sx={[homeTitleStyle, breakWordStyle]}>
        Articles
      </Box>
    </FlexBox>
  );
};

export default Articles;
