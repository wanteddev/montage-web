'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { skeletonStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { SkeletonProps } from './types';

const Skeleton = forwardRef(
  <E extends ElementType = 'div'>(
    {
      variant = 'text',
      width = '100%',
      height = '22px',
      align = 'left',
      opacity = 'inherit',
      radius,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<SkeletonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Box
        ref={ref}
        {...props}
        sx={[
          skeletonStyle({
            radius,
            opacity,
            variant,
            width,
            align,
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
) as PolymorphicComponent<SkeletonProps, 'div'>;

Skeleton.displayName = 'Skeleton';

export default Skeleton;
