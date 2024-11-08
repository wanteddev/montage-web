import type { FlexBoxProps } from '../flex-box/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { CardDefaultProps, CardThumbnailBasicProps } from '../card/types';

type CardListDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};
export type CardListProps = Merge<CardDefaultProps, CardListDefaultProps>;

export type CardListThumbnailProps = CardThumbnailBasicProps &
  CardListDefaultProps;

type CardListContentDefaultProps = {
  variant?: 'checkbox' | 'icon' | 'toggle-icon' | 'custom';
};
export type CardListContentProps = Merge<
  CardListContentDefaultProps,
  FlexBoxProps
>;

export type CardListSkeletonProps = Merge<CardDefaultProps, FlexBoxProps>;
