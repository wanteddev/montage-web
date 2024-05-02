import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties } from 'react';

export type FloatingActionDefaultProps = {
  disabled?: boolean;
  disableInteraction?: boolean;
  size?: CSSProperties['width'];
  iconSize?: CSSProperties['fontSize'];
};

export type FloatingActionResponsiveProps = ResponsiveProps<
  Pick<FloatingActionDefaultProps, 'size' | 'iconSize'>
>;

export type FloatingActionProps = Merge<
  FloatingActionDefaultProps,
  FloatingActionResponsiveProps
>;
