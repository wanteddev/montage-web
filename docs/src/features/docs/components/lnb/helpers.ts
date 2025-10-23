import { gettingStartedFrontmatter } from '../../constants';

import { PLATFORM_PATTERN, PLATFORM_PATTERN_WITHOUT_DESIGN } from './constants';

import type {
  LNBFrontmatterChild,
  LNBFrontmatterGroup,
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
      params.slug?.toString().replace(PLATFORM_PATTERN, '') ===
      item.slug.toString().replace(PLATFORM_PATTERN, '')
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

  if (
    !lastSegment?.match(PLATFORM_PATTERN_WITHOUT_DESIGN) ||
    slug.at(0) === gettingStartedFrontmatter.slug.at(0)
  ) {
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

export const getFrontmatterLink = (item: Frontmatter) => {
  return `/docs/${item.slug.join('/')}`;
};

export const findOrCreateGroup = (
  groups: LNBFrontmatterGroup,
  key: string,
): LNBFrontmatterType => {
  let group = groups.find(
    (item) => !isFrontmatter(item) && item.key === key,
  ) as LNBFrontmatterType | undefined;

  if (!group) {
    group = {
      key,
      defaultOpen: false,
      children: [],
    };
    groups.push(group);
  }

  return group;
};
