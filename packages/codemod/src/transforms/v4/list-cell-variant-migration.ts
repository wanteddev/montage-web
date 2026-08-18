import { findImportDeclaration, getLocalName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXOpeningElement,
  ObjectProperty,
  Options,
  Property,
} from 'jscodeshift';

/**
 * ListCell 개편 (v4.0.0)
 *
 * 셀 계열(ListCell, AccordionSummary, AutocompleteOption)
 *
 *   fillWidth / fillWidth={true}  → variant="full"
 *   fillWidth={false}             → 제거 (inset이 기본값)
 *   fillWidth={expr}              → variant={expr ? 'full' : 'inset'}
 *   fillWidth="…"(문자열 리터럴)  → 런타임 truthy/falsy로 읽음
 *     (JSX 문자열은 boolean이 아니라 문자열 그대로 전달되므로 v3에서도
 *      truthy로 평가됐습니다. 빈 문자열만 falsy이며, `fillWidth="false"`는
 *      의미를 보존해 variant="full"로 옮기고 오타 가능성을 리포트합니다)
 *   interactionPadding            → 제거 + 리포트
 *     (인터랙션 영역이 12px 고정으로 바뀌어 커스텀 값은 시각 확인이 필요합니다)
 *   xs·sm·md·lg·xl 객체 안의 fillWidth/interactionPadding → 키 제거 + 리포트
 *     (variant는 반응형을 지원하지 않아 수동 대응이 필요합니다 — manual step)
 *
 * MenuItem, Option은 자체 variant('normal' | 'radio' | 'checkbox')가 ListCell의
 * variant를 덮어쓰므로 fillWidth를 variant로 옮길 수 없습니다. 정적으로 꺼진
 * fillWidth={false}만 지우고(v3에서도 no-op), 켜진 fillWidth는 건드리지 않고
 * 리포트합니다 — 대체가 없어 sx 재작성이 필요한 수동 결정입니다(manual step).
 * interactionPadding과 반응형 키 제거는 다른 셀과 동일하게 적용됩니다.
 *
 * 콘텐츠 계열(ListCellContent, OptionContent, MenuItemContent,
 * AutocompleteOptionContent, AccordionSummaryContent)
 *
 *   variant="badge"               → variant="content-badge"
 *   variant="button"              → variant="text-button"
 *     (v3의 button은 TextButton 스타일이었고, v4의 button은 일반 Button용으로
 *      이름이 재사용되어 그대로 두면 조용히 스타일이 깨집니다)
 *   variant="chevron"             → variant="value" chevron
 *     (v3 chevron variant는 value와 같은 타이포에 화살표가 기본 표시였고,
 *      v4에서 chevron은 모든 variant에 조합하는 옵션이 되며 기본값이 꺼짐)
 *     함께 있던 chevron={false}는 → variant="value" (chevron 제거)
 *   disabled                      → 제거 (셀의 disabled가 context로 전파됨)
 *
 * MenuActionAreaContent는 자체 variant 타입이라(badge/button 유지) 대상이
 * 아닙니다. variant가 문자열 리터럴이 아닌 경우(`variant={v}`)는 매핑할 수
 * 없어 건드리지 않습니다 — 수동 확인이 필요합니다(manual step).
 */

/** fillWidth → variant 변환까지 적용되는 셀 컴포넌트 */
const VARIANT_CELL_COMPONENTS = [
  'ListCell',
  'AccordionSummary',
  'AutocompleteOption',
];

/**
 * 자체 variant('normal' | 'radio' | 'checkbox')가 ListCell의 variant를 덮어쓰는
 * 셀 컴포넌트 — fillWidth를 variant로 옮기면 타입도 의미도 깨진다.
 */
const MENU_CELL_COMPONENTS = ['Option', 'MenuItem'];

const CONTENT_COMPONENTS = [
  'ListCellContent',
  'OptionContent',
  'MenuItemContent',
  'AutocompleteOptionContent',
  'AccordionSummaryContent',
];

const RESPONSIVE_PROPS = ['xs', 'sm', 'md', 'lg', 'xl'];
const REMOVED_RESPONSIVE_KEYS = ['fillWidth', 'interactionPadding'];

const findAttribute = (element: JSXOpeningElement, name: string) =>
  element.attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' && attribute.name.name === name,
  );

/**
 * `fillWidth`, `fillWidth={true}`, `fillWidth={false}`, `fillWidth="true"`는
 * 정적으로 읽고, 그 외(식별자, 비교식, 논리식 등)는 'dynamic'으로 표시해
 * 삼항식으로 접게 한다.
 *
 * 문자열 리터럴은 boolean이 아니라 문자열 그대로 prop에 전달되므로 v3
 * 런타임에서도 truthy/falsy로 평가됐다. 빈 문자열만 false로 읽어 그 의미를
 * 보존한다 — 'dynamic'으로 두면 호출부가 속성 이름만 바꾸고 값을 남겨
 * `variant="true"`처럼 v4 타입에 없는 값이 만들어진다.
 */
