import { forwardRef } from 'react';
import {
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { FlexBox } from '../flex-box';

import {
  CARD_LIST_CONTENT_NAME,
  CARD_LIST_NAME,
  CARD_LIST_SKELETON_NAME,
} from './constants';
import {
  cardListContentStyle,
  cardListSkeletonStyle,
  cardListStyle,
} from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type {
  CardListContentProps,
  CardListProps,
  CardListSkeletonProps,
} from './types';
import type { ForwardedRef } from 'react';
import type { ElementType } from 'react';

const CardList = forwardRef(
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
    }: PolymorphicPropsInternal<CardListProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        {...props}
        sx={[cardListStyle({ platform, width, xs, sm, md, lg, xl }), sx]}
      >
        {Boolean(leadingContent) && leadingContent}
        {children}
        {Boolean(trailingContent) && trailingContent}
      </FlexBox>
    );
  },
) as PolymorphicComponentInternal<CardListProps, 'div'>;

CardList.displayName = CARD_LIST_NAME;

const CardListContent = forwardRef(
  (
    {
      variant = 'custom',
      sx,
      ...props
    }: DefaultComponentPropsInternal<CardListContentProps, 'div'>,
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
                color: theme.semantic.label.assistive,
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

const CardListSkeleton = forwardRef(
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
    }: PolymorphicPropsInternal<CardListSkeletonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        {...props}
        sx={[
          cardListSkeletonStyle({
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
) as PolymorphicComponentInternal<CardListSkeletonProps, 'div'>;

CardListSkeleton.displayName = CARD_LIST_SKELETON_NAME;

export { CardList, CardListContent, CardListSkeleton };

export type { CardListProps, CardListContentProps, CardListSkeletonProps };
