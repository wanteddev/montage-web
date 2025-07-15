import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type AvatarDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
  variant?: 'person' | 'company' | 'academy';
  children?: ReactNode;
}>;

type AvatarResponsiveProps = ResponsiveProps<Pick<AvatarDefaultProps, 'size'>>;

export type AvatarProps = Merge<
  Merge<AvatarDefaultProps, AvatarResponsiveProps>,
  Pick<
    ComponentPropsWithoutRef<'img'>,
    'src' | 'srcSet' | 'alt' | 'onLoad' | 'onError'
  >
>;
