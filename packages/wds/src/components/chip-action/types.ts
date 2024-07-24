import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ChipActionVariant = 'solid' | 'outlined';

export type ChipActionDefaultProps = {
  size?: 'xsmall' | 'small' | 'normal' | 'large';
  variant?: 'filled' | 'outlined';
  active?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ChipActionResponsiveProps = ResponsiveProps<
  Pick<ChipActionDefaultProps, 'size'>
>;

export type ChipActionProps = Merge<
  ChipActionDefaultProps,
  ChipActionResponsiveProps
>;
