import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { CSSProperties, PropsWithChildren } from 'react';

export type WithInteractionProps = PropsWithChildren<{
  color?: ThemeColorsToken;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  scale?: boolean;
  variant?: 'normal' | 'light' | 'strong';
}>;
