import type { Frontmatter } from '@/features/docs/types';
import type { LNBFrontmatterChild } from '../types';

export const isFrontmatter = (
  frontmatter: LNBFrontmatterChild,
): frontmatter is Frontmatter => 'slug' in frontmatter;
