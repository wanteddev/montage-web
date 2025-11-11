import { Box, ScrollArea, Typography } from '@wanteddev/wds';

import { gridCellStyle, gridHeadCellStyle, gridHeaderStyle } from './style';

import type { SxProp } from '@wanteddev/wds';
import type { PropsWithChildren } from 'react';

type WithSxProps<T> = T & { sx?: SxProp };

const TokenGrid = ({ children, sx }: WithSxProps<PropsWithChildren>) => {
  return (
    <ScrollArea>
      <Box as="table" sx={[{ width: '100%' }, sx]}>
        {children}
      </Box>
    </ScrollArea>
  );
};

const TokenGridHeader = ({ children, sx }: WithSxProps<PropsWithChildren>) => {
  return (
    <Box as="thead" sx={[gridHeaderStyle, sx]}>
      {children}
    </Box>
  );
};

const TokenGridHead = ({ children, sx }: WithSxProps<PropsWithChildren>) => {
  return (
    <Typography
      as="th"
      variant="label2"
      weight="bold"
      color="semantic.label.alternative"
      align="left"
      sx={[gridHeadCellStyle, sx]}
    >
      {children}
    </Typography>
  );
};

const TokenGridBody = ({ children, sx }: WithSxProps<PropsWithChildren>) => {
  return (
    <Box as="tbody" sx={sx}>
      {children}
    </Box>
  );
};

const TokenGridRow = ({ children, sx }: WithSxProps<PropsWithChildren>) => {
  return (
    <Box as="tr" sx={sx}>
      {children}
    </Box>
  );
};

const TokenGridCell = ({ children, sx }: WithSxProps<PropsWithChildren>) => {
  return (
    <Typography
      variant="body2"
      weight="medium"
      color="semantic.label.normal"
      align="left"
      as="td"
      sx={[gridCellStyle, sx]}
    >
      {children}
    </Typography>
  );
};

export {
  TokenGrid,
  TokenGridHeader,
  TokenGridHead,
  TokenGridRow,
  TokenGridCell,
  TokenGridBody,
};
