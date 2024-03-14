import type ImageLoader from '../image-loader';
import type { ComponentProps, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@/types';

type AvatarDefaultProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
  variant?: 'rounded' | 'square' | 'circle';
  fallback?: ReactNode;
};

type AvatarResponsiveProps = ResponsiveProps<Pick<AvatarDefaultProps, 'size'>>;

export type AvatarProps = Merge<
  Merge<AvatarDefaultProps, AvatarResponsiveProps>,
  Partial<ComponentProps<typeof ImageLoader>>
>;
