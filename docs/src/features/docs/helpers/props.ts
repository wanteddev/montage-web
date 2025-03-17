import path from 'path';
import fs from 'fs';

import type { ComponentDoc } from 'react-docgen-typescript';

export const generatePropTypes = () => {
  const { result } = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), './src/data.json'), 'utf8'),
  ) as {
    result: Array<ComponentDoc>;
  };

  return result;
};
