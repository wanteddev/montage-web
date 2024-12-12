import type { FlexBoxProps } from '../flex-box/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { CardProps, CardThumbnailBasicProps } from '../card/types';

type CardListDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
};
export type CardListProps = Merge<CardProps, CardListDefaultProps>;

export type CardListThumbnailProps = CardThumbnailBasicProps &
  CardListDefaultProps;

type CardListContentDefaultProps = {
  variant?: 'checkbox' | 'icon' | 'toggle-icon' | 'custom';
};
export type CardListContentProps = Merge<
  CardListContentDefaultProps,
  FlexBoxProps
>;

export type CardListSkeletonDefaultProps = {
  hasLeftContent?: boolean;
  hasRightContent?: boolean;
};
export type CardListSkeletonProps = Merge<
  CardListSkeletonDefaultProps,
  CardProps
>;
