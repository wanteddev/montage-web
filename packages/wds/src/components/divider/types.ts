import type { CSSProperties } from 'react';
import type { Merge, ResponsiveProps, ThemeColorsToken } from '@/types';

export type DividerDefaultProps = {
  variant?: 'normal';
  vertical?: boolean;
  color?: ThemeColorsToken;
  size?: CSSProperties['width'];
  thickness?: CSSProperties['width'];
};

export type DividerResponsiveProps = ResponsiveProps<
  Pick<DividerDefaultProps, 'size' | 'thickness'>
>;

export type DividerProps = Merge<DividerDefaultProps, DividerResponsiveProps>;
