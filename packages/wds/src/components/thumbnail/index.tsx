'use client';
import { forwardRef, useState } from 'react';

import ImageLoader from '../image-loader';
import FlexBox from '../flex-box';

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
      className,
      style,
      children,
      sx,
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
      <FlexBox
        as="figure"
        className={className}
        style={style}
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
          sx,
        ]}
      >
        <ImageLoader
          ref={ref}
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
        {children}
      </FlexBox>
    ) : (
      <FlexBox
        as="figure"
        className={className}
        style={style}
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
          sx,
        ]}
      >
        <ImageLoader
          ref={ref}
          {...omitOthers()}
          alt={props.alt ? props.alt + ' load fail' : ''}
          src="https://static.wanted.co.kr/images/jobsfeed/Thumbnail.png"
        />
        {children}
      </FlexBox>
    );
  },
);

Thumbnail.displayName = 'Thumbnail';

export default Thumbnail;
