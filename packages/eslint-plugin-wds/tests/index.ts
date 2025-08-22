import { exec } from 'shelljs';

import rules from '../src/rules';

Object.keys(rules).forEach((key) => {
  const { code } = exec(
    `pnpm ts-node -P tsconfig.test.json src/rules/${key}/index.test.ts`,
  );

  if (code !== 0) {
    throw new Error(`${key} failed`);
  }
});
