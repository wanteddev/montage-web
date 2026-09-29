import { CATEGORY_CHIP_SIZE } from './constants';

import type { CategoryListContextType } from './contexts';
import type { CategoryListItemProps, CategoryListProps } from './types';

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

const toChipSize = (size: CategoryListProps['size']) =>
  size ? CATEGORY_CHIP_SIZE[size] : undefined;

export const getCategoryChipSize = ({
  size,
  xs,
  sm,
  md,
  lg,
  xl,
}: ReturnType<typeof getCategoryListItemSize>) => ({
  size: toChipSize(size),
  xs: { ...xs, size: toChipSize(xs.size) },
  sm: { ...sm, size: toChipSize(sm.size) },
  md: { ...md, size: toChipSize(md.size) },
  lg: { ...lg, size: toChipSize(lg.size) },
  xl: { ...xl, size: toChipSize(xl.size) },
});
