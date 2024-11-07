import { forwardRef } from 'react';
import {
  Box,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import FlexBox from '../flex-box';
import { Thumbnail } from '../thumbnail';

import {
  CARD_LIST_CONTENT_NAME,
  CARD_LIST_NAME,
  CARD_LIST_THUMBNAIL_NAME,
} from './constants';
import { cardListContentStyle, cardListStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type {
  CardListContentProps,
  CardListProps,
  CardListThumbnailProps,
} from './types';
import type { ElementRef, ForwardedRef } from 'react';
import type { ElementType } from 'react';

const CardList = forwardRef(
  <E extends ElementType = 'div'>(
    {
      platform = 'desktop',
      width,
      leftContent,
      rightContent,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      children,
      ...props
    }: PolymorphicProps<CardListProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        {...props}
        sx={[cardListStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
      >
        {Boolean(leftContent) && leftContent}
        {children}
        {Boolean(rightContent) && rightContent}
      </FlexBox>
    );
  },
) as PolymorphicComponent<CardListProps, 'div'>;

CardList.displayName = CARD_LIST_NAME;

const CardListThumbnail = forwardRef<HTMLDivElement, CardListThumbnailProps>(
  ({ width, ...props }, ref) => {
    return (
      <Box ref={ref} wds-component="card-list-thumbnail" {...props}>
        <Thumbnail width={width} radius border {...props} />
      </Box>
    );
  },
) as PolymorphicComponent<CardListThumbnailProps, 'div'>;

CardListThumbnail.displayName = CARD_LIST_THUMBNAIL_NAME;

const CardListContent = forwardRef(
  (
    {
      variant = 'custom',
      sx,
      ...props
    }: DefaultComponentProps<CardListContentProps, 'div'>,
    ref: ForwardedRef<ElementRef<'div'>>,
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
            sx={[cardListContentStyle, sx]}
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
              cardListContentStyle,
              {
                color: theme.palette.label.assistive,
              },
              sx,
            ]}
          />
        );
      case 'custom':
        return <FlexBox ref={ref} {...props} sx={[cardListContentStyle, sx]} />;
    }
  },
);

CardListContent.displayName = CARD_LIST_CONTENT_NAME;

export { CardList, CardListThumbnail, CardListContent };
