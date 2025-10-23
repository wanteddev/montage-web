import { shouldNotSerializeMDXFrontmatters } from '../constants';

export const shouldNotSerializeMDX = (slug: Array<string>) =>
  shouldNotSerializeMDXFrontmatters.some(
    (item) => item.slug.toString() === slug.toString(),
  );
