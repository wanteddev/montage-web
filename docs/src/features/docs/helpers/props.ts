import { join } from 'node:path';
import { readFileSync } from 'node:fs';

import type { ComponentDoc } from 'react-docgen-typescript';

export const generatePropTypes = () => {
  const { result } = JSON.parse(
    readFileSync(join(process.cwd(), './src/data.json'), 'utf8'),
  ) as {
    result: Array<ComponentDoc>;
  };

  return result;
};
