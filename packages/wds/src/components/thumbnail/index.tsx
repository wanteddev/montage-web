import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconImage } from '@wanteddev/wds-icon';

import { FlexBox } from '../flex-box';
import { Skeleton } from '../skeleton';
import { ImageBase } from '../image-base';

import { thumbnailStyle } from './style';
import { THUMBNAIL_NAME, THUMBNAIL_SKELETON_NAME } from './constants';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { ForwardedRef } from 'react';
import type { ThumbnailProps, ThumbnailSkeletonProps } from './types';

const Thumbnail = forwardRef<
  HTMLImageElement,
  DefaultComponentPropsInternal<ThumbnailProps, 'img'>
>(
  (
    {
      ratio = '4:3',
      portrait = false,
      radius,
      border,
      className,
      style,
      children,
      width,
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

    const prevSrc = useRef(props.src);

    useEffect(() => {
      if (prevSrc.current !== props.src) {
        prevSrc.current = props.src;
        setImageLoadingStatus('idle');
      }
    }, [props.src]);

    return imageLoadingStatus !== 'error' && Boolean(props.src) ? (
      <FlexBox
        as="figure"
        wds-component="thumbnail"
        className={className}
        style={style}
        sx={[
          thumbnailStyle({
            ratio,
            radius,
            border,
            width,
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
        <ImageBase
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
        wds-component="thumbnail"
        className={className}
        style={style}
        alignItems="center"
        justifyContent="center"
        sx={[
          thumbnailStyle({
            ratio,
            radius,
            border,
            width,
            portrait,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          { background: '#cccccc33', color: '#B2B2B233' },
          sx,
        ]}
      >
        <IconImage
          role="img"
          aria-label={props.alt}
          sx={{ width: '33.34%', height: 'auto' }}
        />
        {children}
      </FlexBox>
    );
  },
);

Thumbnail.displayName = THUMBNAIL_NAME;

const ThumbnailSkeleton = forwardRef(
  (
    {
      ratio,
      radius,
      border,
      portrait,
      width,
      xl,
      lg,
      md,
      sm,
      xs,
      sx,
      ...props
    }: DefaultComponentPropsInternal<ThumbnailSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Skeleton
        ref={ref}
        wds-component="thumbnail-skeleton"
        as="figure"
        variant="rectangle"
        {...props}
        sx={[
          thumbnailStyle({
            ratio,
            radius,
            border,
            portrait,
            width,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          sx,
        ]}
      />
    );
  },
);

ThumbnailSkeleton.displayName = THUMBNAIL_SKELETON_NAME;

export { Thumbnail, ThumbnailSkeleton };

export type { ThumbnailProps, ThumbnailSkeletonProps };
