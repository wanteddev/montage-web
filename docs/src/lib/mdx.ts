import { readFileSync } from 'fs';
import { join } from 'path';

import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import { sync } from 'glob';
import matter from 'gray-matter';

import type { Frontmatter } from '@/types/mdx';

const ROOT_PATH = process.cwd();
export const DATA_PATH = join(ROOT_PATH, 'src/docs');

export const getAllFrontmatter = async (fromPath: string) => {
  const PATH = join(DATA_PATH, fromPath);
  const paths = sync(`${PATH}/**/*.mdx`);

  return paths.map((filePath) => {
    const source = readFileSync(join(filePath), 'utf8');
    const { data } = matter(source);

    return {
      ...(data as Frontmatter),
      slug: filePath
        .replace(`${DATA_PATH}/`, '')
        .replace('.mdx', '')
        .split('/'),
    } as Frontmatter;
  });
};

export const getSourceBySlug = async (
  basePath: string,
  slug: Array<string>,
) => {
  const source = readFileSync(
    join(DATA_PATH, basePath, `${slug.join('/')}.mdx`),
    'utf8',
  );

  return serialize<unknown, Frontmatter>(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm],
    },
  });
};
