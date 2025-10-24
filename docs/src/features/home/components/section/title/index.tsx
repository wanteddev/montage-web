import React from 'react';
import { Box, type SxProp } from '@wanteddev/wds';

import { titleStyle } from './style';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  sx?: SxProp;
}>;

const SectionTitle = ({ children, sx }: Props) => {
  return (
    <Box as="h2" sx={[titleStyle, sx]}>
      {children}
    </Box>
  );
};

export default SectionTitle;
