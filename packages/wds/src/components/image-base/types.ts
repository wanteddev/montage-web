import type { Merge } from '@wanteddev/wds-engine';
import type { ImgHTMLAttributes } from 'react';

export type ImageBaseProps = Merge<
  {
    onLoad?: () => void;
    onError?: () => void;
    onAbort?: () => void;
  },
  Pick<
    ImgHTMLAttributes<HTMLImageElement>,
    | 'src'
    | 'srcSet'
    | 'alt'
    | 'referrerPolicy'
    | 'crossOrigin'
    | 'fetchPriority'
  >
>;
