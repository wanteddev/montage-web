import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type TabProps = {
  /** The default value of the tab. */
  defaultValue?: string;
  /** The value of the tab. */
  value?: string;
  /** Callback function when the value changes. */
  onValueChange?: (tab: string) => void;
  /** Whether to disable the scroll move on change. */
  disableScrollMoveOnChange?: boolean;
  children?: ReactNode;
};

type TabListDefaultProps = WithSxProps<{
  /** The size of the tab list. */
  size?: 'small' | 'medium' | 'large';
  /** Whether to enable the horizontal padding. */
  horizontalPadding?: boolean;
  /** The icon button of the tab list. */
  iconButton?: ReactNode;
  /** The resize mode of the tab list. */
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
