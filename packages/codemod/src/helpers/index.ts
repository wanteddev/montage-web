import type {
  Collection,
  ConditionalExpression,
  ImportSpecifier,
  JSCodeshift,
  JSXAttribute,
  JSXExpressionContainer,
  JSXSpreadAttribute,
  Literal,
  ObjectExpression,
  ObjectProperty,
  Property,
  SpreadElement,
  StringLiteral,
} from 'jscodeshift';

type ParenthesizedExtra = { extra?: { parenthesized?: boolean } | null };

/**
 * `root.toSource()` 대신 사용한다. recast는 ReturnStatement 안에서 무엇이든
 * 바뀌면 return 문 전체를 다시 출력하는데, 이때 `return (` 괄호로 감싼 JSX
 * 인자의 `extra.parenthesized`를 잠시 꺼서 다시 출력한다. 플래그가 원본과
 * 달라지면 JSX를 원본 그대로 재사용하지 못하고 일반 printer로 출력하고, 이
 * printer는 JSXText 앞 줄바꿈을 지운다(`onClick={x}>삭제` + 다음 줄 들여쓰기
 * 깨짐). 이렇게 망가진 서식은 이후 eslint --fix(prettier/prettier +
 * react/jsx-indent)에서 텍스트가 통째로 사라지는 원인이 된다.
 *
 * 출력 전에 사본과 원본(`.original`) 모두에서 플래그를 지우면 JSX는 원본
 * 소스를 그대로 패치하고, 괄호는 ReturnStatement printer가 다시 둘러준다.
 */
export const toSourcePreservingJsx = (
  j: JSCodeshift,
  root: Collection<any>,
  options?: Parameters<Collection<any>['toSource']>[0],
) => {
  root.find(j.ReturnStatement).forEach((path) => {
    const argument = path.node.argument as
      | (ParenthesizedExtra & { original?: ParenthesizedExtra })
      | null
      | undefined;

    if (
      !argument ||
      !(j.JSXElement.check(argument) || j.JSXFragment.check(argument))
    ) {
      return;
    }

    delete argument.extra?.parenthesized;
    delete argument.original?.extra?.parenthesized;
  });

  return root.toSource(options);
};

export const getLocalName = (importSpecifier: ImportSpecifier) => {
  if (importSpecifier.local) {
    return importSpecifier.local.name;
  }

  return importSpecifier.imported.name;
};

export const getImportedName = (importSpecifier: ImportSpecifier) => {
  return importSpecifier.imported.name;
};

export const findImportDeclaration = (
  name: string,
  from: Array<string> | string,
  j: JSCodeshift,
  root: Collection<any>,
) => {
  let result: ImportSpecifier | undefined;

  if (Array.isArray(from)) {
    from.forEach((f) => {
      if (result) {
        return;
      }

      root
        .find(j.ImportDeclaration, {
          source: { value: f },
        })
        .forEach((importDeclaration) => {
          importDeclaration.node.specifiers?.forEach((specifier) => {
            if (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === name
            ) {
              result = specifier;
              return;
            }
          });
        });
    });
  } else {
    root
      .find(j.ImportDeclaration, {
        source: { value: from },
      })
      .forEach((importDeclaration) => {
        importDeclaration.node.specifiers?.forEach((specifier) => {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.name === name
          ) {
            result = specifier;
            return;
          }
        });
      });
  }

  return result;
};

