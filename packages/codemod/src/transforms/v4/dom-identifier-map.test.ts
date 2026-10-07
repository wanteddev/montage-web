import { describe, expect, it } from 'vitest';

import {
  WDS_DOM_IDENTIFIER_PATTERN,
  renameWdsDomIdentifiersInString,
} from './dom-identifier-map';

describe('dom-identifier-map', () => {
  it('속성 선택자와 id 선택자를 바꾼다', () => {
    expect(renameWdsDomIdentifiersInString("[wds-component='x']")).toBe(
      "[data-component='x']",
    );
    expect(renameWdsDomIdentifiersInString('#wds-region-manager-bottom')).toBe(
      '#montage-region-manager-bottom',
    );
  });

  it('단어 중간(data-wds-component, --wds-component)은 건드리지 않는다', () => {
    const source = '[data-wds-component="x"] { --wds-component: 1; }';

    expect(renameWdsDomIdentifiersInString(source)).toBe(source);
    expect(WDS_DOM_IDENTIFIER_PATTERN.test('data-wds-component')).toBe(false);
  });

  it('더 긴 식별자(wds-component-extra)는 건드리지 않는다', () => {
    const source = '[wds-component-extra="x"] #wds-region-manager-top';

    expect(renameWdsDomIdentifiersInString(source)).toBe(source);
    expect(WDS_DOM_IDENTIFIER_PATTERN.test('wds-component-extra')).toBe(false);
  });

  it('wds-region-manager와 wds-region-manager-bottom을 각각 바꾼다', () => {
    expect(
      renameWdsDomIdentifiersInString(
        '#wds-region-manager, #wds-region-manager-bottom',
      ),
    ).toBe('#montage-region-manager, #montage-region-manager-bottom');
  });

  it('두 번 적용해도 결과가 같다', () => {
    const once = renameWdsDomIdentifiersInString(
      '[wds-component] [wds-ignore-first-focus] #wds-region-manager',
    );

    expect(renameWdsDomIdentifiersInString(once)).toBe(once);
  });
});
