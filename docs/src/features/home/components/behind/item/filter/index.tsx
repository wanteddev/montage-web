import { Box } from '@wanteddev/wds';

import { blueMatrix, greenMatrix, redMatrix } from './constants';

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
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        },
        props.sx,
      ]}
    >
      <defs>
        <filter
          id={filterId}
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="linearRGB"
        >
          <feOffset in="SourceGraphic" dx="1" dy="0" result="offsetR" />
          <feColorMatrix
            in="offsetR"
            type="matrix"
            values={redMatrix}
            result="redChannel"
          />

          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values={greenMatrix}
            result="greenChannel"
          />

          <feOffset in="SourceGraphic" dx="-1" dy="0" result="offsetB" />
          <feColorMatrix
            in="offsetB"
            type="matrix"
            values={blueMatrix}
            result="blueChannel"
          />

          <feBlend
            in="redChannel"
            in2="greenChannel"
            mode="screen"
            result="rb"
          />
          <feBlend in="rb" in2="blueChannel" mode="screen" />
        </filter>
      </defs>
    </Box>
  );
};

export default Filter;
