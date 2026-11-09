import { Box } from '@montage-ui/core';

import { cellContentStyle } from './style';

import type { PropsWithChildren } from 'react';

const CellContent = ({ children }: PropsWithChildren) => (
  <Box as="span" sx={cellContentStyle}>
    {children}
  </Box>
);

export default CellContent;
