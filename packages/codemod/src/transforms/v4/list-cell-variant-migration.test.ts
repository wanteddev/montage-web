import jscodeshift from 'jscodeshift';
import { describe, expect, it } from 'vitest';

import transformer from './list-cell-variant-migration';

import type { API, FileInfo } from 'jscodeshift';

const applyTransform = (source: string) => {
  const reports: Array<string> = [];

  const api = {
    jscodeshift,
    j: jscodeshift,
    stats: () => undefined,
    report: (message: string) => reports.push(message),
  } as unknown as API;

  const file: FileInfo = { path: 'test.tsx', source };

  return { output: transformer(file, api, {}), reports };
};

const withImport = (jsx: string) =>
  `import { ListCell } from '@montage-ui/core';\n\nconst App = () => ${jsx};\n`;

describe('list-cell-variant-migration — fillWidth', () => {
  it('shorthand를 variant="full"로 옮긴다', () => {
    const { output } = applyTransform(withImport('<ListCell fillWidth />'));

    expect(output).toContain('<ListCell variant="full" />');
  });

  it('fillWidth={true}를 variant="full"로 옮긴다', () => {
    const { output } = applyTransform(
      withImport('<ListCell fillWidth={true} />'),
    );

    expect(output).toContain('<ListCell variant="full" />');
  });

  it('fillWidth={false}는 inset이 기본값이라 제거한다', () => {
    const { output } = applyTransform(
      withImport('<ListCell fillWidth={false}>레이블</ListCell>'),
    );

    expect(output).toContain('<ListCell>레이블</ListCell>');
    expect(output).not.toContain('fillWidth');
  });

  it('fillWidth={expr}를 삼항식으로 접는다', () => {
    const { output } = applyTransform(
      withImport('<ListCell fillWidth={isWide} />'),
    );

    expect(output).toContain(
      `<ListCell variant={isWide ? "full" : "inset"} />`,
    );
  });

  // JSX 문자열 리터럴은 boolean이 아니라 문자열 그대로 전달되므로 v3
  // 런타임에서도 truthy/falsy로 평가됐다. 'dynamic'으로 두면 속성 이름만
  // variant로 바뀌고 값이 남아 v4 타입에 없는 variant="true"가 만들어진다.
  describe('문자열 리터럴', () => {
    it('fillWidth="true"를 variant="full"로 옮긴다', () => {
      const { output } = applyTransform(
        withImport('<ListCell fillWidth="true" />'),
      );

      expect(output).toContain('<ListCell variant="full" />');
      expect(output).not.toContain('variant="true"');
    });

    it('fillWidth={\'true\'}도 variant="full"로 옮긴다', () => {
      const { output } = applyTransform(
        withImport(`<ListCell fillWidth={'true'} />`),
      );

      expect(output).toContain('<ListCell variant="full" />');
    });

    it('fillWidth="false"는 런타임 truthy 의미를 보존하고 리포트를 남긴다', () => {
      const { output, reports } = applyTransform(
        withImport('<ListCell fillWidth="false" />'),
      );

      expect(output).toContain('<ListCell variant="full" />');
      expect(output).not.toContain('variant="false"');
      expect(reports).toHaveLength(1);
      expect(reports[0]).toContain('fillWidth="false"');
    });

    it('빈 문자열은 falsy라 제거한다', () => {
      const { output } = applyTransform(
        withImport('<ListCell fillWidth="" />'),
      );

      expect(output).not.toContain('fillWidth');
      expect(output).not.toContain('variant');
    });

    // 같은 요소에서 다른 변환이 일어나 hasChanges가 켜지면 남은 값이 그대로
    // 출력되므로, 속성 이름만 바뀐 중간 상태가 파일에 기록되면 안 된다.
    it('같은 요소의 다른 변환과 함께여도 variant="true"를 만들지 않는다', () => {
      const { output } = applyTransform(
        withImport('<ListCell fillWidth="true" interactionPadding="8px" />'),
      );

      expect(output).toContain('<ListCell variant="full" />');
      expect(output).not.toContain('variant="true"');
      expect(output).not.toContain('interactionPadding');
    });
  });
});
