import fs from 'node:fs';

import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import {
  remarkStyle,
  remarkTable,
} from '../../../../docs/src/features/docs/helpers/remark';

type YAMLError = Error & {
  mark?: { line: number };
};

const getPatterns = () =>
  (process.env.INPUT_FILES || '**/*.{md,mdx}')
    .split('\n')
    .map((pattern) => pattern.trim())
    .filter(Boolean);

const isMobileSource = process.env['INPUT_MOBILE-SOURCE'] === 'true';

/**
 * generate-mobile-docs/src/helpers.ts와 동일하게 유지한다
 */
const normalizeFrontmatter = (content: string) =>
  content.replace(/^(---\n[\s\S]*?\n---)/, (frontmatter) =>
    frontmatter.replace(/`/g, ''),
  );

/**
 * 아래 두 전처리와 serialize 옵션은 docs/src/features/docs/helpers/mdx.ts와 동일하게 유지한다
 * 줄 수를 바꾸지 않으므로 에러 위치는 원본 파일 기준 그대로다
 */
const preprocessDemoCode = (source: string): string => {
  return source.replace(
    /<Demo\s+code=\{`([^`]*)`\}/g,
    (match, codeContent: string) => {
      const lines = codeContent.split('\n');
      const processedLines = lines.map((line) => {
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

const preprocessGenericTypes = (source: string): string => {
  return source.replace(/(\|[^|\n]*?)(<|>)([^|\n]*?)(?=\|)/g, (match) => {
    return match.replace(/</g, '\\<').replace(/>/g, '\\>');
  });
};

/**
 * gray-matter는 ---js frontmatter를 eval로 실행하므로, 검증 대상 문서의 코드가 검증 단계에서 실행되지 않게 막는다
 */
const rejectJavaScriptFrontmatter = () => {
  throw new Error('JavaScript frontmatter는 지원하지 않습니다');
};

const MATTER_OPTIONS = {
  engines: {
    js: rejectJavaScriptFrontmatter,
    javascript: rejectJavaScriptFrontmatter,
  },
};

/**
 * serialize가 frontmatter를 떼어낼 때 쓰는 vfile-matter와 같은 정규식
 */
const FRONTMATTER_REGEX =
  /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

const REMARK_PLUGINS = [remarkGfm, remarkStyle, remarkTable];
const REHYPE_PLUGINS = [rehypeSlug];

/**
 * serialize 에러는 위치 정보가 빠지는 경우가 많아, 같은 본문과 플러그인으로 MDX 컴파일러를 다시 돌려 줄 번호를 찾는다
 * serialize가 떼어내는 frontmatter 범위는 같은 줄 수의 빈 줄로 바꿔 원본 파일 기준 줄 번호를 유지한다
 */
const findErrorLine = async (source: string) => {
  const frontmatter = FRONTMATTER_REGEX.exec(source)?.[0] ?? '';
  const body =
    frontmatter.replace(/[^\n]/g, '') + source.slice(frontmatter.length);

  try {
    await compile(body, {
      rehypePlugins: REHYPE_PLUGINS,
      remarkPlugins: REMARK_PLUGINS,
    });
  } catch (error) {
    return (error as { line?: number }).line;
  }
};

const validate = async (rawSource: string) => {
  try {
    // docs 빌드는 목록·메타데이터를 gray-matter로 읽으므로 같은 파서로 frontmatter를 확인한다
    // 옵션을 넘기지 않으면 같은 내용의 파일은 캐시를 반환해 파싱 에러가 다시 나지 않는다
    matter(rawSource, MATTER_OPTIONS);
  } catch (error) {
    const { message, mark } = error as YAMLError;

    // mark.line은 여는 --- 줄부터 0으로 세므로 1을 더하면 원본 파일 기준 줄 번호다
    return { message, line: mark ? mark.line + 1 : undefined };
  }

  const source = preprocessDemoCode(preprocessGenericTypes(rawSource));

  try {
    // remarkPropsTable은 docs/generated/api.json이 있을 때만 동작하고 검증 환경에는 없으므로 제외한다
    await serialize(source, {
      parseFrontmatter: true,
      blockJS: false,
      mdxOptions: {
        rehypePlugins: REHYPE_PLUGINS,
        remarkPlugins: REMARK_PLUGINS,
      },
    });
  } catch (error) {
    const { message } = error as Error;
    // 첫 줄의 [next-mdx-remote] 접두어와 코드 프레임을 빼고 원래 에러 메시지만 남긴다
    const [summary = ''] = message.split('\n\n');

    return {
      message: summary.split('\n').slice(1).join('\n'),
      line: await findErrorLine(source),
    };
  }
};

const run = async () => {
  const files = fs.globSync(getPatterns(), {
    exclude: (file) => file.includes('node_modules'),
  });
  const failures: Array<string> = [];

  // 대상이 없으면 경로 오타나 문서 생성 실패일 수 있으므로 통과시키지 않는다
  if (files.length === 0) {
    console.log(`::error::검증할 문서가 없습니다: ${getPatterns().join(', ')}`);
    process.exitCode = 1;

    return;
  }

  for (const file of files) {
    const rawSource = fs.readFileSync(file, 'utf8');
    // 모바일 저장소 원본은 docs로 옮겨질 때와 같은 변환을 거친 뒤 검증한다
    const source = isMobileSource ? normalizeFrontmatter(rawSource) : rawSource;
    const error = await validate(source);

    if (error) {
      failures.push(file);
      console.log(
        `::error file=${file}${error.line ? `,line=${error.line}` : ''}::${error.message.replace(/\n/g, '%0A')}`,
      );
    }
  }

  console.log(`\n${files.length}개 문서 중 ${failures.length}개 컴파일 실패`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
};

run();
