import fs from 'fs';

import * as recast from 'recast';
import { glob } from 'glob';
import { parse } from '@babel/parser';

const parser = (code) => {
  return parse(code, {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    startLine: 1,
    tokens: true,
    plugins: [
      'asyncGenerators',
      'bigInt',
      'classPrivateMethods',
      'classPrivateProperties',
      'classProperties',
      'decorators-legacy',
      'doExpressions',
      'dynamicImport',
      'exportDefaultFrom',
      'exportExtensions',
      'exportNamespaceFrom',
      'functionBind',
      'functionSent',
      'importMeta',
      'nullishCoalescingOperator',
      'numericSeparator',
      'objectRestSpread',
      'optionalCatchBinding',
      'optionalChaining',
      ['pipelineOperator', { proposal: 'minimal' }],
      'throwExpressions',
      'typescript',
      'jsx',
    ],
  });
};

const main = async () => {
  const files = await glob('docs/src/**/*.tsx');

  const final = {};

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const ast = parser(content);
    const importedWdsComponents = [];

    recast.visit(ast, {
      visitImportDeclaration: (path) => {
        if (
          path.node.source.value === '@wanteddev/wds' ||
          path.node.source.value === '@wanteddev/wds-icon'
        ) {
          recast.visit(path.node, {
            visitImportSpecifier: (s) => {
              if (s.node.local.name) {
                importedWdsComponents.push(s.node.local.name.toString());
              }

              return false;
            },
          });
        }

        return false;
      },
    });

    if (importedWdsComponents.length === 0) {
      continue;
    }

    recast.visit(ast, {
      visitJSXOpeningElement: (e) => {
        if (
          e.node.name.type === 'JSXIdentifier' &&
          importedWdsComponents.includes(e.node.name.name)
        ) {
          final[e.node.name.name] = final[e.node.name.name]
            ? final[e.node.name.name] + 1
            : 1;
        }
        return false;
      },
    });
  }

  console.log(final);
};

main();
