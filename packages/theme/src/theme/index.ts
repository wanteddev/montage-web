import { addHexOpacity } from '../utils';

import breakpoint from './breakpoint';
import dimension from './dimension';
import opacity from './opacity';
import primitive from './primitive';
import radius from './radius';
import spacing from './spacing';
import zIndex from './z-index';
import atomic from './atomic';
import * as semantic from './semantic';

/**
 * Theme without css variable
 */
export const lightOriginTheme = {
  atomic,
  semantic: {
    ...semantic.light,
    platform: {
      ios: {
        navigation: `
          background-color: ${addHexOpacity(semantic.light.surface.elevated.primary, opacity[88])};
          backdrop-filter: blur(32px);
      `,
      },
    },
  },
  opacity,
  breakpoint,
  primitive,
  spacing,
  radius,
  dimension,
  zIndex,
};

/**
 * Theme without css variable
 */
export const darkOriginTheme = {
  atomic,
  semantic: {
    ...semantic.dark,
    platform: {
      ios: {
        navigation: `
          background-color: ${addHexOpacity(semantic.dark.surface.elevated.primary, opacity[88])};
          backdrop-filter: blur(32px);
      `,
      },
    },
  },
  opacity,
  breakpoint,
  primitive,
  spacing,
  radius,
  dimension,
  zIndex,
};

const toCssVarSegment = (key: string) => key.replace(/\./g, '_');

const addVarPrefix = (obj: any, prefix: string, convertAll = false) => {
  const newObj: any = {};

  for (const key in obj) {
    const originPrefix = `${prefix}-${toCssVarSegment(key)}`;

    if (typeof obj[key] === 'object') {
      newObj[key] = addVarPrefix(obj[key], originPrefix, convertAll as true);
    } else if (
      convertAll ||
      (typeof obj[key] === 'string' &&
        (obj[key].startsWith('#') || prefix.includes('shadow')))
    ) {
      newObj[key] = `var(--${originPrefix})`;
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const primitiveVar = addVarPrefix(
  primitive,
  'primitive',
  true,
) as typeof primitive;
const opacityVar = addVarPrefix(opacity, 'opacity', true) as typeof opacity;
const spacingVar = addVarPrefix(spacing, 'spacing', true) as typeof spacing;
const radiusVar = addVarPrefix(radius, 'radius', true) as typeof radius;
const dimensionVar = addVarPrefix(
  dimension,
  'dimension',
  true,
) as typeof dimension;
const zIndexVar = addVarPrefix(zIndex, 'zIndex', true) as typeof zIndex;

export const lightTheme = {
  ...lightOriginTheme,
  atomic: addVarPrefix(atomic, 'atomic') as typeof atomic,
  semantic: {
    ...(addVarPrefix(semantic.light, 'semantic') as typeof semantic.light),
    platform: {
      ios: {
        navigation: `
          background-color: rgba(var(--semantic-surface-elevated-primary-rgb), 0.88);
          backdrop-filter: blur(32px);
        `,
      },
    },
  },
  primitive: primitiveVar,
  opacity: opacityVar,
  breakpoint,
  spacing: spacingVar,
  radius: radiusVar,
  dimension: dimensionVar,
  zIndex: zIndexVar,
};

export const darkTheme = {
  ...darkOriginTheme,
  atomic: addVarPrefix(atomic, 'atomic') as typeof atomic,
  semantic: {
    ...(addVarPrefix(semantic.dark, 'semantic') as typeof semantic.dark),
    platform: {
      ios: {
        navigation: `
          background-color: rgba(var(--semantic-surface-elevated-primary-rgb), 0.88);
          backdrop-filter: blur(32px);
        `,
      },
    },
  },
  primitive: primitiveVar,
  opacity: opacityVar,
  breakpoint,
  spacing: spacingVar,
  radius: radiusVar,
  dimension: dimensionVar,
  zIndex: zIndexVar,
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
