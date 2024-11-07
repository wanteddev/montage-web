import { forwardRef } from 'react';
import {
  Box,
  type DefaultComponentProps,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Typography from '../typography';
import { Thumbnail, ThumbnailSkeleton } from '../thumbnail';
import Skeleton from '../skeleton';

import {
  CARD_CAPTION_NAME,
  CARD_CAPTION_SKELETON_NAME,
  CARD_CONTENT_NAME,
  CARD_EXTRA_CONTENT_NAME,
  CARD_EXTRA_CONTENT_SKELETON_NAME,
  CARD_NAME,
  CARD_SKELETON_NAME,
  CARD_THUMBNAIL_CONTENT_NAME,
  CARD_THUMBNAIL_NAME,
  CARD_THUMBNAIL_SKELETON_NAME,
  CARD_TITLE_NAME,
  CARD_TITLE_SKELETON_NAME,
} from './constants';
import {
  cardExtraContentStyle,
  cardStyle,
  cardThumbnailContentTextStyle,
  cardThumbnailContentToggleIconStyle,
  cardThumbnailContentWrapperStyle,
  cardThumbnailOverlayStyle,
  cardThumbnailStyle,
} from './style';

import type { TypographyProps } from '../typography/types';
import type { SkeletonProps } from '../skeleton/types';
import type { ThumbnailSkeletonProps } from '../thumbnail/types';
import type { PolymorphicComponent } from '@wanteddev/wds-engine';
import type {
  CardCaptionSkeletonProps,
  CardContentProps,
  CardExtraContentProps,
  CardProps,
  CardThumbnailContentProps,
  CardThumbnailProps,
} from './types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';

const Card = forwardRef(
  <E extends ElementType = 'div'>(
    {
      platform = 'desktop',
      width,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      ...props
    }: PolymorphicProps<CardProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        flexDirection="column"
        gap="12px"
        {...props}
        sx={[cardStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
      />
    );
  },
) as PolymorphicComponent<CardProps, 'div'>;

Card.displayName = CARD_NAME;

const CardThumbnail = forwardRef<HTMLDivElement, CardThumbnailProps>(
  ({ overlay, leftContent, rightContent, width, sx, ...props }, ref) => {
    const hasLeftContent = Boolean(leftContent);
    const hasRightContent = Boolean(rightContent);
    const hasContent = hasLeftContent || hasRightContent;

    return (
      <Box
        ref={ref}
        wds-component="card-thumbnail"
        {...props}
        sx={[cardThumbnailStyle, sx]}
      >
        {overlay && (
          <Box
            data-role="card-thumbnail-overlay"
            sx={cardThumbnailOverlayStyle}
          />
        )}
        {hasContent && (
          <FlexBox
            gap="4px"
            data-role="card-thumbnail-content-wrapper"
            alignItems="flex-start"
            justifyContent="space-between"
            sx={cardThumbnailContentWrapperStyle}
          >
            {hasLeftContent && leftContent}
            {hasRightContent && rightContent}
          </FlexBox>
        )}
        <Thumbnail width={width} radius border {...props} />
      </Box>
    );
  },
);

CardThumbnail.displayName = CARD_THUMBNAIL_NAME;

const CardThumbnailContent = forwardRef(
  (
    {
      variant = 'custom',
      sx,
      ...props
    }: DefaultComponentProps<CardThumbnailContentProps, 'span'>,
    ref: ForwardedRef<ElementRef<'span'>>,
  ) => {
    switch (variant) {
      case 'text':
        return (
          <FlexBox
            ref={ref}
            as="span"
            flex="1"
            data-role="card-thumbnail-content-text"
            {...props}
            sx={[cardThumbnailContentTextStyle, sx]}
          />
        );

      case 'toggle-icon':
        return (
          <FlexBox
            ref={ref}
            as="span"
            data-role="card-thumbnail-content-toggle-icon"
            {...props}
            sx={[cardThumbnailContentToggleIconStyle, sx]}
          />
        );

      case 'custom':
        return <FlexBox ref={ref} as="span" {...props} sx={sx} />;
    }
  },
);

CardThumbnailContent.displayName = CARD_THUMBNAIL_CONTENT_NAME;

const CardContent = forwardRef(
  (
    props: DefaultComponentProps<CardContentProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return (
      <FlexBox
        wds-component="card-content"
        ref={ref}
        flexDirection="column"
        gap="4px"
        {...props}
      />
    );
  },
);

CardContent.displayName = CARD_CONTENT_NAME;

const CardExtraContent = forwardRef(
  (
    {
      sx,
      position,
      variant,
      ...props
    }: DefaultComponentProps<CardExtraContentProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        {...props}
        sx={[cardExtraContentStyle({ position, variant }), sx]}
      />
    );
  },
);

CardExtraContent.displayName = CARD_EXTRA_CONTENT_NAME;

const CardTitle = forwardRef(
  <E extends ElementType = 'span'>(
    props: PolymorphicProps<TypographyProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Typography
        ref={ref}
        wds-component="card-title"
        variant="body1_normal"
        weight="bold"
        {...props}
      />
    );
  },
) as PolymorphicComponent<TypographyProps, 'span'>;

CardTitle.displayName = CARD_TITLE_NAME;

const CardCaption = forwardRef(
  <E extends ElementType = 'span'>(
    props: PolymorphicProps<TypographyProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Typography
        ref={ref}
        variant="label2"
        weight="medium"
        color="palette.label.alternative"
        {...props}
      />
    );
  },
) as PolymorphicComponent<TypographyProps, 'span'>;

CardCaption.displayName = CARD_CAPTION_NAME;

const CardSkeleton = Card;

CardSkeleton.displayName = CARD_SKELETON_NAME;

const CardThumbnailSkeleton = forwardRef(
  (
    props: DefaultComponentProps<ThumbnailSkeletonProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return <ThumbnailSkeleton ref={ref} radius {...props} />;
  },
);

CardThumbnailSkeleton.displayName = CARD_THUMBNAIL_SKELETON_NAME;

const CardExtraContentSkeleton = forwardRef(
  (
    props: DefaultComponentProps<SkeletonProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return (
      <Skeleton
        ref={ref}
        variant="rectangle"
        radius="3px"
        width="48px"
        height="20px"
        {...props}
      />
    );
  },
);

CardExtraContentSkeleton.displayName = CARD_EXTRA_CONTENT_SKELETON_NAME;

const CardTitleSkeleton = forwardRef(
  (
    props: DefaultComponentProps<SkeletonProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return <Skeleton ref={ref} width="100%" height="24px" {...props} />;
  },
);

CardTitleSkeleton.displayName = CARD_TITLE_SKELETON_NAME;

const CardCaptionSkeleton = forwardRef(
  (
    {
      type = 'normal',
      ...props
    }: DefaultComponentProps<CardCaptionSkeletonProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return (
      <Skeleton
        ref={ref}
        width={type === 'extra' ? '114px' : '57px'}
        height={type === 'extra' ? '18px' : '16px'}
        {...props}
      />
    );
  },
);

CardCaptionSkeleton.displayName = CARD_CAPTION_SKELETON_NAME;

export {
  Card,
  CardThumbnail,
  CardThumbnailContent,
  CardContent,
  CardTitle,
  CardCaption,
  CardExtraContent,
  CardSkeleton,
  CardThumbnailSkeleton,
  CardExtraContentSkeleton,
  CardTitleSkeleton,
  CardCaptionSkeleton,
};
