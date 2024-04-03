'use client';
import { forwardRef, useState } from 'react';

import ImageLoader from '../image-loader';

import { thumbnailStyle } from './style';

import type { Merge } from '../../types';
import type { ComponentProps } from 'react';
import type { ThumbnailProps } from './types';

type Props = Merge<ThumbnailProps, ComponentProps<typeof ImageLoader>>;

const Thumbnail = forwardRef<HTMLImageElement, Props>(
  ({ ratio = '1:1', portrait = false, xs, sm, md, lg, xl, ...props }, ref) => {
    const [imageLoadingStatus, setImageLoadingStatus] = useState<
      'idle' | 'loaded' | 'error'
    >('idle');

    const omitOthers = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { srcSet, sizes, ...others } = props;

      return others;
    };

    return imageLoadingStatus !== 'error' ? (
      <ImageLoader
        ref={ref}
        css={thumbnailStyle({ ratio, portrait, xs, sm, md, lg, xl })}
        {...props}
        onLoad={() => {
          props.onLoad?.();
          setImageLoadingStatus('loaded');
        }}
        onError={() => {
          props.onError?.();
          setImageLoadingStatus('error');
        }}
      />
    ) : (
      <ImageLoader
        ref={ref}
        css={thumbnailStyle({ ratio, portrait, xs, sm, md, lg, xl })}
        {...omitOthers()}
        alt={props.alt ? props.alt + ' load fail' : ''}
        src="https://static.wanted.co.kr/images/jobsfeed/Thumbnail.png"
      />
    );
  },
);

Thumbnail.displayName = 'Thumbnail';

export default Thumbnail;
