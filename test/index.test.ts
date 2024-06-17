import { compressToEncodedURIComponent } from 'lz-string';

import type { Fixture } from './types';

describe('Design System UI Tests', () => {
  it.each(global.fixture as Array<[string, Fixture]>)(
    'ui test for %s',
    async (_, { code, select, name }) => {
      await page.goto(
        `http://localhost:3000/wds/playground?code=${compressToEncodedURIComponent(code)}`,
      ); // 로컬 서버 URL에 맞게 수정
      await select(page);

      const screenshot = await page.screenshot();

      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: name,
      });
    },
  );
});
