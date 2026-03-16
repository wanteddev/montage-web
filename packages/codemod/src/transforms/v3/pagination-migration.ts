import {
  findImportDeclaration,
  getImportedName,
  getLocalName,
} from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  const montageImport = root
    .find(j.ImportDeclaration)
    .filter((path) =>
      MONTAGE_SOURCES.includes(path.node.source.value as string),
    );

  if (montageImport.length < 1) {
    return file.source;
  }

  // pagination-counter -> page-counter
  const paginationCounterImport = findImportDeclaration(
    'PaginationCounter',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (paginationCounterImport) {
    hasChanges = true;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(paginationCounterImport) },
      })
      .forEach((target) => {
        const totalPageAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'totalPage',
        );

        if (totalPageAttribute) {
          totalPageAttribute.name.name = 'totalPages';
        }
      });

    root
      .find(j.Identifier, { name: getImportedName(paginationCounterImport) })
      .forEach((paginationCounter) => {
        paginationCounter.value.name = 'PageCounter';
      });
  }

  // pagination-dot -> pagination-dots
  const paginationDotImport = findImportDeclaration(
    'PaginationDot',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (paginationDotImport) {
    hasChanges = true;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(paginationDotImport) },
      })
      .forEach((target) => {
        const totalPageAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'totalPage',
        );

        if (totalPageAttribute) {
          totalPageAttribute.name.name = 'totalPages';
        }
      });

    root
      .find(j.Identifier, { name: getImportedName(paginationDotImport) })
      .forEach((paginationDot) => {
        paginationDot.value.name = 'PaginationDots';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
