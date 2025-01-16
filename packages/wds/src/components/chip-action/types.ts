import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ChipActionDefaultProps = {
  size?: 'xsmall' | 'small' | 'normal' | 'large';
  variant?: 'solid' | 'outlined';
  active?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
};

export type ChipActionResponsiveProps = ResponsiveProps<
  Pick<ChipActionDefaultProps, 'size'>
>;

export type ChipActionProps = Merge<
  ChipActionDefaultProps,
  ChipActionResponsiveProps
>;
