import fs from 'node:fs';

import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

type ErrorWithPosition = Error & {
  line?: number;
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
 * 아래 두 전처리는 docs/src/features/docs/helpers/mdx.ts와 동일하게 유지한다
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

const validate = async (source: string) => {
  let content: string;

  try {
    // docs 빌드처럼 gray-matter로 frontmatter를 파싱한다
    // 옵션을 넘기지 않으면 같은 내용의 파일은 캐시를 반환해 파싱 에러가 다시 나지 않는다
    ({ content } = matter(source, MATTER_OPTIONS));
  } catch (error) {
    const { message, mark } = error as ErrorWithPosition;

    // mark.line은 여는 --- 줄부터 0으로 세므로 1을 더하면 원본 파일 기준 줄 번호다
    return { message, line: mark ? mark.line + 1 : undefined };
  }

  // gray-matter가 frontmatter로 인식한 범위만 같은 줄 수의 빈 줄로 바꿔 본문 에러 위치가 원본 파일 기준이 되게 한다
  const frontmatter = source.slice(0, source.length - content.length);
  const body = frontmatter.replace(/[^\n]/g, '') + content;

  try {
    await compile(preprocessDemoCode(preprocessGenericTypes(body)), {
      remarkPlugins: [remarkGfm],
    });
  } catch (error) {
    const { message, line } = error as ErrorWithPosition;

    return { message, line };
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
