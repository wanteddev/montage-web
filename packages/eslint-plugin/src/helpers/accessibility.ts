import { getLiteralPropValue, getProp, getPropValue } from 'jsx-ast-utils';

import type { JSXOpeningElement } from 'estree-jsx';

export const isHidden = (
  type: string,
  attributes: JSXOpeningElement['attributes'],
) => {
  if (type.toUpperCase() === 'INPUT') {
    const inputTypeProp = getProp(attributes, 'type');

    if (inputTypeProp && getLiteralPropValue(inputTypeProp) === 'hidden') {
      return true;
    }
  }

  const hiddenAttr = getProp(attributes, 'hidden');

  if (!hiddenAttr) {
    return false;
  }

  return (
    getPropValue(hiddenAttr) === true || getPropValue(hiddenAttr) === 'true'
  );
};

export const isPresentationRole = (
  attributes: JSXOpeningElement['attributes'],
) => {
  const role = getProp(attributes, 'role');
  if (!role) return false;

  return ['presentation', 'none'].includes(getLiteralPropValue(role) as string);
};
