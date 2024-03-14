'use client';
import { forwardRef } from 'react';

import { getOptimizedImageSource } from '@/utils';

import type { MergeElementProps } from '@/types';
import type { ImageLoaderProps } from './types';

type Props = MergeElementProps<'img', ImageLoaderProps>;

const ImageLoader = forwardRef<HTMLImageElement, Props>(
  ({ src, width, quality = 75, ...props }: Props, ref) => {
    return (
      <img
        ref={ref}
        src={getOptimizedImageSource({ src, width, quality })}
        {...props}
      />
    );
  },
);

ImageLoader.displayName = 'ImageLoader';

export default ImageLoader;
