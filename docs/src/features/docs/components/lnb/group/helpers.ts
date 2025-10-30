import type { LNBFrontmatterType, SlugParams } from '../types';

export const getIsActiveGroup = (
  params: SlugParams,
  frontmatter: LNBFrontmatterType,
) => {
  const key = frontmatter.key.replace(/ /g, '-').toLowerCase();

  // utilities overview pages
  if (params.slug?.at(0) === 'utilities' && params.slug.length === 2) {
    return true;
  }

  return params.slug?.join('/') === key;
};
