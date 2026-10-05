import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  IconCompanyFill,
  IconGraduationFill,
  IconPersonFill,
} from '@montage-ui/icon';
import { Box } from '@montage-ui/engine';

import { ImageBase } from '../image-base';
import { useInheritedSize } from '../../hooks/internal/use-slot-defaults';

import {
  avatarWrapperStyle,
  fallbackIconStyle,
  fallbackSurfaceStyle,
  fallbackWrapperStyle,
} from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { AvatarProps } from './types';

/**
 * Fallback icon occupies 2/3 of the avatar, centered.
 */
const FALLBACK_ICON_RECT = {
  x: `${100 / 6}%`,
  y: `${100 / 6}%`,
  width: `${200 / 3}%`,
  height: `${200 / 3}%`,
};

const Avatar = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AvatarProps, 'img'>
>(
  (
    {
      size: originSize,
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
    const { size: inheritedSize, responsive } = useInheritedSize(
      'Avatar',
      originSize,
      { xs, sm, md, lg, xl },
    );
    const size = inheritedSize ?? 'small';

    const FallbackIcon = useMemo(() => {
      switch (variant) {
        case 'person':
          return IconPersonFill;
        case 'academy':
          return IconGraduationFill;
        case 'company':
          return IconCompanyFill;
      }
    }, [variant]);

    const fallbackMaskId = useId();

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
        sx={[avatarWrapperStyle({ size, variant, ...responsive }), sx]}
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
            {/**
             * The surface is cut out by the icon silhouette (destination-out),
             * so the icon is drawn directly over the avatar background.
             */}
            <svg width="100%" height="100%" aria-hidden>
              <mask id={fallbackMaskId}>
                <rect width="100%" height="100%" fill="white" />
                <FallbackIcon {...FALLBACK_ICON_RECT} color="black" />
              </mask>
              <Box
                as="rect"
                width="100%"
                height="100%"
                mask={`url(#${fallbackMaskId})`}
                sx={fallbackSurfaceStyle}
              />
              <FallbackIcon {...FALLBACK_ICON_RECT} sx={fallbackIconStyle} />
            </svg>
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
