import { Divider } from '@wanteddev/wds';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import TokenExample from '../token-example';

import ShadowGrid from './shadow-grid';
import StyleGrid from './style-grid';

const SPREAD_TOKENS = ['Small', 'Medium'] as const;

const FoundationsElevationSpread = () => {
  return (
    <>
      <TokenExample
        items={SPREAD_TOKENS.map((token) => ({
          token,
          src: `/foundations/elevation/spread/${token}.png`,
        }))}
      />

      <Divider
        color="semantic.line.normal.alternative"
        sx={{ '&&': { marginBottom: '24px' } }}
      />

      <Heading2 content="Style" />

      <StyleGrid />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Token" />

      <ShadowGrid />
    </>
  );
};

export default FoundationsElevationSpread;
