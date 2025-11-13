import type { Frontmatter } from '@/features/docs/types';

export type UtilitiesFrontmatter = {
  title: string;
  children: Array<Frontmatter>;
};
