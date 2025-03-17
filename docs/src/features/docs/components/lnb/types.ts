import type { Frontmatter } from '../../types';

export type LNBFrontmatterChild =
  | { key: string; children: Array<Frontmatter>; defaultOpen?: boolean }
  | Frontmatter;

export type LNBFrontmatterType = {
  key: string;
  defaultOpen?: boolean;
  children: Array<LNBFrontmatterChild>;
};

export type LNBFrontmatterGroup = Array<LNBFrontmatterType>;
