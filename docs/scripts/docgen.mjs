import path from 'path';
import fs from 'fs';

import { sync } from 'glob';
import { withCustomConfig } from 'react-docgen-typescript';

const parser = withCustomConfig(
  path.join(process.cwd(), '../packages/wds/tsconfig.json'),
  {
    propFilter: (prop) => {
      if (prop.name === 'css') {
        return false;
      }
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return (
              declaration.fileName.includes('radix-ui') ||
              declaration.fileName.includes('react-remove-scroll') ||
              !declaration.fileName.includes('node_modules')
            );
          },
        );

        return Boolean(hasPropAdditionalDescription);
      }

      return true;
    },
  },
);

const main = () => {
  const getPathName = (pathname) =>
    path.join(process.cwd(), `../packages/wds/src/${pathname}`);

  const paths = sync(getPathName('components/index.ts'));

  // props가 나오지 않는 경우 수동으로 파일을 추가 해야함.

  const output = [
    ...paths.map((file) => parser.parse(file)).flat(1),
    ...parser.parse(sync(getPathName('theme-provider/index.tsx'))),
    ...parser.parse(sync(getPathName('components/avatar-button/index.tsx'))),
    ...parser.parse(sync(getPathName('components/button/index.tsx'))),
    ...parser.parse(sync(getPathName('components/chip-action/index.tsx'))),
    ...parser.parse(sync(getPathName('components/text-button/index.tsx'))),
    ...parser.parse(sync(getPathName('components/icon-button/index.tsx'))),
    ...parser.parse(sync(getPathName('components/typography/index.tsx'))),
    ...parser.parse(sync(getPathName('components/floating-action/index.tsx'))),
    ...parser.parse(sync(getPathName('components/grid/index.tsx'))),
    ...parser.parse(sync(getPathName('components/grid-item/index.tsx'))),
  ];

  fs.writeFileSync(
    path.join(process.cwd(), `../docs/src/data.json`),
    JSON.stringify({ result: output }),
    'utf-8',
  );
};

main();
