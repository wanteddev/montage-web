import {
  findImportDeclaration,
  getImportedName,
  getLocalName,
} from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type {
  API,
  ASTPath,
  FileInfo,
  JSXIdentifier,
  Options,
} from 'jscodeshift';

/** CardList / CardListSkeleton 트리 내부에서 사용된 경우의 교체 이름 */
const LIST_CONTEXT_RENAMES: Record<string, string> = {
  CardThumbnail: 'ListCardThumbnail',
  CardThumbnailContent: 'ListCardThumbnailContent',
  CardThumbnailSkeleton: 'ListCardThumbnailSkeleton',
  CardContent: 'ListCardBody',
  CardContentItem: 'ListCardRow',
  CardContentItemSkeleton: 'ListCardRowSkeleton',
  CardTitle: 'ListCardTitle',
  CardCaption: 'ListCardCaption',
  CardTitleSkeleton: 'ListCardTitleSkeleton',
  CardCaptionSkeleton: 'ListCardCaptionSkeleton',
};

/** Card 트리 내부(또는 컨텍스트 불명)에서 사용된 경우의 교체 이름 */
const CARD_CONTEXT_RENAMES: Record<string, string> = {
  CardContent: 'CardBody',
  CardContentItem: 'CardRow',
  CardContentItemSkeleton: 'CardRowSkeleton',
};

/** 사용 위치와 무관하게 일괄 교체되는 이름 (컴포넌트 + 타입) */
const GLOBAL_RENAMES: Record<string, string> = {
  CardList: 'ListCard',
  CardListContent: 'ListCardContent',
  CardListSkeleton: 'ListCardSkeleton',
  CardListProps: 'ListCardProps',
  CardListContentProps: 'ListCardContentProps',
  CardListSkeletonProps: 'ListCardSkeletonProps',
  CardContentProps: 'CardBodyProps',
  CardContentItemProps: 'CardRowProps',
  CardContentItemSkeletonProps: 'CardRowSkeletonProps',
};

const LIST_ROOTS = ['CardList', 'CardListSkeleton'];
const CARD_ROOTS = ['Card', 'CardSkeleton'];

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  const montageImports = root
    .find(j.ImportDeclaration)
    .filter((path) =>
      MONTAGE_SOURCES.includes(path.node.source.value as string),
    );

  if (montageImports.length < 1) {
    return file.source;
  }

  const collectLocalNames = (names: Array<string>) => {
    const result = new Set<string>();

    names.forEach((name) => {
      const specifier = findImportDeclaration(name, MONTAGE_SOURCES, j, root);

      if (specifier) {
        result.add(getLocalName(specifier).toString());
      }
    });

    return result;
  };

  const listRootLocalNames = collectLocalNames(LIST_ROOTS);
  const cardRootLocalNames = collectLocalNames(CARD_ROOTS);

  /**
   * 가장 가까운 CardList(Skeleton)/Card(Skeleton) 조상을 찾아 컨텍스트를
   * 판별한다. leadingContent / trailingContent prop으로 전달된 JSX도 조상
   * 체인에 CardList의 JSXElement가 있으므로 함께 list 컨텍스트로 처리된다.
   */
  const isInsideListRoot = (path: ASTPath<JSXIdentifier>) => {
    let current = path.parent;

    while (current) {
      const node = current.node;

      if (
        node.type === 'JSXElement' &&
        node.openingElement.name.type === 'JSXIdentifier'
      ) {
        if (listRootLocalNames.has(node.openingElement.name.name)) {
          return true;
        }

        if (cardRootLocalNames.has(node.openingElement.name.name)) {
          return false;
        }
      }

      current = current.parent;
    }

    return false;
  };

  // 1. 컨텍스트 민감 교체:
  //    CardList 트리 내부에서 사용된 Card 하위 컴포넌트는 ListCard*로,
  //    그 외에서 사용된 것은 Card 계열 새 이름(CardContent → CardBody 등)으로 교체한다.
  for (const [name, listName] of Object.entries(LIST_CONTEXT_RENAMES)) {
    const specifier = findImportDeclaration(name, MONTAGE_SOURCES, j, root);

    if (!specifier) {
      continue;
    }

    const localName = getLocalName(specifier).toString();
    const cardName = CARD_CONTEXT_RENAMES[name] ?? name;
    const isAliased = localName !== getImportedName(specifier).toString();

    const listPaths: Array<ASTPath<JSXIdentifier>> = [];
    const cardPaths: Array<ASTPath<JSXIdentifier>> = [];

    root
      .find(j.JSXIdentifier, { name: localName })
      .filter(
        (path) =>
          path.parent.node.type === 'JSXOpeningElement' ||
          path.parent.node.type === 'JSXClosingElement',
      )
      .forEach((path) => {
        if (isInsideListRoot(path)) {
          listPaths.push(path);
        } else {
          cardPaths.push(path);
        }
      });

    const usedInList = listPaths.length > 0;
    const usedInCard = cardPaths.length > 0;

    if (!usedInList && cardName === name) {
      continue;
    }

    hasChanges = true;

    if (isAliased) {
      if (usedInList && usedInCard) {
        // alias는 card 컨텍스트 이름을 유지하고, list 컨텍스트 사용처만
        // 새 이름의 별도 import로 분리한다.
        specifier.imported.name = cardName;
        listPaths.forEach((path) => {
          path.node.name = listName;
        });

        montageImports.forEach((declaration) => {
          if (declaration.node.specifiers?.includes(specifier)) {
            declaration.node.specifiers.push(
              j.importSpecifier(j.identifier(listName)),
            );
          }
        });
      } else {
        // 단일 컨텍스트면 사용처(alias)는 그대로 두고 imported 이름만 바꾼다.
        specifier.imported.name = usedInList ? listName : cardName;
      }

      continue;
    }

    listPaths.forEach((path) => {
      path.node.name = listName;
    });
    cardPaths.forEach((path) => {
      path.node.name = cardName;
    });

    // JSX 외 일반 식별자 참조(예: component={CardContent})는
    // 컨텍스트를 판별할 수 없으므로 card 컨텍스트 이름으로 교체한다.
    root
      .find(j.Identifier, { name: localName })
      .filter((path) => (path.node.type as string) !== 'JSXIdentifier')
      .forEach((path) => {
        path.node.name = cardName;
      });

    montageImports.forEach((declaration) => {
      const specifiers = declaration.node.specifiers;
      const index = specifiers?.indexOf(specifier) ?? -1;

      if (!specifiers || index === -1) {
        return;
      }

      const replacements: Array<string> = [];

      if (usedInList) {
        replacements.push(listName);
      }

      if (usedInCard || !usedInList) {
        replacements.push(cardName);
      }

      specifiers.splice(
        index,
        1,
        ...replacements.map((replacement) =>
          j.importSpecifier(j.identifier(replacement)),
        ),
      );
    });
  }

  // 2. 전역 교체: CardList 계열 컴포넌트와 Props 타입은 사용 위치와 무관하게 교체한다.
  for (const [name, newName] of Object.entries(GLOBAL_RENAMES)) {
    const specifier = findImportDeclaration(name, MONTAGE_SOURCES, j, root);

    if (!specifier) {
      continue;
    }

    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(specifier).toString() })
      .forEach((path) => {
        path.node.name = newName;
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
