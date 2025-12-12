import type { CSSProperties } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type DividerDefaultProps = WithSxProps<{
  /** Whether the divider is vertical. */
  vertical?: boolean;
  /** The color of the divider. */
  color?: ThemeColorsToken;
  /** The size of the divider. */
  size?: CSSProperties['width'];
  /** The thickness of the divider. */
  thickness?: CSSProperties['width'];
}>;

export type DividerResponsiveProps = ResponsiveProps<
  Pick<DividerDefaultProps, 'size' | 'thickness' | 'vertical'>
>;

export type DividerProps = Merge<DividerDefaultProps, DividerResponsiveProps>;
