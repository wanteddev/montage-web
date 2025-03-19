import type { Frontmatter } from '../../types';

export type LNBFrontmatterItem = Frontmatter & { isActive: boolean };

export type LNBFrontmatterChildObj = {
  key: string;
  children: Array<LNBFrontmatterItem>;
  defaultOpen?: boolean;
  isActive: boolean;
};

export type LNBFrontmatterChild = LNBFrontmatterChildObj | LNBFrontmatterItem;

export type LNBFrontmatterType = {
  key: string;
  defaultOpen?: boolean;
  isActive: boolean;
  children: Array<LNBFrontmatterChild>;
};

export type LNBFrontmatterGroup = Array<LNBFrontmatterType>;
