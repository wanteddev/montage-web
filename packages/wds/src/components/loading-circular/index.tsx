import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import FlexBox from '../flex-box';
import { loadingWantedStyle } from '../loading-wanted/style';

import { loadingCircularAnimatedSvgStyle } from './style';
import { LOADING_CIRCULAR_NAME } from './constants';

import type { ForwardedRef } from 'react';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { LoadingWantedProps } from '../loading-wanted/types';

const LoadingCircular = forwardRef(
  (
    {
      size = '32px',
      xl,
      lg,
      md,
      sm,
      xs,
      sx,
      ...props
    }: DefaultComponentProps<LoadingWantedProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        {...props}
        sx={[
          loadingWantedStyle({
            size,
            xl,
            lg,
            md,
            sm,
            xs,
          }),
          sx,
        ]}
      >
        <LoadingCircularAnimatedSvg />
      </FlexBox>
    );
  },
);

LoadingCircular.displayName = LOADING_CIRCULAR_NAME;

const LoadingCircularAnimatedSvg = () => {
  return (
    <Box
      as="svg"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      sx={loadingCircularAnimatedSvgStyle}
    >
      <circle cx="14" cy="14" r="12.5" />
    </Box>
  );
};

export default LoadingCircular;
