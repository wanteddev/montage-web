import { forwardRef } from 'react';
import {
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@montage-ui/engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { FlexBox } from '../flex-box';
import {
  CardBody,
  CardCaption,
  CardCaptionSkeleton,
  CardRow,
  CardRowSkeleton,
  CardThumbnail,
  CardThumbnailContent,
  CardThumbnailSkeleton,
  CardTitle,
  CardTitleSkeleton,
} from '../card';

import {
  LIST_CARD_BODY_NAME,
  LIST_CARD_CAPTION_NAME,
  LIST_CARD_CAPTION_SKELETON_NAME,
  LIST_CARD_CONTENT_NAME,
  LIST_CARD_NAME,
  LIST_CARD_ROW_NAME,
  LIST_CARD_ROW_SKELETON_NAME,
  LIST_CARD_SKELETON_NAME,
  LIST_CARD_THUMBNAIL_CONTENT_NAME,
  LIST_CARD_THUMBNAIL_NAME,
  LIST_CARD_THUMBNAIL_SKELETON_NAME,
  LIST_CARD_TITLE_NAME,
  LIST_CARD_TITLE_SKELETON_NAME,
} from './constants';
import {
  listCardContentStyle,
  listCardSkeletonStyle,
  listCardStyle,
} from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type {
  ListCardBodyProps,
  ListCardCaptionProps,
  ListCardCaptionSkeletonProps,
  ListCardContentProps,
  ListCardProps,
  ListCardRowProps,
  ListCardRowSkeletonProps,
  ListCardSkeletonProps,
  ListCardThumbnailContentProps,
  ListCardThumbnailProps,
  ListCardThumbnailSkeletonProps,
  ListCardTitleProps,
  ListCardTitleSkeletonProps,
} from './types';
import type { ForwardedRef } from 'react';
import type { ElementType } from 'react';

const ListCard = forwardRef(
  <T extends ElementType = 'div'>(
    {
      platform = 'desktop',
      width,
      leadingContent,
      trailingContent,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      children,
      ...props
    }: PolymorphicPropsInternal<ListCardProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        {...props}
        sx={[listCardStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
      >
        {Boolean(leadingContent) && leadingContent}
        {children}
        {Boolean(trailingContent) && trailingContent}
      </FlexBox>
    );
  },
) as PolymorphicComponentInternal<ListCardProps, 'div'>;

ListCard.displayName = LIST_CARD_NAME;

const ListCardContent = forwardRef(
  (
    {
      variant = 'custom',
      sx,
      ...props
    }: DefaultComponentPropsInternal<ListCardContentProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    switch (variant) {
      case 'checkbox':
      case 'toggle-icon':
        return (
          <FlexBox
            ref={ref}
            justifyContent="center"
            alignItems="center"
            {...props}
            sx={[listCardContentStyle, sx]}
            onClick={composeEventHandlers(props.onClick, (e) => {
              e.preventDefault();
              e.stopPropagation();
            })}
          />
        );
      case 'icon':
        return (
          <FlexBox
            ref={ref}
            justifyContent="center"
            alignItems="center"
            {...props}
            sx={(theme) => [
              listCardContentStyle,
              {
                color: theme.semantic.label.assistive,
              },
              sx,
            ]}
          />
        );
      case 'custom':
        return <FlexBox ref={ref} {...props} sx={[listCardContentStyle, sx]} />;
    }
  },
);

ListCardContent.displayName = LIST_CARD_CONTENT_NAME;

const ListCardThumbnail = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCardThumbnailProps, 'img'>
>((props, ref) => {
  return <CardThumbnail ref={ref} {...props} />;
});

ListCardThumbnail.displayName = LIST_CARD_THUMBNAIL_NAME;

const ListCardThumbnailContent = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardThumbnailContentProps, 'span'>,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    return <CardThumbnailContent ref={ref} {...props} />;
  },
);

ListCardThumbnailContent.displayName = LIST_CARD_THUMBNAIL_CONTENT_NAME;

const ListCardBody = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardBodyProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return <CardBody ref={ref} {...props} />;
  },
);

ListCardBody.displayName = LIST_CARD_BODY_NAME;

const ListCardTitle = forwardRef(
  (
    props: PolymorphicPropsInternal<ListCardTitleProps, 'p'>,
    ref: ForwardedRef<HTMLParagraphElement>,
  ) => {
    return <CardTitle ref={ref} {...props} />;
  },
) as PolymorphicComponentInternal<ListCardTitleProps, 'p'>;

ListCardTitle.displayName = LIST_CARD_TITLE_NAME;

const ListCardCaption = forwardRef(
  (
    props: PolymorphicPropsInternal<ListCardCaptionProps, 'p'>,
    ref: ForwardedRef<HTMLParagraphElement>,
  ) => {
    return <CardCaption ref={ref} {...props} />;
  },
) as PolymorphicComponentInternal<ListCardCaptionProps, 'p'>;

ListCardCaption.displayName = LIST_CARD_CAPTION_NAME;

const ListCardRow = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardRowProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return <CardRow ref={ref} {...props} />;
  },
);

ListCardRow.displayName = LIST_CARD_ROW_NAME;

const ListCardSkeleton = forwardRef(
  <T extends ElementType = 'div'>(
    {
      platform = 'desktop',
      width,
      hasLeadingContent,
      hasTrailingContent,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      ...props
    }: PolymorphicPropsInternal<ListCardSkeletonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        {...props}
        sx={[
          listCardSkeletonStyle({
            platform,
            hasLeadingContent,
            hasTrailingContent,
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
) as PolymorphicComponentInternal<ListCardSkeletonProps, 'div'>;

ListCardSkeleton.displayName = LIST_CARD_SKELETON_NAME;

const ListCardThumbnailSkeleton = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardThumbnailSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return <CardThumbnailSkeleton ref={ref} {...props} />;
  },
);

ListCardThumbnailSkeleton.displayName = LIST_CARD_THUMBNAIL_SKELETON_NAME;

const ListCardRowSkeleton = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardRowSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return <CardRowSkeleton ref={ref} {...props} />;
  },
);

ListCardRowSkeleton.displayName = LIST_CARD_ROW_SKELETON_NAME;

const ListCardTitleSkeleton = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardTitleSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return <CardTitleSkeleton ref={ref} {...props} />;
  },
);

ListCardTitleSkeleton.displayName = LIST_CARD_TITLE_SKELETON_NAME;

const ListCardCaptionSkeleton = forwardRef(
  (
    props: DefaultComponentPropsInternal<ListCardCaptionSkeletonProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return <CardCaptionSkeleton ref={ref} {...props} />;
  },
);

ListCardCaptionSkeleton.displayName = LIST_CARD_CAPTION_SKELETON_NAME;

export {
  ListCard,
  ListCardContent,
  ListCardThumbnail,
  ListCardThumbnailContent,
  ListCardBody,
  ListCardTitle,
  ListCardCaption,
  ListCardRow,
  ListCardSkeleton,
  ListCardThumbnailSkeleton,
  ListCardRowSkeleton,
  ListCardTitleSkeleton,
  ListCardCaptionSkeleton,
};

export type {
  ListCardProps,
  ListCardContentProps,
  ListCardThumbnailProps,
  ListCardThumbnailContentProps,
  ListCardBodyProps,
  ListCardTitleProps,
  ListCardCaptionProps,
  ListCardRowProps,
  ListCardSkeletonProps,
  ListCardThumbnailSkeletonProps,
  ListCardRowSkeletonProps,
  ListCardTitleSkeletonProps,
  ListCardCaptionSkeletonProps,
};
