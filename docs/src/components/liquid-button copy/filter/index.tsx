import { Box } from '@wanteddev/wds';

import type { DefaultComponentProps } from '@wanteddev/wds';

type Props = DefaultComponentProps<
  {
    filterId: string;
  },
  'svg'
>;

const Filter = ({ filterId, ...props }: Props) => {
  return (
    <Box
      as="svg"
      {...props}
      sx={[
        {
          display: 'none',
        },
        props.sx,
      ]}
    >
      <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.001"
          numOctaves="2"
          result="noise"
          stitchTiles="stitch"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
        <feDisplacementMap in="SourceGraphic" in2="blurred" scale="10" />
      </filter>
    </Box>
  );
};

export default Filter;
