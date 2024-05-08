'use client';
import { forwardRef, useState } from 'react';

import ImageLoader from '../image-loader';

import { thumbnailStyle } from './style';

import type { Merge } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';
import type { ThumbnailProps } from './types';

type Props = Merge<
  ThumbnailProps,
  ComponentPropsWithoutRef<typeof ImageLoader>
>;

const Thumbnail = forwardRef<HTMLImageElement, Props>(
  (
    {
      ratio = '4:3',
      portrait = false,
      radius,
      border,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
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
        {...props}
        sx={[
          thumbnailStyle({
            ratio,
            radius,
            border,
            width: props.width,
            portrait,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
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
        {...omitOthers()}
        sx={[
          thumbnailStyle({
            ratio,
            radius,
            border,
            portrait,
            width: props.width,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          omitOthers().sx,
        ]}
        alt={props.alt ? props.alt + ' load fail' : ''}
        src="https://static.wanted.co.kr/images/jobsfeed/Thumbnail.png"
      />
    );
  },
);

Thumbnail.displayName = 'Thumbnail';

export default Thumbnail;
