import type { ImgHTMLAttributes } from 'react';

export type ImageBaseProps = {
  onLoad?: () => void;
  onError?: () => void;
  onAbort?: () => void;
  src?: ImgHTMLAttributes<HTMLImageElement>['src'];
  srcSet?: ImgHTMLAttributes<HTMLImageElement>['srcSet'];
  alt?: ImgHTMLAttributes<HTMLImageElement>['alt'];
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>['referrerPolicy'];
  crossOrigin?: ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
};
