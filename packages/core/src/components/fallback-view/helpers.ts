import type { ButtonProps } from '../button';
import type { FallbackViewContextType } from './contexts';
import type { FallbackViewButtonProps } from './types';

export const getFallbackViewButtonSize = (
  context: FallbackViewContextType,
  { size, xs, sm, md, lg, xl }: FallbackViewButtonProps,
) => {
  return {
    size: size ?? getFallbackViewButtonSizePlatform(context.platform),
    xs: {
      size: getFallbackViewButtonSizePlatform(context.responsive?.xs?.platform),
      ...xs,
    },
    sm: {
      size: getFallbackViewButtonSizePlatform(context.responsive?.sm?.platform),
      ...sm,
    },
    md: {
      size: getFallbackViewButtonSizePlatform(context.responsive?.md?.platform),
      ...md,
    },
    lg: {
      size: getFallbackViewButtonSizePlatform(context.responsive?.lg?.platform),
      ...lg,
    },
    xl: {
      size: getFallbackViewButtonSizePlatform(context.responsive?.xl?.platform),
      ...xl,
    },
  };
};

const getFallbackViewButtonSizePlatform = (
  platform: FallbackViewContextType['platform'],
): ButtonProps['size'] => {
  switch (platform) {
    case 'desktop':
      return 'large';
    case 'mobile':
      return 'small';
  }
};
