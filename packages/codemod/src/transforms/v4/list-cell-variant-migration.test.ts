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

describe('list-cell-variant-migration — textProps', () => {
  it('caption을 description으로 바꾼다', () => {
    const { output } = applyTransform(
      withImport(`<ListCell textProps={{ caption: '설명' }}>레이블</ListCell>`),
    );

    expect(output).toContain(`textProps={{ description: '설명' }}`);
    expect(output).not.toContain('caption');
  });

  it('captionProps를 descriptionProps로 바꾼다', () => {
    const { output } = applyTransform(
      withImport(
        `<ListCell textProps={{ captionProps: { color: 'red' } }}>레이블</ListCell>`,
      ),
    );

    expect(output).toContain('descriptionProps');
    expect(output).not.toContain('captionProps');
  });

  // 축약형에서 키만 바꾸면 값으로 쓰인 지역 변수 이름까지 함께 바뀐다.
  it('축약형 { caption }을 { description: caption }으로 펼친다', () => {
    const { output } = applyTransform(
      withImport('<ListCell textProps={{ caption }}>레이블</ListCell>'),
    );

    expect(output).toContain('description: caption');
  });

  it('문자열 키도 식별자 키로 정규화하며 바꾼다', () => {
    const { output } = applyTransform(
      withImport(
        `<ListCell textProps={{ 'caption': '설명' }}>레이블</ListCell>`,
      ),
    );

    expect(output).toContain(`description: '설명'`);
    expect(output).not.toContain('caption');
  });

  it('나머지 textProps 키는 건드리지 않는다', () => {
    const { output } = applyTransform(
      withImport(
        `<ListCell textProps={{ variant: 'body1', caption: '설명' }}>레이블</ListCell>`,
      ),
    );

    expect(output).toContain(`variant: 'body1'`);
    expect(output).toContain(`description: '설명'`);
  });

  it('삼항식 양쪽 객체를 모두 바꾼다', () => {
    const { output } = applyTransform(
      withImport(
        `<ListCell textProps={dense ? { caption: 'a' } : { caption: 'b' }}>레이블</ListCell>`,
      ),
    );

    expect(output).toContain(`description: 'a'`);
    expect(output).toContain(`description: 'b'`);
    expect(output).not.toContain('caption');
  });

  it('MenuItem의 textProps에도 적용한다', () => {
    const { output } = applyTransform(
      `import { MenuItem } from '@montage-ui/core';\n\nconst App = () => <MenuItem textProps={{ caption: '설명' }}>레이블</MenuItem>;\n`,
    );

    expect(output).toContain(`description: '설명'`);
  });

  it('객체 리터럴이 아니면 건드리지 않고 리포트를 남긴다', () => {
    const { output, reports } = applyTransform(
      withImport('<ListCell textProps={textProps}>레이블</ListCell>'),
    );

    expect(output).toContain('textProps={textProps}');
    expect(reports).toHaveLength(1);
    expect(reports[0]).toContain('객체 리터럴이 아니라');
  });

  it('스프레드가 섞이면 명시된 키만 바꾸고 리포트를 남긴다', () => {
    const { output, reports } = applyTransform(
      withImport(
        `<ListCell textProps={{ ...base, caption: '설명' }}>레이블</ListCell>`,
      ),
    );

    expect(output).toContain(`description: '설명'`);
    expect(output).toContain('...base');
    expect(reports).toHaveLength(1);
    expect(reports[0]).toContain('스프레드');
  });

  it('textProps가 없으면 리포트하지 않는다', () => {
    const { reports } = applyTransform(
      withImport('<ListCell>레이블</ListCell>'),
    );

    expect(reports).toHaveLength(0);
  });
});
