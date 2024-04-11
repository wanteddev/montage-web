'use client';
import { forwardRef } from 'react';

import { skeletonStyle } from './style';

import type { SkeletonProps } from './types';

const Skeleton: ReturnType<typeof forwardRef<HTMLDivElement, SkeletonProps>> =
  forwardRef<HTMLDivElement, SkeletonProps>(
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
        <div
          ref={ref}
          css={skeletonStyle({
            radius,
            variant,
            width,
            height,
            xs,
            sm,
            md,
            lg,
            xl,
          })}
          {...props}
        >
          <span />
        </div>
      );
    },
  );

Skeleton.displayName = 'Skeleton';

export default Skeleton;
