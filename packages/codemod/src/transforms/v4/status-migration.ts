import { findImportDeclaration, getLocalName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type {
  API,
  FileInfo,
  JSCodeshift,
  JSXAttribute,
  JSXOpeningElement,
  ObjectExpression,
  ObjectProperty,
  Options,
  Property,
} from 'jscodeshift';

/**
 * invalid / positive → status 개편 (v4.0.0)
 *
 * TextField                 invalid → status="negative", positive → status="positive"
 * TextArea / Select /
 * SelectMultiple / *Picker  invalid → status="negative"
 * Checkbox / Radio /
 * CheckMark / RoundCheckbox invalid → aria-invalid (prop 자체가 제거됨)
 * framedStyle({ invalid })  → framedStyle({ status: 'negative' })
 *
 * 값이 불리언 리터럴이 아니면(`invalid={hasError}`) 삼항식으로 접습니다.
 * `invalid={false}`처럼 정적으로 꺼져 있는 prop은 status가 기본값 'normal'이라
 * 그냥 지웁니다.
 *
 * spread(`{...props}`)나 컴포넌트 밖에서 조립된 props 객체는 정적으로 추적할 수
 * 없어 건드리지 않습니다 — 수동 확인이 필요합니다(manual step M16).
 */

/** invalid → status="negative" 만 적용되는 컴포넌트 */
const STATUS_COMPONENTS = [
  'TextArea',
  'Select',
  'SelectMultiple',
  'DatePicker',
  'DateRangePicker',
  'TimePicker',
];

/** invalid + positive 를 하나의 status로 접는 컴포넌트 */
const STATUS_WITH_POSITIVE_COMPONENTS = ['TextField'];

/** invalid prop이 사라지고 aria-invalid로 대체되는 컴포넌트 */
const ARIA_INVALID_COMPONENTS = [
  'Checkbox',
  'Radio',
  'CheckMark',
  'RoundCheckbox',
];

const findAttribute = (element: JSXOpeningElement, name: string) =>
  element.attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' && attribute.name.name === name,
  );

/**
 * `invalid`, `invalid={true}`, `invalid={false}`는 정적으로 읽고, 그 외
 * (식별자, 비교식, 논리식 등)는 'dynamic'으로 표시해 삼항식으로 접게 한다.
 */
const readBooleanAttribute = (
  attribute: JSXAttribute | undefined,
): boolean | 'dynamic' => {
  if (!attribute) return false;

  const value = attribute.value;

  // shorthand(`<TextField invalid />`)는 값이 없다.
  if (!value) return true;

  if (value.type === 'JSXExpressionContainer') {
    const expression = value.expression;

    if (
      (expression.type === 'Literal' || expression.type === 'BooleanLiteral') &&
      typeof expression.value === 'boolean'
    ) {
      return expression.value;
    }
  }

  return 'dynamic';
};

const getAttributeExpression = (attribute: JSXAttribute | undefined) => {
  const value = attribute?.value;

  if (
    value?.type === 'JSXExpressionContainer' &&
    value.expression.type !== 'JSXEmptyExpression'
  ) {
    return value.expression;
  }

  return undefined;
};

/**
 * invalid / positive 두 불리언을 status 값 하나로 접는다. `negative`가
 * `positive`보다 우선하는데, v3에서도 두 값이 함께 켜지면 invalid 쪽 테두리가
 * 이겼기 때문이다. 둘 다 정적으로 꺼져 있으면 undefined를 반환해 호출부가
 * attribute를 지우도록 한다.
 */
const buildStatusValue = (
  j: JSCodeshift,
  invalidAttribute: JSXAttribute | undefined,
  positiveAttribute: JSXAttribute | undefined,
) => {
  const invalid = readBooleanAttribute(invalidAttribute);
  const positive = readBooleanAttribute(positiveAttribute);

  if (invalid === true) return j.literal('negative');
  if (invalid === false && positive === true) return j.literal('positive');

  const invalidExpression =
    invalid === 'dynamic'
      ? getAttributeExpression(invalidAttribute)
      : undefined;
  const positiveExpression =
    positive === 'dynamic'
      ? getAttributeExpression(positiveAttribute)
      : undefined;

  if (!invalidExpression && !positiveExpression) return undefined;

  const fallback = positiveExpression
    ? j.conditionalExpression(
        positiveExpression,
        j.literal('positive'),
        j.literal('normal'),
      )
    : positive === true
      ? j.literal('positive')
      : j.literal('normal');

  if (!invalidExpression) {
    return j.jsxExpressionContainer(fallback);
  }

  return j.jsxExpressionContainer(
    j.conditionalExpression(invalidExpression, j.literal('negative'), fallback),
  );
};

