import {
  findImportDeclaration,
  getImportedName,
  getLocalName,
} from '../../helpers';

import type {
  API,
  ASTPath,
  FileInfo,
  JSXOpeningElement,
  Literal,
  Options,
  Property,
} from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 1) {
    return file.source;
  }

  // list-item -> list-cell
  const listItemImport = findImportDeclaration(
    'ListItem',
    '@wanteddev/wds',
    j,
    root,
  );
  const listCellImport = findImportDeclaration(
    'ListCell',
    '@wanteddev/wds',
    j,
    root,
  );

  if (listItemImport) {
    hasChanges = true;

    let listCellName: string;

    if (!listCellImport) {
      root
        .find(j.Identifier, { name: getImportedName(listItemImport) })
        .forEach((cell) => {
          cell.value.name = 'ListCell';
        });
      listItemImport.imported = j.identifier('ListCell');
      listCellName = 'ListCell';
    } else {
      j(listItemImport)
        .find(j.ImportSpecifier, {
          imported: {
            name: listItemImport.imported.name,
          },
        })
        .remove();
      listCellName = getLocalName(listCellImport);
    }

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(listItemImport) },
      })
      .forEach((listItem) => {
        if (listItem.value.name.type === 'JSXIdentifier') {
          listItem.value.name.name = listCellName;
        }

        // listCell로 변경 후 disableInteraction prop 추가
        listItem.value.attributes?.push(
          j.jsxAttribute(j.jsxIdentifier('disableInteraction')),
        );
        listItem.value.attributes?.push(
          j.jsxAttribute(j.jsxIdentifier('padding'), j.literal('0px')),
        );
      });
  }

  // list-item-content -> list-cell-content
  const listItemContentImport = findImportDeclaration(
    'ListItemContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (listItemContentImport) {
    root
      .find(j.Identifier, { name: getImportedName(listItemContentImport) })
      .forEach((alert) => {
        alert.value.name = 'ListCellContent';
      });
    listItemContentImport.imported = j.identifier('ListCellContent');
    hasChanges = true;
  }

  // list-text -> MenuItem, ListItem, ListCell과 통합
  const listTextImport = findImportDeclaration(
    'ListText',
    '@wanteddev/wds',
    j,
    root,
  );

  if (listTextImport) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: getLocalName(listTextImport) } },
      })
      .forEach((listItem) => {
        const attributes = listItem.value.openingElement.attributes;

        if (attributes?.length) {
          j(listItem.parentPath.parentPath.value.openingElement).forEach(
            (parent: ASTPath<JSXOpeningElement>) => {
              if (
                parent.value.name.type === 'JSXIdentifier' &&
                (parent.value.name.name === 'MenuItem' ||
                  parent.value.name.name === 'ListItem' ||
                  parent.value.name.name === 'ListCell')
              ) {
                // j(listItem).remove();

                parent.value.attributes?.push(
                  j.jsxAttribute(
                    j.jsxIdentifier('textProps'),
                    j.jsxExpressionContainer(
                      j.objectExpression(
                        attributes
                          .map((v) =>
                            v.type === 'JSXAttribute'
                              ? j.property(
                                  'init',
                                  j.identifier(v.name.name.toString()),
                                  v.value!.type === 'JSXExpressionContainer'
                                    ? (v.value.expression as Literal)
                                    : v.value!,
                                )
                              : j.spreadElement(v.argument),
                          )
                          .filter<Property>(Boolean as any),
                      ),
                    ),
                  ),
                );
              }
            },
          );
        }

        listItem.value.children?.map((child) =>
          listItem.parentPath.parentPath.value.children.push(child),
        );

        listItem.replace();
      });

    root
      .find(j.ImportSpecifier, {
        imported: {
          name: getImportedName(listTextImport),
        },
      })
      .remove();

    hasChanges = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
