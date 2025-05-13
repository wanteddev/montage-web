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

  const designSlug = [...slug.slice(0, -1), 'design'].toString();
  const hasDesign = allFrontmatter.some(
    (frontmatter) => frontmatter.originSlug.toString() === designSlug,
  );

  if (lastSegment !== 'design' && hasDesign) {
    return true;
  }

  const webSlug = [...slug.slice(0, -1), 'web'].toString();
  const hasWeb = allFrontmatter.some(
    (frontmatter) => frontmatter.originSlug.toString() === webSlug,
  );

  if (lastSegment !== 'web' && hasWeb) {
    return true;
  }

  return false;
};
