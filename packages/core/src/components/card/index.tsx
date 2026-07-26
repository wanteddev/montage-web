import { forwardRef, useMemo } from 'react';
import { Box } from '@montage-ui/engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { FlexBox } from '../flex-box';
import { Thumbnail, ThumbnailSkeleton } from '../thumbnail';
import { Skeleton } from '../skeleton';
import { Typography } from '../typography';

import {
  CARD_BODY_NAME,
  CARD_CAPTION_NAME,
  CARD_CAPTION_SKELETON_NAME,
  CARD_NAME,
  CARD_ROW_NAME,
  CARD_ROW_SKELETON_NAME,
  CARD_SKELETON_NAME,
  CARD_THUMBNAIL_CONTENT_NAME,
  CARD_THUMBNAIL_NAME,
  CARD_THUMBNAIL_SKELETON_NAME,
  CARD_TITLE_NAME,
  CARD_TITLE_SKELETON_NAME,
} from './constants';
import {
  cardBodyStyle,
  cardCaptionStyle,
  cardRowStyle,
  cardSkeletonStyle,
  cardStyle,
  cardThumbnailContentTextStyle,
  cardThumbnailContentToggleIconStyle,
  cardThumbnailContentWrapperStyle,
  cardThumbnailSkeletonStyle,
  cardThumbnailStyle,
  cardTitleSkeletonStyle,
  cardTitleStyle,
} from './style';

import type {
  DefaultComponentPropsInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { PolymorphicComponentInternal } from '@montage-ui/engine';
import type {
  CardBodyProps,
  CardCaptionProps,
  CardCaptionSkeletonProps,
  CardProps,
  CardRowProps,
  CardRowSkeletonProps,
  CardThumbnailContentProps,
  CardThumbnailProps,
  CardThumbnailSkeletonProps,
  CardTitleProps,
  CardTitleSkeletonProps,
} from './types';
import type { ElementType, ForwardedRef } from 'react';

const Card = forwardRef(
  <T extends ElementType = 'div'>(
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
    }: PolymorphicPropsInternal<CardProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        flexDirection="column"
        {...props}
        sx={[cardStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
      />
    );
  },
) as PolymorphicComponentInternal<CardProps, 'div'>;

Card.displayName = CARD_NAME;

const CardThumbnail = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<CardThumbnailProps, 'img'>
>(
  (
    {
      leadingContent,
      trailingContent,
      width,
      ratio,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const hasLeadingContent = Boolean(leadingContent);
    const hasTrailingContent = Boolean(trailingContent);
    const hasContent = hasLeadingContent || hasTrailingContent;

    return (
      <Box
        ref={ref}
        className={className}
        style={style}
        sx={[cardThumbnailStyle({ ratio, xs, sm, md, lg, xl }), sx]}
      >
        {hasContent && (
          <FlexBox
            gap="4px"
            data-role="card-thumbnail-content-wrapper"
            alignItems="flex-start"
            justifyContent="space-between"
            sx={cardThumbnailContentWrapperStyle}
          >
            <FlexBox data-role="card-thumbnail-leading-content-wrapper">
              {leadingContent}
            </FlexBox>
            <FlexBox data-role="card-thumbnail-trailing-content-wrapper">
              {trailingContent}
            </FlexBox>
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
    }: DefaultComponentPropsInternal<CardThumbnailContentProps, 'span'>,
    ref: ForwardedRef<HTMLSpanElement>,
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
            onClick={composeEventHandlers(props.onClick, (e) => {
              e.preventDefault();
              e.stopPropagation();
            })}
            sx={[cardThumbnailContentToggleIconStyle, sx]}
          />
        );

      case 'custom':
        return <FlexBox ref={ref} as="span" {...props} sx={sx} />;
    }
  },
);

CardThumbnailContent.displayName = CARD_THUMBNAIL_CONTENT_NAME;

const CardBody = forwardRef(
  (
    { sx, ...props }: DefaultComponentPropsInternal<CardBodyProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        data-component="card-body"
        ref={ref}
        flexDirection="column"
        flex="1"
        gap="2px"
        {...props}
        sx={[cardBodyStyle, sx]}
      />
    );
  },
);

CardBody.displayName = CARD_BODY_NAME;

const CardRow = forwardRef(
  (
    {
      sx,
      position = 'top',
      variant,
      ...props
    }: DefaultComponentPropsInternal<CardRowProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        data-component="card-row"
        {...props}
        sx={[cardRowStyle({ position, variant }), sx]}
      />
    );
  },
);

