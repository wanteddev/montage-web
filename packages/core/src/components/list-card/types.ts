import type { FlexBoxProps } from '../flex-box/types';
import type { Merge, WithSxProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';
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
} from '../card/types';

type ListCardDefaultProps = WithSxProps<{
  /**
   * Content displayed in the leading area.
   * Pass an element wrapped with `ListCardContent`.
   */
  leadingContent?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `ListCardContent`.
   */
  trailingContent?: ReactNode;
  children?: ReactNode;
}>;
export type ListCardProps = Merge<CardProps, ListCardDefaultProps>;

export type ListCardThumbnailProps = CardThumbnailProps;
export type ListCardThumbnailContentProps = CardThumbnailContentProps;
export type ListCardBodyProps = CardBodyProps;
export type ListCardTitleProps = CardTitleProps;
export type ListCardCaptionProps = CardCaptionProps;
export type ListCardRowProps = CardRowProps;

export type ListCardThumbnailSkeletonProps = CardThumbnailSkeletonProps;
export type ListCardRowSkeletonProps = CardRowSkeletonProps;
export type ListCardTitleSkeletonProps = CardTitleSkeletonProps;
export type ListCardCaptionSkeletonProps = CardCaptionSkeletonProps;

type ListCardContentDefaultProps = {
  variant?: 'checkbox' | 'icon' | 'toggle-icon' | 'custom';
};
export type ListCardContentProps = Merge<
  ListCardContentDefaultProps,
  FlexBoxProps
>;

export type ListCardSkeletonDefaultProps = {
  /** Whether to show the leading content. */
  hasLeadingContent?: boolean;
  /** Whether to show the trailing content. */
  hasTrailingContent?: boolean;
};
export type ListCardSkeletonProps = Merge<
  ListCardSkeletonDefaultProps,
  CardProps
>;
