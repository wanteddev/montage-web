export type Frontmatter = {
  title: string;
  description?: string;
  image?: string;
  slug: Array<string>;
  originSlug: Array<string>;
  createdAt?: string;
  updatedAt?: string;
  isPrivate?: boolean;
};

export type GroupedPages = Record<
  string,
  Array<Frontmatter | Record<string, Array<Frontmatter>>>
>;

export type SlugParams = { slug?: Array<string> };
