/* FIXME 마이그레이션 시 filled 제거 필요 */
import type { ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type ChipFilterDefaultProps = {
  size?: 'xsmall' | 'small' | 'normal' | 'large';
  variant?:
    | 'solid'
    | 'outlined'
    /** @deprecated */
    | 'filled';
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
