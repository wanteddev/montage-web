import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ChipDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outlined';
  /** Whether the chip is active. */
  active?: boolean;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** Content displayed in the leading area. */
  leadingContent?: ReactNode;
  /** Content displayed in the trailing area. */
  trailingContent?: ReactNode;
  /** The content of the chip. */
  children?: ReactNode;
}>;

export type ChipResponsiveProps = ResponsiveProps<
  Pick<ChipDefaultProps, 'size'>
>;

export type ChipProps = Merge<ChipDefaultProps, ChipResponsiveProps>;
