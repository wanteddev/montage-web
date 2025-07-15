import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { skeletonStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { SkeletonProps } from './types';

const Skeleton = forwardRef(
  <T extends ElementType = 'div'>(
    {
      variant = 'text',
      width,
      height,
      align = 'left',
      color,
      opacity = 'opacity.100',
      radius,
      animation = true,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<SkeletonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        ref={ref}
        {...props}
        sx={[
          skeletonStyle({
            radius,
            color,
            opacity,
            variant,
            width,
            align,
            height,
            animation,
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
) as PolymorphicComponentInternal<SkeletonProps, 'div'>;

Skeleton.displayName = 'Skeleton';

export { Skeleton };

export type { SkeletonProps };
