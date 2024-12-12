import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type FloatingActionDefaultProps = {
  disabled?: boolean;
  disableInteraction?: boolean;
  size?: CSSProperties['width'];
  iconSize?: CSSProperties['fontSize'];
  children?: ReactNode;
};

export type FloatingActionResponsiveProps = ResponsiveProps<
  Pick<FloatingActionDefaultProps, 'size' | 'iconSize'>
>;

export type FloatingActionProps = Merge<
  FloatingActionDefaultProps,
  FloatingActionResponsiveProps
>;