const readBooleanNode = (node: ObjectProperty['value']) => {
  if (
    (node.type === 'Literal' || node.type === 'BooleanLiteral') &&
    typeof node.value === 'boolean'
  ) {
    return node.value;
  }

  return 'dynamic' as const;
};

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  const hasMontageImport = root
    .find(j.ImportDeclaration)
    .some((path) => MONTAGE_SOURCES.includes(path.node.source.value as string));

  if (!hasMontageImport) {
    return file.source;
  }

  const localNameOf = (name: string) => {
    const specifier = findImportDeclaration(name, MONTAGE_SOURCES, j, root);

    return specifier ? getLocalName(specifier).toString() : undefined;
  };

  const migrateStatusElement = (
    element: JSXOpeningElement,
    allowPositive: boolean,
  ) => {
    const attributes = element.attributes;

    if (!attributes) return;

    const invalidAttribute = findAttribute(element, 'invalid');
    const positiveAttribute = allowPositive
      ? findAttribute(element, 'positive')
      : undefined;

    if (!invalidAttribute && !positiveAttribute) return;

    // 이미 status가 있으면 손으로 옮기다 만 파일이다. 이름을 바꾸면 attribute가
    // 중복되므로 건드리지 않는다.
    if (findAttribute(element, 'status')) return;

    const index = attributes.findIndex(
      (attribute) =>
        attribute === invalidAttribute || attribute === positiveAttribute,
    );
    const value = buildStatusValue(j, invalidAttribute, positiveAttribute);
    const next = attributes.filter(
      (attribute) =>
        attribute !== invalidAttribute && attribute !== positiveAttribute,
    );

    if (value) {
      next.splice(
        index,
        0,
        j.jsxAttribute(
          j.jsxIdentifier('status'),
          value as JSXAttribute['value'],
        ),
      );
    }

    element.attributes = next;
    hasChanges = true;
  };

  const migrateAriaInvalidElement = (element: JSXOpeningElement) => {
    const invalidAttribute = findAttribute(element, 'invalid');

    if (!invalidAttribute) return;

    // aria-invalid를 이미 직접 넘기고 있으면 이름만 바꿔도 중복된다.
    // v4에서 invalid는 아무 일도 하지 않으므로 죽은 prop만 걷어낸다.
    if (findAttribute(element, 'aria-invalid')) {
      element.attributes = element.attributes?.filter(
        (attribute) => attribute !== invalidAttribute,
      );
      hasChanges = true;
      return;
    }

    invalidAttribute.name = j.jsxIdentifier('aria-invalid');
    hasChanges = true;
  };

  [...STATUS_COMPONENTS, ...STATUS_WITH_POSITIVE_COMPONENTS].forEach((name) => {
    const localName = localNameOf(name);

    if (!localName) return;

    root
      .find(j.JSXOpeningElement, { name: { name: localName } })
      .forEach((path) => {
        migrateStatusElement(
          path.value,
          STATUS_WITH_POSITIVE_COMPONENTS.includes(name),
        );
      });
  });

  ARIA_INVALID_COMPONENTS.forEach((name) => {
    const localName = localNameOf(name);

    if (!localName) return;

    root
      .find(j.JSXOpeningElement, { name: { name: localName } })
      .forEach((path) => {
        migrateAriaInvalidElement(path.value);
      });
  });

  const framedStyleLocalName = localNameOf('framedStyle');

  if (framedStyleLocalName) {
    root
      .find(j.CallExpression, { callee: { name: framedStyleLocalName } })
      .forEach((path) => {
        const [argument] = path.node.arguments;

        if (!argument || argument.type !== 'ObjectExpression') return;

        const properties = (argument as ObjectExpression).properties;

        const findProperty = (key: string) =>
          properties.find(
            (property): property is Property | ObjectProperty =>
              (property.type === 'Property' ||
                property.type === 'ObjectProperty') &&
              property.key.type === 'Identifier' &&
              property.key.name === key,
          );

        const invalidProperty = findProperty('invalid');

        if (!invalidProperty || findProperty('status')) return;

        const invalid = readBooleanNode(invalidProperty.value);

        if (invalid === false) {
          (argument as ObjectExpression).properties = properties.filter(
            (property) => property !== invalidProperty,
          );
          hasChanges = true;
          return;
        }

        invalidProperty.key = j.identifier('status');
        invalidProperty.shorthand = false;
        invalidProperty.value =
          invalid === true
            ? j.literal('negative')
            : j.conditionalExpression(
                invalidProperty.value as Parameters<
                  JSCodeshift['conditionalExpression']
                >[0],
                j.literal('negative'),
                j.literal('normal'),
              );

        hasChanges = true;
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
