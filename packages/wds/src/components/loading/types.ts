import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { FlexBoxProps } from '../flex-box/types';

export type LoadingDefaultProps = WithSxProps<{
  variant?: 'wanted' | 'circular';
  size?: number | string;
}>;

type LoadingResponsiveProps = ResponsiveProps<
  Pick<LoadingDefaultProps, 'size'>
>;

export type LoadingProps = Merge<
  Merge<LoadingDefaultProps, LoadingResponsiveProps>,
  FlexBoxProps
>;
