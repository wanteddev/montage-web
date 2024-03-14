'use client';
import { forwardRef, useState } from 'react';
import { IconPersonFill } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import ImageLoader from '../image-loader';

import { avatarWrapperStyle, fallbackWrapperStyle } from './style';

import type { ComponentProps, PropsWithChildren } from 'react';
import type { AvatarProps } from './types';

type Props = PropsWithChildren<AvatarProps>;

const Avatar = forwardRef<HTMLDivElement, Props>(
  (
    {
      size = 'large',
      variant = 'circle',
      fallback = <IconPersonFill />,
      xs,
      sm,
      md,
      lg,
      children,
      ...props
    },
    ref,
  ) => {
    const [imageLoadingStatus, setImageLoadingStatus] = useState<
      'idle' | 'loaded' | 'error'
    >('idle');

    const hasImage = (
      value: AvatarProps,
    ): value is ComponentProps<typeof ImageLoader> =>
      'src' in value && Boolean(value.src);

    return (
      <div
        ref={ref}
        wds-component="avatar"
        css={avatarWrapperStyle({ size, variant, xs, sm, md, lg })}
      >
        {imageLoadingStatus !== 'error' && hasImage(props) ? (
          <ImageLoader
            quality={90}
            {...props}
            width={props.width ? props.width : '80px'}
            onLoad={composeEventHandlers(props.onLoad, () =>
              setImageLoadingStatus('loaded'),
            )}
            onError={composeEventHandlers(props.onError, () =>
              setImageLoadingStatus('error'),
            )}
          />
        ) : (
          <div css={fallbackWrapperStyle}>{fallback}</div>
        )}
        {children}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
