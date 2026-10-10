import jscodeshift from 'jscodeshift';
import { describe, expect, it } from 'vitest';

import { renameWdsVariablesInString } from './css-variable-map';
import transformer from './css-variable-migration';

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

const renameCss = (css: string) => {
  const unresolved: Array<string> = [];
  const output = renameWdsVariablesInString(css, {
    onUnresolved: (excerpt) => unresolved.push(excerpt),
  });

  return { output, unresolved };
};

// v4는 --modal-content-margin을 -x / -y로 나눴다. 접두사만 떼면 존재하지 않는
// 변수가 되고, fallback 없는 var()는 선언 전체를 무효로 만든다.
describe('css-variable-migration — --wds-modal-content-margin 분할', () => {
  it.each([
    ['padding-left', 'x'],
    ['padding-inline', 'x'],
    ['margin-inline-end', 'x'],
    ['right', 'x'],
    ['padding-top', 'y'],
    ['padding-block-end', 'y'],
    ['bottom', 'y'],
  ])('%s는 -%s로 옮긴다', (property, axis) => {
    const { output, unresolved } = renameCss(
      `.a { ${property}: var(--wds-modal-content-margin); }`,
    );

    expect(output).toBe(
      `.a { ${property}: var(--modal-content-margin-${axis}); }`,
    );
    expect(unresolved).toEqual([]);
  });

  it('padding shorthand는 값의 자리로 축을 정한다', () => {
    const { output, unresolved } = renameCss(`.a {
  padding: 0 var(--wds-modal-content-margin);
  margin: var(--wds-modal-content-margin) calc(var(--wds-modal-content-margin) * -1) 0 !important;
}`);

    expect(output).toBe(`.a {
  padding: 0 var(--modal-content-margin-x);
  margin: var(--modal-content-margin-y) calc(var(--modal-content-margin-x) * -1) 0 !important;
}`);
    expect(unresolved).toEqual([]);
  });

  it('정의와 값 하나짜리 shorthand는 축을 정할 수 없어 보고한다', () => {
    const { output, unresolved } = renameCss(`.a {
  --wds-modal-content-margin: 16px;
  padding: var(--wds-modal-content-margin);
  gap: var(--wds-modal-content-margin);
}`);

    expect(output).toBe(`.a {
  --modal-content-margin: 16px;
  padding: var(--modal-content-margin);
  gap: var(--modal-content-margin);
}`);
    expect(unresolved).toHaveLength(3);
  });

  it('다른 --wds-* 변수는 기존처럼 접두사만 뗀다', () => {
    expect(
      renameCss('.a { padding-left: var(--wds-action-area-margin-x); }').output,
    ).toBe('.a { padding-left: var(--action-area-margin-x); }');
  });

  it('인라인 스타일 객체는 key로 축을 정한다', () => {
    const { output, reports } = applyTransform(
      `const style = { paddingLeft: 'var(--wds-modal-content-margin)', paddingTop: 'var(--wds-modal-content-margin)' };\n`,
    );

    expect(output).toContain('paddingLeft: "var(--modal-content-margin-x)"');
    expect(output).toContain('paddingTop: "var(--modal-content-margin-y)"');
    expect(reports).toEqual([]);
  });

  it('css 템플릿의 선언으로 축을 정하고, 정하지 못한 곳은 보고한다', () => {
    const { output, reports } = applyTransform(
      'const a = css`\n  padding: 0 var(--wds-modal-content-margin);\n  --wds-modal-content-margin: 0;\n`;\n',
    );

    expect(output).toBe(
      'const a = css`\n  padding: 0 var(--modal-content-margin-x);\n  --modal-content-margin: 0;\n`;\n',
    );
    expect(reports).toHaveLength(1);
    expect(reports[0]).toContain('--wds-modal-content-margin: 0;');
  });
});
