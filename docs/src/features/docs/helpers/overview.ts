import {
  componentOverviewFrontmatter,
  foundationsOverviewFrontmatter,
  getStartedFrontmatter,
  shouldNotSerializeMDXFrontmatters,
} from '../constants';

export const isComponentOverview = (slug: Array<string>) =>
  slug.toString() === componentOverviewFrontmatter.slug.toString();

export const isGetStarted = (slug: Array<string>) =>
  slug.toString() === getStartedFrontmatter.slug.toString();

export const isFoundationsOverview = (slug: Array<string>) =>
  slug.toString() === foundationsOverviewFrontmatter.slug.toString();

export const shouldNotSerializeMDX = (slug: Array<string>) =>
  shouldNotSerializeMDXFrontmatters.some(
    (item) => item.slug.toString() === slug.toString(),
  );
