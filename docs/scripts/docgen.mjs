import { join } from 'node:path';
import { globSync, writeFileSync } from 'node:fs';

import { withCustomConfig } from 'react-docgen-typescript';

const parser = withCustomConfig(
  join(process.cwd(), '../packages/wds/tsconfig.json'),
  {
    customComponentTypes: [
      'MemoExoticComponent',
      'PolymorphicComponent',
      'PolymorphicComponentInternal',
    ],
    propFilter: (prop) => {
      if (prop.name === 'css' || prop.name.match(/^__scope/)) {
        return false;
      }
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return (
              declaration.fileName.includes('radix-ui') ||
              declaration.fileName.includes('react-remove-scroll') ||
              declaration.fileName.includes('react-hook-form') ||
              declaration.fileName.includes('@wanteddev/wds') ||
              !declaration.fileName.includes('node_modules')
            );
          },
        );

        return Boolean(
          hasPropAdditionalDescription || prop.name === 'wrapperProps',
        );
      }

      return true;
    },
  },
);

const engineParser = withCustomConfig(
  join(process.cwd(), '../packages/wds-engine/tsconfig.json'),
  {
    customComponentTypes: [
      'MemoExoticComponent',
      'PolymorphicComponent',
      'PolymorphicComponentInternal',
    ],
    propFilter: (prop) => {
      if (prop.name === 'css') {
        return false;
      }
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return (
              declaration.fileName.includes('radix-ui') ||
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

const lottieParser = withCustomConfig(
  join(process.cwd(), '../packages/wds-lottie/tsconfig.json'),
  {
    propFilter: (prop) => {
      if (prop.name === 'css') {
        return false;
      }
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return (
              declaration.fileName.includes('lottie-web') ||
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
  const getPathName = (pathname, packageName) =>
    join(process.cwd(), `../packages/${packageName}/src/${pathname}`);

  const output = [
    ...parser.parse(globSync(getPathName('components/index.ts', 'wds'))),
    ...engineParser.parse(
      globSync(getPathName('components/index.ts', 'wds-engine')),
    ),
    ...lottieParser.parse(
      globSync(getPathName('components/index.ts', 'wds-lottie')),
    ),
  ];

  writeFileSync(
    join(process.cwd(), `../docs/src/data.json`),
    JSON.stringify({ result: output }),
    'utf-8',
  );
};

main();
