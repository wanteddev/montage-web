import { forwardRef } from 'react';
import {
  Box,
  type DefaultComponentProps,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Typography from '../typography';
import Thumbnail from '../thumbnail';

import {
  CARD_CAPTION_NAME,
  CARD_CONTENT_NAME,
  CARD_EXTRA_CONTENT_NAME,
  CARD_NAME,
  CARD_THUMBNAIL_NAME,
  CARD_TITLE_NAME,
} from './constants';
import { CardProvider, useCardContext } from './contexts';
import { cardStyle } from './style';

import type { PolymorphicComponent } from '@wanteddev/wds-engine';
import type {
  CardCaptionProps,
  CardContentProps,
  CardProps,
  CardThumbnailProps,
  CardTitleProps,
} from './types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';

const Card = forwardRef(
  <E extends ElementType = 'div'>(
    {
      platform = 'desktop',
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
          sx={[cardStyle({ platform, xs, sm, md, lg, xl }), sx]}
        />
      </CardProvider>
    );
  },
) as PolymorphicComponent<CardProps, 'div'>;

Card.displayName = CARD_NAME;

const CardThumbnail = forwardRef<HTMLDivElement, CardThumbnailProps>(
  ({ ratio: ratioProp, width, src, alt, quality, sx, ...props }, ref) => {
    const { platform } = useCardContext(CARD_THUMBNAIL_NAME);

    const ratio: CardThumbnailProps['ratio'] =
      ratioProp ?? (platform === 'desktop' ? '3:2' : '4:3');

    return (
      <Box ref={ref} sx={sx} {...props}>
        <Thumbnail
          src={src}
          alt={alt}
          width={width}
          ratio={ratio}
          quality={quality}
          radius
          border
        />
      </Box>
    );
  },
);

CardThumbnail.displayName = CARD_THUMBNAIL_NAME;

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
    props: DefaultComponentProps<CardContentProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
  ) => {
    return <FlexBox ref={ref} {...props} />;
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
  CardContent,
  CardTitle,
  CardCaption,
  CardExtraContent,
};
