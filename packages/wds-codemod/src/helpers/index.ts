import type {
  Collection,
  ConditionalExpression,
  ImportSpecifier,
  JSCodeshift,
  JSXAttribute,
  JSXExpressionContainer,
  Literal,
  ObjectExpression,
  ObjectProperty,
  Property,
  StringLiteral,
} from 'jscodeshift';

export const findImportDeclaration = (
  name: string,
  from: string,
  j: JSCodeshift,
  root: Collection<any>,
) => {
  let result: ImportSpecifier | undefined;

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
    | undefined,
  name: string,
  convert: (v: string) => string,
): any => {
  if (!property) {
    return;
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
    (property.type === 'Property' || property.type === 'ObjectProperty') &&
    ((property.key.type === 'Identifier' &&
      (property.key.name === name ||
        ['xs', 'sm', 'md', 'lg', 'xl'].includes(
          property.key.name.toString(),
        ))) ||
      (property.key.type === 'Literal' &&
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
