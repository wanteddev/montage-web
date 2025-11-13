import type { FlexBoxProps } from '../flex-box/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { CardProps, CardThumbnailProps } from '../card/types';

type CardListDefaultProps = WithSxProps<{
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
}>;
export type CardListProps = Merge<CardProps, CardListDefaultProps>;

export type CardListThumbnailProps = CardThumbnailProps;

type CardListContentDefaultProps = {
  variant?: 'checkbox' | 'icon' | 'toggle-icon' | 'custom';
};
export type CardListContentProps = Merge<
  CardListContentDefaultProps,
  FlexBoxProps
>;

export type CardListSkeletonDefaultProps = {
  hasLeadingContent?: boolean;
  hasTrailingContent?: boolean;
};
export type CardListSkeletonProps = Merge<
  CardListSkeletonDefaultProps,
  CardProps
>;
