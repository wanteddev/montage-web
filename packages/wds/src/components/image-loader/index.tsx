import { forwardRef, useEffect } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { getOptimizedImageSource } from '../../utils';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ImageLoaderProps } from './types';

const loadImage = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    const img = document.createElement('img');
    img.onerror = () => reject();
    img.onload = () => resolve();
    img.src = src;
  });
};

/**
 * @deprecated v3.0.0에서 제거될 예정입니다. <Box as="img" /> 사용을 권장합니다.
 */
const ImageLoader = forwardRef<
  HTMLImageElement,
  DefaultComponentProps<ImageLoaderProps, 'img'>
>(
  (
    {
      src,
      width,
      quality = 75,
      onError,
      onLoad,
      disableOptimize = false,
      ...props
    },
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
