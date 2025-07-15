import type { ImageLoader } from '../image-loader';
import type { ComponentProps, ReactNode } from 'react';
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
  Partial<ComponentProps<typeof ImageLoader>>
>;
