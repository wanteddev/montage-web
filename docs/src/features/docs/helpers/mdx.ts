import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import { sync } from 'glob';
import matter from 'gray-matter';

import { shouldNotSerializeMDXFrontmatters } from '../constants';

import { remarkStyle, remarkTable } from './remark';
import { shouldNotSerializeMDX } from './overview';

import type {
  MDXRemoteSerializeResult,
  SerializeOptions,
} from 'node_modules/next-mdx-remote/dist/types';
import type { Frontmatter } from '@/features/docs/types';

const ROOT_PATH = process.cwd();
export const DATA_PATH = join(ROOT_PATH, 'data');

export const getAllFrontmatter = async () => {
  const paths = sync(`${DATA_PATH}/**/*.{mdx,md}`);

  return [
    ...paths.map((filePath) => {
      const source = readFileSync(join(filePath), 'utf8');
      const { data } = matter(source);

      return {
        ...(data as Frontmatter),
        slug: filePath
          .replace(`${DATA_PATH}/`, '')
          .replace(/\.mdx|\.md$/, '')
          .replace(/\/index$/, '')
          .split('/'),
        originSlug: filePath
          .replace(`${DATA_PATH}/`, '')
          .replace(/\.mdx|\.md$/, '')
          .split('/'),
      } as Frontmatter;
    }),
    ...shouldNotSerializeMDXFrontmatters,
  ];
};

const SERIALIZE_OPTIONS: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm, remarkStyle, remarkTable],
  },
};

export const getSourceBySlug = async (
  basePath: string,
  slug: Array<string>,
) => {
  if (shouldNotSerializeMDX(slug)) {
    const frontmatter = shouldNotSerializeMDXFrontmatters.find(
      (item) => item.slug.toString() === slug.toString(),
    );

    if (!frontmatter) {
      throw new Error(`${slug.join('/')} is not found`);
    }

    return {
      frontmatter,
    } as MDXRemoteSerializeResult<unknown, Frontmatter>;
  }

  if (existsSync(join(DATA_PATH, basePath, `${slug.join('/')}.mdx`))) {
    return serialize<unknown, Frontmatter>(
      readFileSync(join(DATA_PATH, basePath, `${slug.join('/')}.mdx`), 'utf8'),
      SERIALIZE_OPTIONS,
    );
  }

  if (existsSync(join(DATA_PATH, basePath, `${slug.join('/')}.md`))) {
    return serialize<unknown, Frontmatter>(
      readFileSync(join(DATA_PATH, basePath, `${slug.join('/')}.md`), 'utf8'),
      SERIALIZE_OPTIONS,
    );
  }

  if (existsSync(join(DATA_PATH, basePath, `${slug.join('/')}/index.md`))) {
    return serialize<unknown, Frontmatter>(
      readFileSync(
        join(DATA_PATH, basePath, `${slug.join('/')}/index.md`),
        'utf8',
      ),
      SERIALIZE_OPTIONS,
    );
  }

  return serialize<unknown, Frontmatter>(
    readFileSync(
      join(DATA_PATH, basePath, `${slug.join('/')}/index.mdx`),
      'utf8',
    ),
    SERIALIZE_OPTIONS,
  );
};

export const findFrontmatterByParams = async (params: Array<string>) => {
  if (params.length > 1 || params.length === 0) {
    return;
  }

  const allFrontmatter = await getAllFrontmatter();

  return allFrontmatter.find(
    (frontmatter) => frontmatter.slug.at(0) === params.at(0),
  );
};
