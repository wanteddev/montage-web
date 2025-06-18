import { sentenceCase } from 'change-case';

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
