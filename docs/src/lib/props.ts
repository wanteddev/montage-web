import path from 'path';

import { cache } from 'react';
import { withCustomConfig } from 'react-docgen-typescript';

export const generatePropTypes = cache(() =>
  withCustomConfig(path.join(process.cwd(), '../packages/wds/tsconfig.json'), {
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
  }).parse(path.join(process.cwd(), '../packages/wds/src/index.ts')),
);
