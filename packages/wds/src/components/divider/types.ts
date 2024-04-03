import type { CSSProperties } from 'react';
import type { Merge, ResponsiveProps, ThemeColorsToken } from '../../types';

export type DividerDefaultProps = {
  vertical?: boolean;
  color?: ThemeColorsToken;
  size?: CSSProperties['width'];
  thickness?: CSSProperties['width'];
};

export type DividerResponsiveProps = ResponsiveProps<
  Pick<DividerDefaultProps, 'size' | 'thickness' | 'vertical'>
>;

export type DividerProps = Merge<DividerDefaultProps, DividerResponsiveProps>;
