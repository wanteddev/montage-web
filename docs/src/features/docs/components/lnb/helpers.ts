import type { SlugParams } from './types';
import type { Frontmatter } from '../../types';

export const getIsActive = (params: SlugParams, item: Frontmatter) =>
  params.slug.toString().replace(/(web|ios|android|changelog|guide)$/, '') ===
  item.slug.toString().replace(/(web|ios|android|changelog|guide)$/, '');
