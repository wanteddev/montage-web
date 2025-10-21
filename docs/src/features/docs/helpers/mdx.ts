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
const DATA_PATH = join(ROOT_PATH, 'data');

const makeSlug = (filePath: string) => {
  return {
    slug: filePath
      .replace(`${DATA_PATH}/`, '')
      .replace(/\.mdx|\.md$/, '')
      .replace(/\/index$/, '')
      .split('/'),
    originSlug: filePath
      .replace(`${DATA_PATH}/`, '')
      .replace(/\.mdx|\.md$/, '')
      .split('/'),
  };
};

const getFilePaths = (slug: Array<string>) => [
  join(DATA_PATH, `${slug.join('/')}.mdx`),
  join(DATA_PATH, `${slug.join('/')}.md`),
  join(DATA_PATH, `${slug.join('/')}/index.md`),
  join(DATA_PATH, `${slug.join('/')}/index.mdx`),
];

export const getFrontmatterBySlug = async (slug: Array<string>) => {
  if (shouldNotSerializeMDX(slug)) {
    const frontmatter = shouldNotSerializeMDXFrontmatters.find(
      (item) => item.slug.toString() === slug.toString(),
    );

    if (!frontmatter) {
      throw new Error(`${slug.join('/')} is not found`);
    }

    return frontmatter;
  }

  const filePaths = getFilePaths(slug);

  const filePath = filePaths.find((path) => existsSync(path));

  if (!filePath) {
    throw new Error(`File not found for slug: ${slug.join('/')}`);
  }

  const { data } = matter(readFileSync(filePath, 'utf8'));

  return {
    ...data,
    ...makeSlug(filePath),
  } as Frontmatter;
};

export const getAllFrontmatter = async () => {
  const paths = sync(`${DATA_PATH}/**/*.{mdx,md}`);

  return [
    ...paths.map((filePath) => {
      const source = readFileSync(join(filePath), 'utf8');
      const { data } = matter(source);

      return {
        ...(data as Frontmatter),
        ...makeSlug(filePath),
      } as Frontmatter;
    }),
    ...shouldNotSerializeMDXFrontmatters,
  ];
};

/**
 * https://github.com/mdx-js/mdx/issues/2574
 */
const preprocessDemoCode = (source: string): string => {
  return source.replace(
    /<Demo\s+code=\{`([^`]*)`\}/g,
    (match, codeContent: string) => {
      const lines = codeContent.split('\n');
      const processedLines = lines.map((line) => {
        // 줄의 시작 공백이 2개 이상이면 2개 추가
        const spaceMatch = line.match(/^( {2,})/);
        if (spaceMatch) {
          return '  ' + line;
        }
        return line;
      });
      return `<Demo code={\`${processedLines.join('\n')}\`}`;
    },
  );
};

const SERIALIZE_OPTIONS: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm, remarkStyle, remarkTable],
  },
};

export const getSourceBySlug = async (slug: Array<string>) => {
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

  const filePaths = getFilePaths(slug);

  const filePath = filePaths.find((path) => existsSync(path));

  if (!filePath) {
    throw new Error(`File not found for slug: ${slug.join('/')}`);
  }

  const source = preprocessDemoCode(readFileSync(filePath, 'utf8'));

  return serialize<unknown, Frontmatter>(source, SERIALIZE_OPTIONS);
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
