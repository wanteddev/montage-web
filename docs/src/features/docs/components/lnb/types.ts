import type { Frontmatter } from '../../types';

export type LNBFrontmatterChildObj = {
  key: string;
  children: Array<Frontmatter>;
  defaultOpen?: boolean;
};

export type LNBFrontmatterChild = LNBFrontmatterChildObj | Frontmatter;

export type LNBFrontmatterType = {
  key: string;
  defaultOpen?: boolean;
  children: Array<LNBFrontmatterChild>;
};

export type LNBFrontmatterGroup = Array<LNBFrontmatterType>;

export type SlugParams = { slug: Array<string> };
