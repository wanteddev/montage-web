import {
  MERGE_ONE_FRONTMATTER_PATTERN,
  gettingStartedFrontmatter,
  // utilitiesOverviewAndroidFrontmatter,
  // utilitiesOverviewIosFrontmatter,
} from '../../constants';

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
    const firstSegment = item.originSlug.at(0) || '';

    const values = Object.hasOwn(MERGE_ONE_FRONTMATTER_PATTERN, firstSegment);

    if (!values) {
      return (
        params.slug?.toString().replace(PLATFORM_PATTERN, '') ===
        item.slug.toString().replace(PLATFORM_PATTERN, '')
      );
    }

    const PATTERN = new RegExp(
      `${Object.keys(MERGE_ONE_FRONTMATTER_PATTERN[firstSegment as keyof typeof MERGE_ONE_FRONTMATTER_PATTERN]).join('|')}$`,
    );

    return (
      params.slug?.toString().replace(PATTERN, '') ===
      item.slug.toString().replace(PATTERN, '')
    );
  }

  return item.children.some((root) =>
    isFrontmatter(root)
      ? getIsActive(params, root)
      : root.children.some((child) => getIsActive(params, child)),
  );
};

export const shouldMergeOneFrontmatter = (frontmatter: Frontmatter) => {
  const firstSegment = frontmatter.originSlug.at(0) || '';
  const lastSegment = frontmatter.originSlug.at(-1) || '';

  const values = Object.hasOwn(MERGE_ONE_FRONTMATTER_PATTERN, firstSegment);

  if (!values) {
    return false;
  }

  const data =
    MERGE_ONE_FRONTMATTER_PATTERN[
      firstSegment as keyof typeof MERGE_ONE_FRONTMATTER_PATTERN
    ];

  return (
    Object.keys(data).includes(lastSegment) &&
    lastSegment !== data[lastSegment as keyof typeof data]
  );
};

export const shouldSkipAddFrontmatter = (
  frontmatter: Frontmatter,
  allFrontmatter: Array<Frontmatter>,
) => {
  if (hasMatchingDevelopPlatformPage(frontmatter.originSlug, allFrontmatter)) {
    return true;
  }

  // if (
  //   frontmatter.slug.join('/') ===
  //     utilitiesOverviewIosFrontmatter.slug.join('/') ||
  //   frontmatter.slug.join('/') ===
  //     utilitiesOverviewAndroidFrontmatter.slug.join('/')
  // ) {
  //   return true;
  // }

  return shouldMergeOneFrontmatter(frontmatter);
};

export const isMergeOneFrontmatter = (frontmatter: Frontmatter) => {
  const firstSegment = frontmatter.originSlug.at(0) || '';
  const lastSegment = frontmatter.originSlug.at(-1) || '';

  return (
    Object.hasOwn(MERGE_ONE_FRONTMATTER_PATTERN, firstSegment) &&
    Object.keys(
      MERGE_ONE_FRONTMATTER_PATTERN[
        firstSegment as keyof typeof MERGE_ONE_FRONTMATTER_PATTERN
      ],
    ).includes(lastSegment)
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
