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
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10"
          result="effect1_foregroundBlur_5583_23943"
        />
      </filter>
    </Box>
  );
};

export default Filter;
