import type { ImageLoaderProps } from '../components/image-loader/types';

export const getOptimizedImageSource = ({
  src,
  width,
  quality = 75,
}: Pick<ImageLoaderProps, 'src' | 'width' | 'quality'>) =>
  /^https\:\/\/.+\.wanted(\.co\.kr|\.com|\.jobs)/.test(src)
    ? `https://image.wanted.co.kr/optimize?src=${encodeURIComponent(
        src,
      )}&w=${width}&q=${quality}`
    : src;
