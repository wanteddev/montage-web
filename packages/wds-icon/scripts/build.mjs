import fs from 'node:fs';
import path from 'node:path';

import * as changeCase from 'change-case';

const files = fs
  .readdirSync(path.join(process.cwd(), 'src'))
  .filter((v) => v !== 'index.ts')
  .map((v) => v.replace('.tsx', ''));

const content = `${files
  .map(
    (file) =>
      `export { default as ${changeCase.pascalCase(
        file,
      )} } from \'./${changeCase.kebabCase(file)}\';`,
  )
  .join('\n')}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/index.ts'), content, 'utf-8');
