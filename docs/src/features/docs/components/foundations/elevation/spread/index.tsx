'use client';
import { Box, Typography } from '@wanteddev/wds';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import TokenExample from '../token-example';

import StyleGrid from './style-grid';
import { SPREAD_TOKENS } from './constants';
import { tokenContentStyle } from './style';

const FoundationsElevationSpread = () => {
  return (
    <>
      <TokenExample
        items={SPREAD_TOKENS.map((token) => ({
          token: token.token,
          src: `/foundations/elevation/spread/${token.key}.png`,
          key: token.key,
          render: (
            <Box sx={tokenContentStyle}>
              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.neutral"
              >
                Value
              </Typography>
              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.neutral"
              >
                {token.value}
              </Typography>
            </Box>
          ),
        }))}
      />

      <Heading2
        content="Style"
        sx={{ '&&:first-of-type': { marginTop: '120px' } }}
      />

      <StyleGrid />
    </>
  );
};

export default FoundationsElevationSpread;
