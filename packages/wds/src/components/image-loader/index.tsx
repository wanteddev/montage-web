'use client';
import { forwardRef, useEffect } from 'react';
import { Box, type MergeElementProps } from '@wanteddev/wds-engine';

import { getOptimizedImageSource } from '../../utils';

import type { ImageLoaderProps } from './types';

type Props = MergeElementProps<'img', ImageLoaderProps>;

const loadImage = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    const img = document.createElement('img');
    img.onerror = () => reject();
    img.onload = () => resolve();
    img.src = src;
  });
};

const ImageLoader = forwardRef<HTMLImageElement, Props>(
  (
    {
      src,
      width,
      quality = 75,
      onError,
      onLoad,
      disableOptimize = false,
      ...props
    }: Props,
    ref,
  ) => {
    useEffect(() => {
      loadImage(getOptimizedImageSource({ src, width, quality }))
        .then(() => onLoad?.())
        .catch(() => onError?.());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, width, quality]);

    return (
      <Box
        as="img"
        ref={ref}
        src={
          !disableOptimize
            ? getOptimizedImageSource({ src, width, quality })
            : src
        }
        {...props}
      />
    );
  },
);

ImageLoader.displayName = 'ImageLoader';

export default ImageLoader;
