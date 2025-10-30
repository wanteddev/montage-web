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
      <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
        <feOffset in="SourceGraphic" dx="2" dy="0" result="offsetR" />
        <feColorMatrix
          in="offsetR"
          type="matrix"
          values={`1 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 1 0`}
          result="redChannel"
        />

        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values={`0 0 0 0 0\n0 1 0 0 0\n0 0 0 0 0\n0 0 0 1 0`}
          result="greenChannel"
        />

        <feOffset in="SourceGraphic" dx="-2" dy="0" result="offsetB" />
        <feColorMatrix
          in="offsetB"
          type="matrix"
          values={`0 0 0 0 0\n0 0 0 0 0\n0 0 1 0 0\n0 0 0 1 0`}
          result="blueChannel"
        />

        <feBlend in="redChannel" in2="greenChannel" mode="screen" result="rb" />
        <feBlend in="rb" in2="blueChannel" mode="screen" />
      </filter>
    </Box>
  );
};

export default Filter;
