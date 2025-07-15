import { forwardRef, useState } from 'react';
import { IconImage } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import { FlexBox } from '../flex-box';
import { Skeleton } from '../skeleton';

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
      'idle' | 'loading' | 'loaded' | 'error'
    >('idle');

    return imageLoadingStatus !== 'error' ? (
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
        <img
          ref={ref}
          {...props}
          onLoad={composeEventHandlers(props.onLoad, () => {
            setImageLoadingStatus('loaded');
          })}
          onError={composeEventHandlers(props.onError, () => {
            setImageLoadingStatus('error');
          })}
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
        <IconImage sx={{ width: '33.34%', height: 'auto' }} />
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
