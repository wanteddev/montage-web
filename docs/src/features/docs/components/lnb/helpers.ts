import { PLATFORM_TYPES } from './constants';

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

export const hasMatchingDevelopPlatformPage = (
  slug: Array<string>,
  allFrontmatter: Array<Frontmatter>,
) => {
  const lastSegment = slug.at(-1);
  if (!lastSegment?.match(/(web|ios|android|changelog)$/)) {
    return false;
  }

  return allFrontmatter.some((frontmatter) => {
    const frontmatterSlug = frontmatter.originSlug.toString();
    return PLATFORM_TYPES.some((platform) => {
      const replacedSlug = slug
        .toString()
        .replace(/(web|ios|android|changelog)$/, platform);
      return frontmatterSlug === replacedSlug && platform !== lastSegment;
    });
  });
};
