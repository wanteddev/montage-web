import type { Frontmatter } from '../../types';

export type LNBFrontmatterChild = LNBFrontmatterType | Frontmatter;

export type LNBFrontmatterType = {
  key: string;
  defaultOpen?: boolean;
  children: Array<LNBFrontmatterChild>;
};

export type LNBFrontmatterGroup = Array<LNBFrontmatterType>;

export type SlugParams = { slug?: Array<string> };
