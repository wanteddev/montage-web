import jscodeshift from 'jscodeshift';
import { describe, expect, it } from 'vitest';

import transformer from './semantic-token-migration';

import type { API, FileInfo } from 'jscodeshift';

const applyTransform = (source: string) => {
  const api = {
    jscodeshift,
    j: jscodeshift,
    stats: () => undefined,
    report: () => undefined,
  } as unknown as API;

  const file: FileInfo = { path: 'test.tsx', source };

  return transformer(file, api, {});
};

// recast는 return 문 안에서 무엇이든 바뀌면 `return (` 로 감싼 JSX를 일반
// printer로 다시 출력하면서 JSXText 앞 줄바꿈을 지웠다. 이렇게 망가진 서식에
// eslint --fix(prettier/prettier + react/jsx-indent)를 돌리면 텍스트가
// 통째로 사라진다.
describe('semantic-token-migration — return 문 JSX 서식 보존', () => {
  it('자식 아이콘의 토큰만 바뀌어도 버튼 라벨 줄바꿈과 들여쓰기를 유지한다', () => {
    const source = `const DeleteButton = ({ checkedTotal, handleDelete }) => {
  return (
    <Button
      variant="outlined"
      leadingContent={
        <IconTrash
          sx={(theme) => ({
            color: checkedTotal ? theme.semantic.static.black : theme.semantic.label.assistive,
          })}
        />
      }
      onClick={handleDelete}>
      삭제
      {checkedTotal > 0 && \` (\${checkedTotal})\`}
    </Button>
  );
};
`;

    expect(applyTransform(source)).toBe(
      source.replace(
        'theme.semantic.label.assistive',
        'theme.semantic.foreground.neutral.quaternary',
      ),
    );
  });

  it('여는 태그의 토큰이 바뀌어도 텍스트를 여는 태그 줄로 올리지 않는다', () => {
    const source = `function CardTitle() {
  return (
    <div className={theme.semantic.label.normal}>
      기술 스택
      <span />
    </div>
  );
}
`;

    expect(applyTransform(source)).toBe(
      source.replace(
        'theme.semantic.label.normal',
        'theme.semantic.foreground.neutral.primary',
      ),
    );
  });

  it('문자열 토큰과 Fragment에도 서식을 유지한다', () => {
    const source = `function Title() {
  return (
    <>
      기술 스택
      <Typography color="semantic.label.normal" />
    </>
  );
}
`;

    expect(applyTransform(source)).toBe(
      source.replace(
        'semantic.label.normal',
        'semantic.foreground.neutral.primary',
      ),
    );
  });
});
