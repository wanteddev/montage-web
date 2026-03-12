import type { CategoryListContextType } from './contexts';
import type { CategoryListItemProps } from './types';

export const getCategoryListItemSize = (
  context: Pick<CategoryListContextType, 'size' | 'responsive'>,
  { xs, sm, md, lg, xl }: Partial<CategoryListItemProps>,
) => {
  return {
    size: context.size,
    xs: {
      size: context.responsive?.xs?.size,
      ...xs,
    },
    sm: {
      size: context.responsive?.sm?.size,
      ...sm,
    },
    md: {
      size: context.responsive?.md?.size,
      ...md,
    },
    lg: {
      size: context.responsive?.lg?.size,
      ...lg,
    },
    xl: {
      size: context.responsive?.xl?.size,
      ...xl,
    },
  };
};
