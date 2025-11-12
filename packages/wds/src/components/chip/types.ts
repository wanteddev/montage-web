import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ChipDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outlined';
  active?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
}>;

export type ChipResponsiveProps = ResponsiveProps<
  Pick<ChipDefaultProps, 'size'>
>;

export type ChipProps = Merge<ChipDefaultProps, ChipResponsiveProps>;
