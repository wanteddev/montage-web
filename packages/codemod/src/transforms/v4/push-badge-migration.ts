import { findImportDeclaration, getLocalName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXOpeningElement,
  Options,
} from 'jscodeshift';

/**
 * PushBadge variant/count 개편 (v4.0.0)
 *
 * variant="number"  → variant="text"
 * variant="new"     → variant="text" text="N"
 * count             → text
 *
 * `variant="new"`은 v3에서 `count`를 무시하고 항상 'N'을 렌더했으므로, 함께 지정된
 * `count`는 제거합니다(죽은 prop이라 삭제해야 동작이 보존됩니다).
 *
 * `variant`가 문자열 리터럴이 아닌 경우(`variant={v}`)는 매핑할 수 없어 건드리지
 * 않습니다. `count`만 `text`로 바뀌므로 수동 확인이 필요합니다(manual step M13).
 */

const findAttribute = (element: JSXOpeningElement, name: string) =>
  element.attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' && attribute.name.name === name,
  );

/**
 * `variant="new"`와 `variant={'new'}`를 모두 읽는다. 그 외(식별자, 템플릿 리터럴,
 * 삼항 등)는 undefined를 반환해 호출부가 손대지 않도록 한다.
 */
const readStringValue = (attribute: JSXAttribute | undefined) => {
  const value = attribute?.value;

  if (!value) return undefined;

  if (value.type === 'Literal' || value.type === 'StringLiteral') {
    return typeof value.value === 'string' ? value.value : undefined;
  }

  if (
    value.type === 'JSXExpressionContainer' &&
    (value.expression.type === 'Literal' ||
      value.expression.type === 'StringLiteral') &&
    typeof value.expression.value === 'string'
  ) {
    return value.expression.value;
  }

  return undefined;
};

/**
 * 값을 그 자리에서 고치지 않고 리터럴로 교체한다. `variant={'new'}`를 제자리에서
 * 고치면 recast가 `variant={"text"}`로 출력해 따옴표 스타일이 뒤집히므로, JSX에서
 * 관용적인 `variant="text"` 형태로 정규화한다.
 */
const writeStringValue = (
  j: ReturnType<API['jscodeshift']['withParser']>,
  attribute: JSXAttribute,
  next: string,
) => {
  attribute.value = j.literal(next);
};

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const pushBadgeImport = findImportDeclaration(
    'PushBadge',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (!pushBadgeImport) {
    return file.source;
  }

  root
    .find(j.JSXOpeningElement, {
      name: { name: getLocalName(pushBadgeImport) },
    })
    .forEach((path) => {
      const element = path.value;
      const variantAttribute = findAttribute(element, 'variant');
      const countAttribute = findAttribute(element, 'count');
      const textAttribute = findAttribute(element, 'text');
      const variant = readStringValue(variantAttribute);

      if (variantAttribute && (variant === 'new' || variant === 'number')) {
        writeStringValue(j, variantAttribute, 'text');
        hasChanges = true;

        if (variant === 'new') {
          // v3의 `new`는 `count`를 렌더하지 않았다. 남겨두면 `text`로 이름만 바뀌어
          // 숫자가 노출되므로, 'N'을 넣고 죽은 prop을 걷어낸다.
          if (countAttribute) {
            element.attributes = element.attributes?.filter(
              (attribute) => attribute !== countAttribute,
            );
          }

          if (!textAttribute) {
            const variantIndex =
              element.attributes?.indexOf(variantAttribute) ?? -1;

            element.attributes?.splice(
              variantIndex + 1,
              0,
              j.jsxAttribute(j.jsxIdentifier('text'), j.literal('N')),
            );
          }

          return;
        }
      }

      // 이미 `text`가 있으면 손대지 않는다 — 손으로 옮기다 만 파일이고, 이름을
      // 바꾸면 attribute가 중복된다.
      if (countAttribute && !textAttribute) {
        countAttribute.name.name = 'text';
        hasChanges = true;
      }
    });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
