import { sentenceCase } from 'change-case';

import { PLATFORM_PATTERN_WITHOUT_DESIGN } from '../constants';

import type { Frontmatter } from '@/features/docs/types';

export const getFrontmatterTitle = (
  item: Frontmatter,
  depth: number = item.slug.length - 1,
) => {
  let title = '';

  switch (depth) {
    case item.slug.length - 1:
      title = item.title;

      break;
    default:
      title = item.slug[depth] ?? '';
      break;
  }

  const isUtilitiesPage = Boolean(
    item.slug.find((slug) => slug.match(/utilities/i)),
  );

  if (!isUtilitiesPage || depth < item.slug.length - 1) {
    title = sentenceCase(title);
  }
  if (item.title.match(/ios/gi)) {
    title = title.replace(/ios/gi, 'iOS');
  }

  return title;
};

export const getFrontmatterGroupKey = (key: string) => {
  let title = sentenceCase(key);

  if (key.match(/ios/gi)) {
    title = title.replace(/ios/gi, 'iOS');
  }

  return title;
};

export const getFrontmatterTitleWithDesignPage = (
  item: Frontmatter,
  allFrontmatter: Array<Frontmatter>,
) => {
  if (PLATFORM_PATTERN_WITHOUT_DESIGN.test(item.slug.toString())) {
    const designPage = allFrontmatter.find((v) =>
      v.slug
        .toString()
        .includes(
          item.slug
            .toString()
            .replace(PLATFORM_PATTERN_WITHOUT_DESIGN, 'design'),
        ),
    );

    if (designPage) {
      return getFrontmatterTitle(designPage);
    }
  }

  return getFrontmatterTitle(item);
};

export const getFrontmatterDescription = (
  item: Frontmatter,
  allFrontmatter: Array<Frontmatter>,
) => {
  if (PLATFORM_PATTERN_WITHOUT_DESIGN.test(item.slug.toString())) {
    const designPage = allFrontmatter.find((v) =>
      v.slug
        .toString()
        .includes(
          item.slug
            .toString()
            .replace(PLATFORM_PATTERN_WITHOUT_DESIGN, 'design'),
        ),
    );

    if (designPage) {
      return designPage.description?.replace(/\\n/g, ' ');
    }
  }

  return item.description?.replace(/\\n/g, ' ');
};

export const getFrontmatterImage = (
  item: Frontmatter,
  allFrontmatter: Array<Frontmatter>,
) => {
  if (PLATFORM_PATTERN_WITHOUT_DESIGN.test(item.slug.toString())) {
    const designPage = allFrontmatter.find((v) =>
      v.slug
        .toString()
        .includes(
          item.slug
            .toString()
            .replace(PLATFORM_PATTERN_WITHOUT_DESIGN, 'design'),
        ),
    );

    if (designPage) {
      return designPage.image;
    }
  }

  return item.image;
};

export const getFrontmatterOgImage = (
  item: Frontmatter,
  allFrontmatter: Array<Frontmatter>,
) => {
  if (PLATFORM_PATTERN_WITHOUT_DESIGN.test(item.slug.toString())) {
    const designPage = allFrontmatter.find((v) =>
      v.slug
        .toString()
        .includes(
          item.slug
            .toString()
            .replace(PLATFORM_PATTERN_WITHOUT_DESIGN, 'design'),
        ),
    );

    if (designPage) {
      return designPage.ogImage ?? designPage.image;
    }
  }

  return item.ogImage ?? item.image;
};

export const getFrontmatterDefaultImage = (item: Frontmatter) => {
  const baseSlug = item.slug.at(0)!;

  switch (baseSlug) {
    case 'foundations':
      return '/foundations/Thumbnails.png';
    case 'components':
      return '/components/Thumbnails.png';
    case 'utilities':
      return '/utilities/Thumbnails.png';
    case 'getting-started':
      return '/home/Thumbnails.png';
  }

  return undefined;
};
