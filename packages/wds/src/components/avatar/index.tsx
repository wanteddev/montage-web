import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  IconCompany,
  IconGraduation,
  IconPersonFill,
} from '@wanteddev/wds-icon';
import { Box } from '@wanteddev/wds-engine';

import ImageLoader from '../image-loader';

import { avatarWrapperStyle, fallbackWrapperStyle } from './style';

import type { ComponentProps, PropsWithChildren } from 'react';
import type { AvatarProps } from './types';

type Props = PropsWithChildren<AvatarProps>;

const Avatar = forwardRef<HTMLDivElement, Props>(
  (
    {
      size = 'small',
      variant = 'person',
      className,
      style,
      sx,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      ...props
    },
    ref,
  ) => {
    const getDefaultFallback = () => {
      switch (variant) {
        case 'person':
          return <IconPersonFill />;
        case 'academy':
          return <IconGraduation />;
        case 'company':
          return <IconCompany />;
      }
    };

    const [imageLoadingStatus, setImageLoadingStatus] = useState<
      'idle' | 'loaded' | 'error'
    >('idle');

    const hasImage = (
      value: AvatarProps,
    ): value is ComponentProps<typeof ImageLoader> =>
      'src' in value && Boolean(value.src);

    const prevSrc = useRef(props.src);

    useEffect(() => {
      if (prevSrc.current !== props.src) {
        prevSrc.current = props.src;
        setImageLoadingStatus('idle');
      }
    }, [props.src]);

    return (
      <Box
        ref={ref}
        className={className}
        wds-component="avatar"
        sx={[avatarWrapperStyle({ size, variant, xs, sm, md, lg, xl }), sx]}
        data-state={imageLoadingStatus}
        style={style}
      >
        {imageLoadingStatus !== 'error' && hasImage(props) ? (
          <ImageLoader
            quality={90}
            {...props}
            width={props.width ? props.width : '80px'}
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
          <Box data-role="avatar-fallback" sx={fallbackWrapperStyle}>
            {getDefaultFallback()}
          </Box>
        )}
        {children}
      </Box>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
