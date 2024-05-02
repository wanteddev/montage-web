'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { skeletonStyle } from './style';

import type { SkeletonProps } from './types';

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangle',
      width = '100%',
      height = '22px',
      radius,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        {...props}
        sx={[
          skeletonStyle({
            radius,
            variant,
            width,
            height,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
      >
        <span />
      </Box>
    );
  },
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
