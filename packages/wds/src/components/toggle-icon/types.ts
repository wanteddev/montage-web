import type { CSSProperties, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';

type ToggleIconDefaultProps = WithSxProps<{
  /** Whether the toggle icon is active. */
  active?: boolean;
  /** Whether the toggle icon is active by default. */
  defaultActive?: boolean;
  /** Callback function when the active state changes. */
  onActiveChange?: (state: boolean) => void;
  /** The active color of the toggle icon. */
  activeColor?: ThemeColorsToken;
  size?: CSSProperties['fontSize'];
  /** Whether the toggle icon is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** An icon component should be provided as a child. */
  children?: ReactNode;
}>;

type ToggleIconResponsiveProps = ResponsiveProps<
  Pick<ToggleIconDefaultProps, 'size'>
>;

export type ToggleIconProps = Merge<
  ToggleIconDefaultProps,
  ToggleIconResponsiveProps
>;
