import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconImage } from '@wanteddev/wds-icon';
import { Box, type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';
import { Skeleton } from '../skeleton';
import { ImageBase } from '../image-base';

import { thumbnailStyle } from './style';
import { THUMBNAIL_NAME, THUMBNAIL_SKELETON_NAME } from './constants';

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
      overlay,
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setImageLoadingStatus('idle');
      }
    }, [props.src]);

    return imageLoadingStatus !== 'error' && Boolean(props.src) ? (
      <FlexBox
        as="figure"
        wds-component="thumbnail"
        className={className}
        style={style}
        data-status={imageLoadingStatus}
        aria-label={props.alt}
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
          aria-hidden
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
        {overlay && <Box data-role="thumbnail-overlay">{overlay}</Box>}
        {children}
      </FlexBox>
    ) : (
      <FlexBox
        as="figure"
        wds-component="thumbnail"
        className={className}
        style={style}
        aria-label={props.alt}
        data-status={imageLoadingStatus}
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
        <IconImage aria-hidden sx={{ width: '33.34%', height: 'auto' }} />
        {overlay && <Box data-role="thumbnail-overlay">{overlay}</Box>}
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
        aria-hidden
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
