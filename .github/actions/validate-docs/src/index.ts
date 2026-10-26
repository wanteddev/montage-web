import fs from 'node:fs';

import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';

import { serializeMdx } from '../../../../docs/src/features/docs/helpers/mdx';

const getPatterns = () =>
  (process.env.INPUT_FILES || '**/*.{md,mdx}')
    .split('\n')
    .map((pattern) => pattern.trim())
    .filter(Boolean);

/**
 * next-mdx-remote가 감싼 에러에는 위치 정보가 없어서, 원본 MDX 컴파일러로 다시 컴파일해 줄 번호를 찾는다
 * frontmatter는 같은 줄 수의 빈 줄로 바꿔 원본 파일 기준 줄 번호를 유지한다
 */
const findErrorLine = async (source: string) => {
  const content = source.replace(/^---\n[\s\S]*?\n---/, (frontmatter) =>
    frontmatter.replace(/[^\n]/g, ''),
  );

  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
  } catch (error) {
    return (error as { line?: number }).line;
  }
};

const run = async () => {
  const files = fs.globSync(getPatterns(), {
    exclude: (file) => file.includes('node_modules'),
  });
  const failures: Array<string> = [];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');

    try {
      await serializeMdx(source);
    } catch (error) {
      const line = await findErrorLine(source);
      const message = (error as Error).message
        .replace('[next-mdx-remote] error compiling MDX:', '')
        .replace(/More information: .*$/, '')
        .trim();

      failures.push(file);
      console.log(
        `::error file=${file}${line ? `,line=${line}` : ''}::${message.replace(/\n/g, '%0A')}`,
      );
    }
  }

  console.log(`\n${files.length}개 문서 중 ${failures.length}개 컴파일 실패`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
};

run();
