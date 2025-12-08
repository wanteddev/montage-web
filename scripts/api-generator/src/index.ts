import path from 'node:path';
import fs from 'node:fs';

import { Parser } from './parser';

const tsconfigPath = path.join(
  process.cwd(),
  '../../packages/wds/tsconfig.json',
);

const parser = new Parser(tsconfigPath);

const exportDeclarations = parser
  .getExportedItems()
  .filter((item) =>
    item.filePath.match(/components\/(?!.*\.test\.tsx?$).*\.tsx?$/),
  );

const componentApi = parser.parse(exportDeclarations);

const outputDirectory = path.join(process.cwd(), '../../docs/generated');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDirectory, 'api.json'),
  JSON.stringify(componentApi, null, 2),
);
