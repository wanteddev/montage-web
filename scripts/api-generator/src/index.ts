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
const iconExports = Array.from(
  iconBarrelContent.matchAll(
    /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*'([^']+)'/g,
  ),
  (match) => ({ name: match[1], modulePath: match[2] }),
);

const iconDir = path.dirname(iconBarrelPath);
const icons = iconExports.map(({ name, modulePath }) => {
  const filePath = path.join(iconDir, `${modulePath}.tsx`);
  let description = '';

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const jsdocMatch = content.match(/\/\*\*\s*\n([\s\S]*?)\*\//);
    if (jsdocMatch) {
      description = jsdocMatch[1]
        .split('\n')
        .map((line) => line.replace(/^\s*\*\s?/, '').trim())
        .filter(Boolean)
        .join('\n');
    }
  }

  return { name, description };
});

fs.writeFileSync(
  path.join(outputDirectory, 'icons.json'),
  JSON.stringify(icons, null, 2),
);
