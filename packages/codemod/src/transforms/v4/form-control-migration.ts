import { findImportDeclaration, getImportedName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type { API, FileInfo, Identifier, Options } from 'jscodeshift';

/**
 * FormField/FormControl 계열 이름 변경 (v4.0.0)
 *
 * FormControl      → FormControlField  (내부 필드 래퍼)
 * FormField        → FormControl       (외부 루트 래퍼)
 * FormLabel        → FormControlLabel
 * FormMessage      → FormControlMessage
 * FormErrorMessage → FormControlNegativeMessage
 *
 * Props 타입도 동일 규칙으로 교체됩니다.
 */

/**
 * FormControl ↔ FormField 스왑처럼 서로 다른 두 이름을 맞교환할 때,
 * 한쪽을 먼저 바꾸면 나머지 검색에서 오탐이 발생한다.
 * → AST 노드 참조를 먼저 수집한 뒤 일괄 교체한다.
 */
const renameSwapPair = (
  j: ReturnType<API['jscodeshift']['withParser']>,
  root: ReturnType<typeof j>,
  nameA: string,
  newNameA: string,
  nameB: string,
  newNameB: string,
) => {
  const specifierA = findImportDeclaration(nameA, MONTAGE_SOURCES, j, root);
  const specifierB = findImportDeclaration(nameB, MONTAGE_SOURCES, j, root);

  if (!specifierA && !specifierB) return false;

  const nodesA: Array<Identifier> = [];
  const nodesB: Array<Identifier> = [];

  if (specifierA) {
    root
      .find(j.Identifier, { name: getImportedName(specifierA).toString() })
      .forEach((path) => nodesA.push(path.node));
  }

  if (specifierB) {
    root
      .find(j.Identifier, { name: getImportedName(specifierB).toString() })
      .forEach((path) => nodesB.push(path.node));
  }

  // 수집 완료 후 일괄 교체 (순서 무관)
  nodesA.forEach((node) => {
    node.name = newNameA;
  });
  nodesB.forEach((node) => {
    node.name = newNameB;
  });

  return true;
};

/** 단순 1:1 교체 */
const renameSimple = (
  j: ReturnType<API['jscodeshift']['withParser']>,
  root: ReturnType<typeof j>,
  oldName: string,
  newName: string,
) => {
  const specifier = findImportDeclaration(oldName, MONTAGE_SOURCES, j, root);

  if (!specifier) return false;

  root
    .find(j.Identifier, { name: getImportedName(specifier).toString() })
    .forEach((path) => {
      path.node.name = newName;
    });

  return true;
};

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

  // ─── 1. 스왑 쌍: FormControl ↔ FormField ──────────────────────────────────
  // AST 노드를 먼저 모두 수집한 뒤 일괄 교체하므로 순서 충돌 없음.
  if (
    renameSwapPair(
      j,
      root,
      'FormControl',
      'FormControlField',
      'FormField',
      'FormControl',
    )
  ) {
    hasChanges = true;
  }

  // Props 타입 스왑
  if (
    renameSwapPair(
      j,
      root,
      'FormControlProps',
      'FormControlFieldProps',
      'FormFieldProps',
      'FormControlProps',
    )
  ) {
    hasChanges = true;
  }

  // ─── 2. 단순 1:1 교체 ────────────────────────────────────────────────────
  const simpleRenames: Array<[string, string]> = [
    ['FormLabel', 'FormControlLabel'],
    ['FormErrorMessage', 'FormControlNegativeMessage'],
    ['FormMessage', 'FormControlMessage'],
    ['FormLabelProps', 'FormControlLabelProps'],
    ['FormErrorMessageProps', 'FormControlNegativeMessageProps'],
    ['FormMessageProps', 'FormControlMessageProps'],
  ];

  for (const [oldName, newName] of simpleRenames) {
    if (renameSimple(j, root, oldName, newName)) {
      hasChanges = true;
    }
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
