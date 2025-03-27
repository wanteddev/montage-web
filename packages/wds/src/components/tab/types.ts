import type { PropsWithChildren, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type TabProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  /**
   * 값이 변경되었을 때 스크롤을 이동하지 않음.
   */
  disableScrollMoveOnChange?: boolean;
}>;

type TabListDefaultProps = {
  size?: 'small' | 'medium' | 'large';
  horizontalPadding?: boolean;
  iconButton?: ReactNode;
  resize?: 'hug' | 'fill';
  children?: ReactNode;
};

type TabListResponsiveProps = ResponsiveProps<
  Pick<TabListDefaultProps, 'size' | 'horizontalPadding' | 'resize'>
>;

export type TabListProps = Merge<TabListDefaultProps, TabListResponsiveProps>;

export type TabListItemProps = {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
};

export type TabPanelProps = {
  value: string;
  mountMode?: 'only-active' | 'force-mount' | 'always';
  children?: ReactNode;
};
