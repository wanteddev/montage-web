import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { skeletonStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { SkeletonProps } from './types';

const Skeleton = forwardRef(
  <E extends ElementType = 'div'>(
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
    }: PolymorphicProps<SkeletonProps, E>,
    ref: ForwardedRef<E>,
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
) as PolymorphicComponent<SkeletonProps, 'div'>;

Skeleton.displayName = 'Skeleton';

export default Skeleton;
