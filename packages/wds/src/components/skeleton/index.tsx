'use client';
import { forwardRef } from 'react';

import { skeletonStyle } from './style';

import type { SkeletonProps } from './types';

const Skeleton: ReturnType<typeof forwardRef<HTMLDivElement, SkeletonProps>> =
  forwardRef<HTMLDivElement, SkeletonProps>(
    ({ width = '100%', height = '22px', xs, sm, md, lg, ...props }, ref) => {
      return (
        <div
          ref={ref}
          css={skeletonStyle({ width, height, xs, sm, md, lg })}
          {...props}
        />
      );
    },
  );

Skeleton.displayName = 'Skeleton';

export default Skeleton;
