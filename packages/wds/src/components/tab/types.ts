import type { PropsWithChildren, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@/types';

type TabDefaultProps = {
  size?: 'small' | 'large';
  padding?: boolean;
  rightIcon?: ReactNode;
};

type TabResponsiveProps = ResponsiveProps<
  Pick<TabDefaultProps, 'size' | 'padding'>
>;

export type TabProps = Merge<TabDefaultProps, TabResponsiveProps>;

export type TabItemProps = PropsWithChildren<{
  active?: boolean;
}>;
