import type { FlexBoxProps } from '../flex-box/types';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';

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
