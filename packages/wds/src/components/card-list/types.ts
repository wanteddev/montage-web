import type { FlexBoxProps } from '../flex-box/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { CardProps, CardThumbnailProps } from '../card/types';

type CardListDefaultProps = WithSxProps<{
  /**
   * Content displayed in the leading area.
   * Pass an element wrapped with `CardListContent`.
   */
  leadingContent?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `CardListContent`.
   */
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
  /** Whether to show the leading content. */
  hasLeadingContent?: boolean;
  /** Whether to show the trailing content. */
  hasTrailingContent?: boolean;
};
export type CardListSkeletonProps = Merge<
  CardListSkeletonDefaultProps,
  CardProps
>;
