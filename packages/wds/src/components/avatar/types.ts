import type ImageLoader from '../image-loader';
import type { ComponentProps } from 'react';
import type { Merge, ResponsiveProps } from '../../types';

type AvatarDefaultProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
  variant?: 'person' | 'company' | 'academic';
};

type AvatarResponsiveProps = ResponsiveProps<Pick<AvatarDefaultProps, 'size'>>;

export type AvatarProps = Merge<
  Merge<AvatarDefaultProps, AvatarResponsiveProps>,
  Partial<ComponentProps<typeof ImageLoader>>
>;
