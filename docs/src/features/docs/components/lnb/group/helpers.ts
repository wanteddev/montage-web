import type { Frontmatter } from '@/features/docs/types';
import type { LNBFrontmatterChild, LNBFrontmatterType } from '../types';

export const isFrontmatter = (
  frontmatter: LNBFrontmatterChild | LNBFrontmatterType,
): frontmatter is Frontmatter => 'slug' in frontmatter;
