import type { CSSProperties } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type DividerDefaultProps = WithSxProps<{
  vertical?: boolean;
  color?: ThemeColorsToken;
  size?: CSSProperties['width'];
  thickness?: CSSProperties['width'];
}>;

export type DividerResponsiveProps = ResponsiveProps<
  Pick<DividerDefaultProps, 'size' | 'thickness' | 'vertical'>
>;

export type DividerProps = Merge<DividerDefaultProps, DividerResponsiveProps>;