CardRow.displayName = CARD_ROW_NAME;

const CardTitle = forwardRef(
  <T extends ElementType = 'p'>(
    {
      variant,
      weight,
      color,
      as,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<CardTitleProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Typography
        as={as ?? 'p'}
        ref={ref}
        data-component="card-title"
        {...props}
        sx={[
          cardTitleStyle({ variant, weight, color, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      />
    );
  },
) as PolymorphicComponentInternal<CardTitleProps, 'p'>;

CardTitle.displayName = CARD_TITLE_NAME;

const CardCaption = forwardRef(
  <T extends ElementType = 'p'>(
    {
      variant,
      weight,
      color = 'semantic.foreground.neutral.tertiary',
      as,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<CardCaptionProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Typography
        ref={ref}
        as={as ?? 'p'}
        data-component="card-caption"
        {...props}
        sx={[
          cardCaptionStyle({ variant, weight, color, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      />
    );
  },
) as PolymorphicComponentInternal<CardCaptionProps, 'p'>;

CardCaption.displayName = CARD_CAPTION_NAME;

const CardSkeleton = forwardRef(
  <T extends ElementType = 'div'>(
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
    }: PolymorphicPropsInternal<CardProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        flexDirection="column"
        {...props}
        sx={[cardSkeletonStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
      />
    );
  },
) as PolymorphicComponentInternal<CardProps, 'div'>;

CardSkeleton.displayName = CARD_SKELETON_NAME;

const CardThumbnailSkeleton = forwardRef(
  (
    {
      ratio,
      xl,
      lg,
      md,
      sm,
      xs,
      sx,
      ...props
    }: DefaultComponentPropsInternal<CardThumbnailSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <ThumbnailSkeleton
        ref={ref}
        radius
        sx={[cardThumbnailSkeletonStyle({ ratio, xs, sm, md, lg, xl }), sx]}
        {...props}
      />
    );
  },
);

CardThumbnailSkeleton.displayName = CARD_THUMBNAIL_SKELETON_NAME;

const CardRowSkeleton = forwardRef(
  (
    {
      width = '48px',
      height = '20px',
      ...props
    }: DefaultComponentPropsInternal<CardRowSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Skeleton
        ref={ref}
        data-component="card-row-skeleton"
        variant="rectangle"
        radius="3px"
        width={width}
        height={height}
        {...props}
      />
    );
  },
);

CardRowSkeleton.displayName = CARD_ROW_SKELETON_NAME;

const CardTitleSkeleton = forwardRef(
  (
    {
      width,
      height,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: DefaultComponentPropsInternal<CardTitleSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Skeleton
        ref={ref}
        data-component="card-title-skeleton"
        {...props}
        sx={[
          cardTitleSkeletonStyle({ width, height, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      />
    );
  },
);

CardTitleSkeleton.displayName = CARD_TITLE_SKELETON_NAME;

const CardCaptionSkeleton = forwardRef(
  (
    {
      type = 'normal',
      width: originWidth,
      height = '18px',
      ...props
    }: DefaultComponentPropsInternal<CardCaptionSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const width = useMemo(() => {
      if (originWidth !== undefined) {
        return originWidth;
      }

      switch (type) {
        case 'normal':
          return '75%';
        case 'sub':
          return '50%';
        case 'extra':
          return '25%';
      }
    }, [type, originWidth]);

    return (
      <Skeleton
        ref={ref}
        data-type={type}
        data-component="card-caption-skeleton"
        width={width}
        height={height}
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
  CardBody,
  CardTitle,
  CardCaption,
  CardRow,
  CardSkeleton,
  CardThumbnailSkeleton,
  CardRowSkeleton,
  CardTitleSkeleton,
  CardCaptionSkeleton,
};

export type {
  CardProps,
  CardThumbnailProps,
  CardThumbnailContentProps,
  CardBodyProps,
  CardTitleProps,
  CardCaptionProps,
  CardRowProps,
  CardProps as CardSkeletonProps,
  CardThumbnailSkeletonProps,
  CardRowSkeletonProps,
  CardTitleSkeletonProps,
  CardCaptionSkeletonProps,
};
