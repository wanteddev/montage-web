import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type ThumbnailDefaultProps = {
  ratio?:
    | '1:1'
    | '5:4'
    | '4:3'
    | '3:2'
    | '16:10'
    | '1.618:1'
    | '16:9'
    | '2:1'
    | '21:9';
  portrait?: boolean;
  border?: boolean;
  radius?: boolean;
};

type ThumbnailResponsiveProps = ResponsiveProps<
  Pick<ThumbnailDefaultProps, 'ratio' | 'portrait' | 'radius' | 'border'>
>;

export type ThumbnailProps = Merge<
  ThumbnailDefaultProps,
  ThumbnailResponsiveProps
>;
