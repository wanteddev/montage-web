import type { CSSProperties } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';

type ToggleIconDefaultProps = {
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (state: boolean) => void;
  activeColor?: ThemeColorsToken;
  size?: CSSProperties['fontSize'];
  disabled?: boolean;
  disableInteraction?: boolean;
};

type ToggleIconResponsiveProps = ResponsiveProps<
  Pick<ToggleIconDefaultProps, 'size'>
>;

export type ToggleIconProps = Merge<
  ToggleIconDefaultProps,
  ToggleIconResponsiveProps
>;