export const deepConvertPropertyValue = (
  property:
    | Property
    | Literal
    | JSXExpressionContainer
    | ObjectExpression
    | ConditionalExpression
    | JSXAttribute
    | ObjectProperty
    | StringLiteral
    | JSXSpreadAttribute
    | SpreadElement
    | undefined,
  name: string,
  convert: (v: string) => string,
): any => {
  if (!property) {
    return;
  }

  if (
    (property.type === 'JSXSpreadAttribute' ||
      property.type === 'SpreadElement') &&
    property.argument.type === 'LogicalExpression'
  ) {
    return deepConvertPropertyValue(
      property.argument.right as ObjectExpression,
      name,
      convert,
    );
  }

  if (
    (property.type === 'JSXSpreadAttribute' ||
      property.type === 'SpreadElement') &&
    property.argument.type === 'ConditionalExpression'
  ) {
    if (property.argument.consequent.type === 'ObjectExpression') {
      property.argument.consequent.properties.forEach((v) =>
        // @ts-expect-error
        deepConvertPropertyValue(v, name, convert),
      );
    }

    if (property.argument.alternate.type === 'ObjectExpression') {
      property.argument.alternate.properties.forEach((v) =>
        // @ts-expect-error
        deepConvertPropertyValue(v, name, convert),
      );
    }

    if (
      (property.argument.consequent.type === 'Literal' ||
        property.argument.consequent.type === 'StringLiteral') &&
      property.argument.consequent.value?.toString()
    ) {
      property.argument.consequent.value = convert(
        property.argument.consequent.value.toString(),
      );
    }

    if (
      (property.argument.alternate.type === 'Literal' ||
        property.argument.alternate.type === 'StringLiteral') &&
      property.argument.alternate.value?.toString()
    ) {
      property.argument.alternate.value = convert(
        property.argument.alternate.value.toString(),
      );
    }

    return property;
  }

  if (
    property.type === 'JSXAttribute' &&
    (property.name.name === name ||
      ['xs', 'sm', 'md', 'lg', 'xl'].includes(property.name.name.toString()))
  ) {
    // @ts-expect-error
    return deepConvertPropertyValue(property.value, name, convert);
  }

  if (property.type === 'Literal' || property.type === 'StringLiteral') {
    property.value = convert(property.value?.toString() ?? '');
    return property;
  }

  if (property.type === 'ConditionalExpression') {
    if (
      (property.consequent.type === 'Literal' ||
        property.consequent.type === 'StringLiteral') &&
      property.consequent.value?.toString()
    ) {
      property.consequent.value = convert(property.consequent.value.toString());
    }

    if (
      (property.alternate.type === 'Literal' ||
        property.alternate.type === 'StringLiteral') &&
      property.alternate.value?.toString()
    ) {
      property.alternate.value = convert(property.alternate.value.toString());
    }

    return property;
  }

  if (
    property.type === 'JSXExpressionContainer' &&
    property.expression.type === 'ObjectExpression'
  ) {
    return property.expression.properties.forEach((v) =>
      deepConvertPropertyValue(v as Property, name, convert),
    );
  }

  if (
    property.type === 'JSXExpressionContainer' &&
    (property.expression.type === 'Literal' ||
      property.expression.type === 'StringLiteral')
  ) {
    return deepConvertPropertyValue(property.expression, name, convert);
  }

  if (
    property.type === 'JSXExpressionContainer' &&
    property.expression.type === 'LogicalExpression'
  ) {
    if (
      property.expression.right.type === 'Literal' ||
      property.expression.right.type === 'StringLiteral'
    ) {
      deepConvertPropertyValue(property.expression.right, name, convert);
    }

    if (
      property.expression.left.type === 'Literal' ||
      property.expression.left.type === 'StringLiteral'
    ) {
      deepConvertPropertyValue(property.expression.left, name, convert);
    }

    return property;
  }

  if (
    (property.type === 'Property' || property.type === 'ObjectProperty') &&
    ((property.key.type === 'Identifier' &&
      (property.key.name === name ||
        ['xs', 'sm', 'md', 'lg', 'xl'].includes(
          property.key.name.toString(),
        ))) ||
      ((property.key.type === 'Literal' ||
        property.key.type === 'StringLiteral') &&
        (property.key.value === name ||
          ['xs', 'sm', 'md', 'lg', 'xl'].includes(
            property.key.value?.toString() ?? '',
          ))))
  ) {
    // @ts-expect-error
    return deepConvertPropertyValue(property.value, name, convert);
  }

  if (property.type === 'ObjectExpression') {
    return property.properties.forEach((v) =>
      deepConvertPropertyValue(v as Property, name, convert),
    );
  }

  if (
    property.type === 'JSXExpressionContainer' &&
    property.expression.type === 'ConditionalExpression'
  ) {
    if (property.expression.consequent.type === 'ObjectExpression') {
      property.expression.consequent.properties.forEach((v) =>
        // @ts-expect-error
        deepConvertPropertyValue(v, name, convert),
      );
    }

    if (property.expression.alternate.type === 'ObjectExpression') {
      property.expression.alternate.properties.forEach((v) =>
        // @ts-expect-error
        deepConvertPropertyValue(v, name, convert),
      );
    }

    if (
      (property.expression.consequent.type === 'Literal' ||
        property.expression.consequent.type === 'StringLiteral') &&
      property.expression.consequent.value?.toString()
    ) {
      property.expression.consequent.value = convert(
        property.expression.consequent.value.toString(),
      );
    }

    if (
      (property.expression.alternate.type === 'Literal' ||
        property.expression.alternate.type === 'StringLiteral') &&
      property.expression.alternate.value?.toString()
    ) {
      property.expression.alternate.value = convert(
        property.expression.alternate.value.toString(),
      );
    }

    return property;
  }
};