const readBooleanAttribute = (
  attribute: JSXAttribute | undefined,
): boolean | 'dynamic' => {
  if (!attribute) return false;

  const value = attribute.value;

  // shorthand(`<ListCell fillWidth />`)는 값이 없다.
  if (!value) return true;

  if (value.type === 'Literal' || value.type === 'StringLiteral') {
    return typeof value.value === 'string' ? value.value.length > 0 : 'dynamic';
  }

  if (value.type === 'JSXExpressionContainer') {
    const expression = value.expression;

    if (
      (expression.type === 'Literal' || expression.type === 'BooleanLiteral') &&
      typeof expression.value === 'boolean'
    ) {
      return expression.value;
    }

    if (
      (expression.type === 'Literal' || expression.type === 'StringLiteral') &&
      typeof expression.value === 'string'
    ) {
      return expression.value.length > 0;
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
 * `variant="badge"`와 `variant={'badge'}`를 모두 읽는다. 그 외(식별자, 템플릿
 * 리터럴, 삼항 등)는 undefined를 반환해 호출부가 손대지 않도록 한다.
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

const isPropertyNamed = (
  property: Property | ObjectProperty,
  names: Array<string>,
) => {
  const key = property.key;

  if (key.type === 'Identifier') {
    return names.includes(key.name);
  }

  if (key.type === 'Literal' || key.type === 'StringLiteral') {
    return names.includes(key.value?.toString() ?? '');
  }

  return false;
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

  /**
   * 값을 그 자리에서 고치지 않고 리터럴로 교체한다. `variant={'badge'}`를
   * 제자리에서 고치면 recast가 `variant={"content-badge"}`로 출력해 따옴표
   * 스타일이 뒤집히므로, JSX에서 관용적인 `variant="content-badge"` 형태로
   * 정규화한다.
   */
  const writeStringValue = (attribute: JSXAttribute, next: string) => {
    attribute.value = j.literal(next);
  };

  const removeAttribute = (
    element: JSXOpeningElement,
    attribute: JSXAttribute,
  ) => {
    element.attributes = element.attributes?.filter(
      (candidate) => candidate !== attribute,
    );
    hasChanges = true;
  };

  const migrateFillWidth = (element: JSXOpeningElement, name: string) => {
    const fillWidthAttribute = findAttribute(element, 'fillWidth');

    if (!fillWidthAttribute) return;

    // 이미 variant가 있으면 손으로 옮기다 만 파일이다. 이름을 바꾸면 attribute가
    // 중복되므로 건드리지 않는다.
    if (findAttribute(element, 'variant')) {
      api.report(
        `${file.path}: <${name}>에 fillWidth와 variant가 함께 있어 건너뜁니다 — 수동 확인이 필요합니다.`,
      );
      return;
    }

    const fillWidth = readBooleanAttribute(fillWidthAttribute);

    if (fillWidth === false) {
      // inset이 기본값이라 정적으로 꺼진 fillWidth는 그냥 지운다.
      removeAttribute(element, fillWidthAttribute);
      return;
    }

    // `fillWidth="false"`처럼 truthy로 읽히는 문자열은 v3 런타임 의미를 보존해
    // variant="full"로 옮기지만, 작성자 의도는 false였을 가능성이 높다.
    const literal = readStringValue(fillWidthAttribute);

    if (literal !== undefined && literal !== 'true') {
      api.report(
        `${file.path}: <${name} fillWidth="${literal}">를 variant="full"로 옮겼습니다 — JSX 문자열은 런타임에서 truthy라 v3 동작을 보존한 결과입니다. 의도가 false였다면 직접 제거하세요.`,
      );
    }

    fillWidthAttribute.name = j.jsxIdentifier('variant');

    if (fillWidth === true) {
      fillWidthAttribute.value = j.literal('full');
    } else {
      const expression = getAttributeExpression(fillWidthAttribute);

      if (!expression) return;

      fillWidthAttribute.value = j.jsxExpressionContainer(
        j.conditionalExpression(
          expression,
          j.literal('full'),
          j.literal('inset'),
        ),
      );
    }

    hasChanges = true;
  };

  const migrateMenuFillWidth = (element: JSXOpeningElement, name: string) => {
    const fillWidthAttribute = findAttribute(element, 'fillWidth');

    if (!fillWidthAttribute) return;

    const fillWidth = readBooleanAttribute(fillWidthAttribute);

    if (fillWidth === false) {
      // v3에서도 no-op이던 죽은 prop이라 그냥 지운다.
      removeAttribute(element, fillWidthAttribute);
      return;
    }

    // MenuItem/Option의 variant는 'normal' | 'radio' | 'checkbox'라 variant="full"로
    // 옮기면 타입도 의미도 깨진다. 대체 prop이 없어 sx 재작성이 필요한 수동
    // 결정이므로 건드리지 않고 리포트만 남긴다 — 수동 확인이 필요합니다(manual step).
    api.report(
      `${file.path}: <${name} fillWidth>는 변환하지 않았습니다 — MenuItem/Option은 variant가 'normal'|'radio'|'checkbox'라 대체 prop이 없어 sx로 수동 대응이 필요합니다.`,
    );
  };

  const migrateInteractionPadding = (
    element: JSXOpeningElement,
    name: string,
  ) => {
    const attribute = findAttribute(element, 'interactionPadding');

    if (!attribute) return;

    api.report(
      `${file.path}: <${name} interactionPadding>을 제거했습니다 — v4는 인터랙션 영역이 12px 고정이라 커스텀 값은 시각 확인이 필요합니다.`,
    );
    removeAttribute(element, attribute);
  };

  const migrateResponsiveProps = (element: JSXOpeningElement, name: string) => {
    RESPONSIVE_PROPS.forEach((responsiveProp) => {
      const attribute = findAttribute(element, responsiveProp);
      const value = attribute?.value;

      if (
        !attribute ||
        value?.type !== 'JSXExpressionContainer' ||
        value.expression.type !== 'ObjectExpression'
      ) {
        return;
      }

      const properties = value.expression.properties;
      const removed = properties.filter(
        (property) =>
          (property.type === 'Property' ||
            property.type === 'ObjectProperty') &&
          isPropertyNamed(property, REMOVED_RESPONSIVE_KEYS),
      );

      if (removed.length === 0) return;

      api.report(
        `${file.path}: <${name} ${responsiveProp}>의 fillWidth/interactionPadding을 제거했습니다 — variant는 반응형을 지원하지 않아 수동 대응이 필요합니다.`,
      );

      value.expression.properties = properties.filter(
        (property) => !removed.includes(property),
      );

      // 키를 걷어내고 빈 객체만 남으면 attribute 자체를 지운다.
      if (value.expression.properties.length === 0) {
        removeAttribute(element, attribute);
      } else {
        hasChanges = true;
      }
    });
  };

  const migrateContentVariant = (element: JSXOpeningElement) => {
    const variantAttribute = findAttribute(element, 'variant');
    const variant = readStringValue(variantAttribute);

    if (!variantAttribute || !variant) return;

    if (variant === 'badge') {
      writeStringValue(variantAttribute, 'content-badge');
      hasChanges = true;
      return;
    }

    if (variant === 'button') {
      writeStringValue(variantAttribute, 'text-button');
      hasChanges = true;
      return;
    }

    if (variant === 'chevron') {
      const chevronAttribute = findAttribute(element, 'chevron');
      const chevron = readBooleanAttribute(chevronAttribute);

      writeStringValue(variantAttribute, 'value');

      if (chevronAttribute && chevron === false) {
        // v4의 chevron 기본값이 꺼짐이라 정적으로 꺼진 prop은 그냥 지운다.
        removeAttribute(element, chevronAttribute);
      } else if (!chevronAttribute) {
        // v3 chevron variant는 화살표가 기본 표시였다. v4는 기본값이 꺼짐이므로
        // shorthand로 켜서 동작을 보존한다.
        const variantIndex =
          element.attributes?.indexOf(variantAttribute) ?? -1;

        element.attributes?.splice(
          variantIndex + 1,
          0,
          j.jsxAttribute(j.jsxIdentifier('chevron')),
        );
      }
      // chevron / chevron={true} / chevron={expr}는 그대로 두면 동작이 보존된다.

      hasChanges = true;
    }
  };

  const migrateContentDisabled = (element: JSXOpeningElement) => {
    const disabledAttribute = findAttribute(element, 'disabled');

    if (!disabledAttribute) return;

    // v4에서 콘텐츠 계열의 disabled prop이 제거됐다(셀의 disabled가 context로
    // 전파). v3에서도 렌더에 쓰이지 않던 죽은 prop이라 걷어내도 동작이 같다.
    removeAttribute(element, disabledAttribute);
  };

  VARIANT_CELL_COMPONENTS.forEach((name) => {
    const localName = localNameOf(name);

    if (!localName) return;

    root
      .find(j.JSXOpeningElement, { name: { name: localName } })
      .forEach((path) => {
        migrateFillWidth(path.value, localName);
        migrateInteractionPadding(path.value, localName);
        migrateResponsiveProps(path.value, localName);
      });
  });

  MENU_CELL_COMPONENTS.forEach((name) => {
    const localName = localNameOf(name);

    if (!localName) return;

    root
      .find(j.JSXOpeningElement, { name: { name: localName } })
      .forEach((path) => {
        migrateMenuFillWidth(path.value, localName);
        migrateInteractionPadding(path.value, localName);
        migrateResponsiveProps(path.value, localName);
      });
  });

  CONTENT_COMPONENTS.forEach((name) => {
    const localName = localNameOf(name);

    if (!localName) return;

    root
      .find(j.JSXOpeningElement, { name: { name: localName } })
      .forEach((path) => {
        migrateContentVariant(path.value);
        migrateContentDisabled(path.value);
      });
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
