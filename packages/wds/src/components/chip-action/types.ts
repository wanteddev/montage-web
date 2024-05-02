import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ChipActionVariant = 'solid' | 'outlined';

export type ChipActionColor = 'primary' | 'secondary' | 'assistive';

export type ChipActionDefaultProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined';
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
