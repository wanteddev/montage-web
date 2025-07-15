import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type TabProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  /**
   * When the value is changed, the scroll does not move.
   */
  disableScrollMoveOnChange?: boolean;
  children?: ReactNode;
};

type TabListDefaultProps = WithSxProps<{
  size?: 'small' | 'medium' | 'large';
  horizontalPadding?: boolean;
  iconButton?: ReactNode;
  resize?: 'hug' | 'fill';
  children?: ReactNode;
}>;

type TabListResponsiveProps = ResponsiveProps<
  Pick<TabListDefaultProps, 'size' | 'horizontalPadding' | 'resize'>
>;

export type TabListProps = Merge<TabListDefaultProps, TabListResponsiveProps>;

export type TabListItemProps = WithSxProps<{
  value: string;
  disabled?: boolean;
  children?: ReactNode;
}>;

export type TabPanelProps = WithSxProps<{
  value: string;
  mountMode?: 'only-active' | 'force-mount' | 'always';
  children?: ReactNode;
}>;
