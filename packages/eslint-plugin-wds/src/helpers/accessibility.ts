import { getLiteralPropValue, getProp, getPropValue } from 'jsx-ast-utils';

import type { JSXAttribute, JSXOpeningElement } from 'estree-jsx';

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

  const ariaHidden = getPropValue(
    getProp(attributes, 'aria-hidden') as JSXAttribute,
  );
  return ariaHidden === true;
};

export const isPresentationRole = (
  attributes: JSXOpeningElement['attributes'],
) => {
  const role = getProp(attributes, 'role');
  if (!role) return false;

  return ['presentation', 'none'].includes(getLiteralPropValue(role) as string);
};
