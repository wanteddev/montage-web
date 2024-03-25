import path from 'path';

import { sync } from 'glob';
import { cache } from 'react';
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
            return !declaration.fileName.includes('node_modules');
          },
        );

        return Boolean(hasPropAdditionalDescription);
      }

      return true;
    },
  },
);

export const generatePropTypes = cache(() => {
  const getPathName = (pathname: string) =>
    path.join(process.cwd(), `../packages/wds/src/${pathname}`);

  const paths = sync(getPathName('components/index.ts'));

  return [
    ...paths.map((file) => parser.parse(file)).flat(1),
    ...parser.parse(sync(getPathName('components/button/index.tsx'))),
  ];
});
