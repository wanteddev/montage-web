import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  IconCompanyFill,
  IconGraduationFill,
  IconPersonFill,
} from '@montage-ui/icon';
import { Box } from '@montage-ui/engine';

import { ImageBase } from '../image-base';

import { avatarWrapperStyle, fallbackWrapperStyle } from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
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
      alt,
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
    const defaultFallback = useMemo(() => {
      switch (variant) {
        case 'person':
          return <IconPersonFill aria-hidden />;
        case 'academy':
          return <IconGraduationFill aria-hidden />;
        case 'company':
          return <IconCompanyFill aria-hidden />;
      }
    }, [variant]);

    const defaultAltText = useMemo(() => {
      if (Boolean(alt)) {
        return alt;
      }

      switch (variant) {
        case 'person':
          return '프로필 이미지';
        case 'academy':
          return '학원 로고';
        case 'company':
          return '회사 로고';
      }
    }, [variant, alt]);

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

    return (
      <Box
        ref={ref}
        className={className}
        data-component="avatar"
        sx={[avatarWrapperStyle({ size, variant, xs, sm, md, lg, xl }), sx]}
        data-state={imageLoadingStatus}
        style={style}
      >
        {imageLoadingStatus !== 'error' && Boolean(props.src) ? (
          <ImageBase
            {...props}
            role="img"
            alt={defaultAltText}
            aria-label={props['aria-label'] ?? defaultAltText}
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
          <Box
            role="img"
            data-role="avatar-fallback"
            sx={fallbackWrapperStyle}
            aria-label={props['aria-label'] ?? defaultAltText}
          >
            {defaultFallback}
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
