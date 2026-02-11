import path from 'node:path';
import fs from 'node:fs';

import { Parser } from './parser';

const componentFilter = /components\/.*\/(?!.*\.test\.tsx?$).*\.tsx?$/;

const packages = [
  {
    tsconfigPath: path.join(process.cwd(), '../../packages/wds/tsconfig.json'),
  },
  {
    tsconfigPath: path.join(
      process.cwd(),
      '../../packages/wds-engine/tsconfig.json',
    ),
    filter: /components\/force-theme\//,
  },
];

const componentApi = packages
  .flatMap(({ tsconfigPath, filter }) => {
    const parser = new Parser(tsconfigPath);

    const exportDeclarations = parser
      .getExportedItems()
      .filter(
        (item) =>
          item.filePath.match(componentFilter) &&
          (!filter || item.filePath.match(filter)),
      );

    return parser.parse(exportDeclarations);
  })
  .filter((item, index, self) => {
    return (
      self.findIndex(
        (other) => other.name === item.name && other.filePath === item.filePath,
      ) === index
    );
  });

const outputDirectory = path.join(process.cwd(), '../../docs/generated');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDirectory, 'api.json'),
  JSON.stringify(componentApi, null, 2),
);
