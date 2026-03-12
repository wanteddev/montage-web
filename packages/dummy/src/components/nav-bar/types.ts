import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';

type WantedLogoDefaultProps = WithSxProps<{
  width: number;
  height: number;
}>;

type WantedLogoResponsiveProps = ResponsiveProps<
  Pick<WantedLogoDefaultProps, 'width' | 'height'>
>;

export type WantedLogoProps = Merge<
  WantedLogoDefaultProps,
  WantedLogoResponsiveProps
>;
