export type Frontmatter = {
  title: string;
  description?: string;
  image?: string;
  ogImage?: string;
  slug: Array<string>;
  originSlug: Array<string>;
  createdAt?: string;
  updatedAt?: string;
  isExternal?: boolean;
  url?: string;
};

export type GroupedPages = Record<
  string,
  Array<Frontmatter | Record<string, Array<Frontmatter>>>
>;

export type SlugParams = { slug?: Array<string> };

export type ComponentInfo = {
  name: string;
  props: Array<{
    name: string;
    description?: string;
    type: string;
    defaultValue?: string;
    isOptional?: boolean;
  }>;
  filePath?: string;
};
