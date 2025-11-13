import { PLATFORM_PATTERN } from '@/features/docs/constants';

import type { Frontmatter } from '@/features/docs/types';

export const getIsActiveGroup = (
  pathname: string,
  frontmatter: Frontmatter,
) => {
  const [, ...currentSlug] = pathname.split('/').filter(Boolean);

  if (currentSlug.at(0) === 'utilities' && currentSlug.length === 2) {
    return true;
  }

  return currentSlug.join('/') === frontmatter.slug.join('/');
};

export const getIsActive = (pathname: string, item: Frontmatter): boolean => {
  const [, ...currentSlug] = pathname.split('/').filter(Boolean);

  if (
    item.slug.at(0) === 'foundations' &&
    currentSlug.at(0) === 'foundations'
  ) {
    if (currentSlug.at(2) === 'colors') {
      return item.slug.at(3) === 'atomic' || item.slug.at(3) === 'semantic';
    }

    if (currentSlug.at(2) === 'elevation') {
      return item.slug.at(3) === 'normal' || item.slug.at(3) === 'spread';
    }
  }

  return (
    currentSlug.toString().replace(PLATFORM_PATTERN, '') ===
    item.slug.toString().replace(PLATFORM_PATTERN, '')
  );
};
