import type { FlexBoxProps } from '../flex-box/types';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type LoadingWantedDefaultProps = {
  size?: number | string;
};

type LoadingWantedResponsiveProps = ResponsiveProps<
  Pick<LoadingWantedDefaultProps, 'size'>
>;

export type LoadingWantedProps = Merge<
  Merge<LoadingWantedDefaultProps, LoadingWantedResponsiveProps>,
  FlexBoxProps
>;
