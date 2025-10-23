import {
  getStartedFrontmatter,
  shouldNotSerializeMDXFrontmatters,
} from '../constants';

export const isGetStarted = (slug: Array<string>) =>
  slug.toString() === getStartedFrontmatter.slug.toString();

export const shouldNotSerializeMDX = (slug: Array<string>) =>
  shouldNotSerializeMDXFrontmatters.some(
    (item) => item.slug.toString() === slug.toString(),
  );
