import { sentenceCase } from 'change-case';

import { PLATFORM_PATTERN_WITHOUT_DESIGN } from '../components/lnb/constants';

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

  if (title.match(/^ios$/i)) {
    title = 'iOS';
  }

  return title;
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
