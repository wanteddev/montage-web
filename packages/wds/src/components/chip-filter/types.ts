import type { ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type ChipFilterDefaultProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outlined';
  active?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
  activeLabel?: ReactNode;
  children?: ReactNode;
};

export type ChipFilterResponsiveProps = ResponsiveProps<
  Pick<ChipFilterDefaultProps, 'size'>
>;

export type ChipFilterProps = Merge<
  ChipFilterDefaultProps,
  ChipFilterResponsiveProps
>;
