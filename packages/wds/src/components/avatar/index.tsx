import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  IconCompany,
  IconGraduation,
  IconPersonFill,
} from '@wanteddev/wds-icon';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { avatarWrapperStyle, fallbackWrapperStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { AvatarProps } from './types';

const Avatar = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AvatarProps, 'img'>
>(
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

    const hasImage = (value: AvatarProps) =>
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
          <img
            {...props}
            onLoad={composeEventHandlers(props.onLoad, () => {
              setImageLoadingStatus('loaded');
            })}
            onError={composeEventHandlers(props.onError, () => {
              setImageLoadingStatus('error');
            })}
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

export { Avatar };

export type { AvatarProps };
