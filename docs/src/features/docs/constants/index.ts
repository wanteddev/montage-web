import type { Frontmatter } from '../types';

export const componentOverviewFrontmatter: Frontmatter = {
  title: 'Overview',
  description: '컴포넌트 개요',
  slug: ['components', 'overview'],
  originSlug: ['components', 'overview', 'index'],
};

export const foundationsOverviewFrontmatter: Frontmatter = {
  title: 'Overview',
  description: 'Foundations Overview',
  slug: ['foundations', 'overview'],
  originSlug: ['foundations', 'overview', 'index'],
};

export const getStartedFrontmatter: Frontmatter = {
  title: 'Get started',
  description: 'Welcome to montage',
  slug: ['get-started'],
  originSlug: ['get-started', 'index'],
};

export const shouldNotSerializeMDXFrontmatters = [
  componentOverviewFrontmatter,
  foundationsOverviewFrontmatter,
  getStartedFrontmatter,
];
