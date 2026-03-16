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

const iconBarrelPath = path.join(
  process.cwd(),
  '../../packages/wds-icon/src/index.ts',
);
const iconBarrelContent = fs.readFileSync(iconBarrelPath, 'utf-8');
const iconDirPath = path.dirname(iconBarrelPath);

const iconDescriptionRegex = /\/\*\*\s*\n([\s\S]*?)\s*\*\//;

const icons = Array.from(
  iconBarrelContent.matchAll(
    /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*'([^']+)'/g,
  ),
  (match) => {
    const name = match[1];
    const modulePath = match[2];
    const filePath = path.join(iconDirPath, `${modulePath}.tsx`);

    let description = '';
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const descMatch = content.match(iconDescriptionRegex);
      if (descMatch) {
        description = descMatch[1]
          .split('\n')
          .map((line) => line.replace(/^\s*\*\s?/, '').trim())
          .filter(Boolean)
          .join('\n');
      }
    }

    return { name, description };
  },
);

fs.writeFileSync(
  path.join(outputDirectory, 'icons.json'),
  JSON.stringify(icons, null, 2),
);
