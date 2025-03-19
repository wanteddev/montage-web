import type { LNBFrontmatterChild, LNBFrontmatterItem } from '../types';

export const isFrontmatter = (
  frontmatter: LNBFrontmatterChild,
): frontmatter is LNBFrontmatterItem => 'slug' in frontmatter;
