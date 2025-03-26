import type {
  LNBFrontmatterChild,
  LNBFrontmatterType,
  SlugParams,
} from './types';
import type { Frontmatter } from '@/features/docs/types';

export const isFrontmatter = (
  frontmatter: LNBFrontmatterChild | LNBFrontmatterType,
): frontmatter is Frontmatter => 'slug' in frontmatter;

export const getIsActive = (
  params: SlugParams,
  item: LNBFrontmatterChild | LNBFrontmatterType,
): boolean => {
  if (isFrontmatter(item)) {
    return (
      params.slug
        .toString()
        .replace(/(web|ios|android|changelog|design)$/, '') ===
      item.slug.toString().replace(/(web|ios|android|changelog|design)$/, '')
    );
  }

  return item.children.some((root) =>
    isFrontmatter(root)
      ? getIsActive(params, root)
      : root.children.some((child) => getIsActive(params, child)),
  );
};
