import type { ThemeColorsToken, WithSxProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type WithInteractionProps = WithSxProps<{
  color?: ThemeColorsToken;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  scale?: boolean;
  variant?: 'normal' | 'light' | 'strong';
  children?: ReactNode;
}>;
