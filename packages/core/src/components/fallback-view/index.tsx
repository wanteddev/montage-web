import { forwardRef, useMemo } from 'react';
import {
  type DefaultComponentPropsInternal,
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@montage-ui/engine';

import { FlexBox } from '../flex-box';
import { Button } from '../button';

import {
  FALLBACK_VIEW_ACTION_AREA_BUTTON_NAME,
  FALLBACK_VIEW_ACTION_AREA_NAME,
  FALLBACK_VIEW_CONTENT_NAME,
  FALLBACK_VIEW_IMAGE_NAME,
  FALLBACK_VIEW_NAME,
  FALLBACK_VIEW_TEXT_NAME,
} from './constants';
import {
  fallbackViewContentStyle,
  fallbackViewImageStyle,
  fallbackViewStyle,
} from './style';
import { FallbackViewProvider, useFallbackViewContext } from './contexts';
import { getFallbackViewButtonSize } from './helpers';

import type { ElementType, ForwardedRef } from 'react';
import type {
  FallbackViewActionAreaButtonProps,
  FallbackViewActionAreaProps,
  FallbackViewContentProps,
  FallbackViewImageProps,
  FallbackViewProps,
  FallbackViewTextProps,
} from './types';

const FallbackView = forwardRef(
  <T extends ElementType = 'div'>(
    {
      as,
      platform = 'desktop',
      padding = 'normal',
      width,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      ...props
    }: PolymorphicPropsInternal<FallbackViewProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FallbackViewProvider
        platform={platform}
        responsive={{ xs, sm, md, lg, xl }}
      >
        <FlexBox
          as={as || 'div'}
          ref={ref}
          flexDirection="column"
          alignItems="center"
          sx={[
            fallbackViewStyle({
              platform,
              padding,
              width,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      </FallbackViewProvider>
    );
  },
) as PolymorphicComponentInternal<FallbackViewProps, 'div'>;

FallbackView.displayName = FALLBACK_VIEW_NAME;

/**
 * @deprecated Fallback view is not display image
 */
const FallbackViewImage = forwardRef(
  (
    props: DefaultComponentPropsInternal<FallbackViewImageProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const context = useFallbackViewContext(FALLBACK_VIEW_IMAGE_NAME);

    return (
      <FlexBox
        ref={ref}
        data-component="fallback-view-image"
        justifyContent="center"
        alignItems="center"
        {...props}
        sx={[fallbackViewImageStyle(context), props.sx]}
      />
    );
  },
);

FallbackViewImage.displayName = FALLBACK_VIEW_IMAGE_NAME;

const FallbackViewContent = forwardRef(
  (
    props: DefaultComponentPropsInternal<FallbackViewContentProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        data-component="fallback-view-content"
        flexDirection="column"
        alignItems="center"
        gap="24px"
        {...props}
        sx={[fallbackViewContentStyle, props.sx]}
      />
    );
  },
);

FallbackViewContent.displayName = FALLBACK_VIEW_CONTENT_NAME;

const FallbackViewText = forwardRef(
  (
    {
      title,
      description,
      ...props
    }: DefaultComponentPropsInternal<FallbackViewTextProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox ref={ref} flexDirection="column" gap="12px" {...props}>
        {title && <span data-role="fallback-view-text-title">{title}</span>}
        <span data-role="fallback-view-text-description">{description}</span>
      </FlexBox>
    );
  },
);

FallbackViewText.displayName = FALLBACK_VIEW_TEXT_NAME;

const FallbackViewActionArea = forwardRef(
  (
    {
      variant = 'single',
      ...props
    }: DefaultComponentPropsInternal<FallbackViewActionAreaProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        flexDirection={variant === 'vertical' ? 'column' : 'row'}
        data-component="fallback-view-action-area"
        gap={
          variant === 'vertical'
            ? 'var(--fallback-view-action-area-vertical-gap)'
            : 'var(--fallback-view-action-area-horizontal-gap)'
        }
        {...props}
      />
    );
  },
);

FallbackViewActionArea.displayName = FALLBACK_VIEW_ACTION_AREA_NAME;

const FallbackViewActionAreaButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      ...props
    }: PolymorphicPropsInternal<FallbackViewActionAreaButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const context = useFallbackViewContext(
      FALLBACK_VIEW_ACTION_AREA_BUTTON_NAME,
    );

    const sizeProps = useMemo(
      () => getFallbackViewButtonSize(context, props),
      [context, props],
    );

    return (
      <Button
        as={(as || 'button') as ElementType}
        ref={ref}
        data-component="fallback-view-action-area-button"
        variant="outlined"
        color="assistive"
        {...props}
        {...sizeProps}
      />
    );
  },
) as PolymorphicComponentInternal<FallbackViewActionAreaButtonProps, 'button'>;

FallbackViewActionAreaButton.displayName =
  FALLBACK_VIEW_ACTION_AREA_BUTTON_NAME;

export {
  FallbackView,
  FallbackViewImage,
  FallbackViewContent,
  FallbackViewText,
  FallbackViewActionArea,
  FallbackViewActionAreaButton,
};

export type {
  FallbackViewProps,
  FallbackViewImageProps,
  FallbackViewContentProps,
  FallbackViewTextProps,
  FallbackViewActionAreaProps,
  FallbackViewActionAreaButtonProps,
};
