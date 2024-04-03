import type { PropsWithChildren, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '../../types';

export type TabProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
}>;

type TabListDefaultProps = {
  size?: 'small' | 'large';
  padding?: boolean;
  rightIcon?: ReactNode;
};

type TabListResponsiveProps = ResponsiveProps<
  Pick<TabListDefaultProps, 'size' | 'padding'>
>;

export type TabListProps = Merge<TabListDefaultProps, TabListResponsiveProps>;

export type TabListItemProps = {
  value: string;
  disabled?: boolean;
};

export type TabPanelProps = {
  value: string;
  mountMode?: 'only-active' | 'force-mount' | 'always';
};
