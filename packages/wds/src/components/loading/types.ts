import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { FlexBoxProps } from '../flex-box/types';

export type LoadingDefaultProps = {
  variant?: 'wanted' | 'circular';
  size?: number | string;
};

type LoadingResponsiveProps = ResponsiveProps<
  Pick<LoadingDefaultProps, 'size'>
>;

export type LoadingProps = Merge<
  Merge<LoadingDefaultProps, LoadingResponsiveProps>,
  FlexBoxProps
>;
