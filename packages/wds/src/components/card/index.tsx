import { forwardRef } from 'react';
import {
  Box,
  type DefaultComponentProps,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import FlexBox from '../flex-box';
import Typography from '../typography';
import Thumbnail from '../thumbnail';

import {
  CARD_CAPTION_NAME,
  CARD_CONTENT_NAME,
  CARD_EXTRA_CONTENT_NAME,
  CARD_NAME,
  CARD_THUMBNAIL_CONTENT_NAME,
  CARD_THUMBNAIL_NAME,
  CARD_TITLE_NAME,
} from './constants';
import { CardProvider } from './contexts';
import {
  cardExtraContentStyle,
  cardStyle,
  cardThumbnailContentIconStyle,
  cardThumbnailContentTextStyle,
  cardThumbnailContentWrapperStyle,
  cardThumbnailOverlayStyle,
  cardThumbnailStyle,
} from './style';

import type { PolymorphicComponent } from '@wanteddev/wds-engine';
import type {
  CardCaptionProps,
  CardContentProps,
  CardExtraContentProps,
  CardProps,
  CardThumbnailContentProps,
  CardThumbnailProps,
  CardTitleProps,
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
      <CardProvider platform={platform}>
        <FlexBox
          ref={ref}
          flexDirection="column"
          gap="12px"
          {...props}
          sx={[cardStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
        />
      </CardProvider>
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

const CardThumbnailContent = forwardRef<
  HTMLSpanElement,
  Omit<DefaultComponentProps<CardThumbnailContentProps, 'span'>, 'color'>
>(({ variant = 'custom', sx, onClick, ...props }, ref) => {
  switch (variant) {
    case 'text':
      return (
        <Typography
          ref={ref}
          data-role="card-thumbnail-content-text"
          {...props}
          sx={[cardThumbnailContentTextStyle, sx]}
        />
      );
    case 'icon':
      return (
        <FlexBox
          ref={ref}
          as="span"
          data-role="card-thumbnail-content-icon"
          role={typeof onClick !== 'undefined' ? 'button' : undefined}
          onClick={composeEventHandlers(onClick, (event) => {
            event.stopPropagation();
          })}
          {...props}
          sx={[cardThumbnailContentIconStyle, sx]}
        />
      );
    case 'custom':
      return <FlexBox ref={ref} as="span" {...props} sx={sx} />;
  }
});

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
    props: PolymorphicProps<CardTitleProps, E>,
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
) as PolymorphicComponent<CardTitleProps, 'span'>;

CardTitle.displayName = CARD_TITLE_NAME;

const CardCaption = forwardRef(
  <E extends ElementType = 'span'>(
    props: PolymorphicProps<CardCaptionProps, E>,
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
) as PolymorphicComponent<CardCaptionProps, 'span'>;

CardCaption.displayName = CARD_CAPTION_NAME;

export {
  Card,
  CardThumbnail,
  CardThumbnailContent,
  CardContent,
  CardTitle,
  CardCaption,
  CardExtraContent,
};
