import { addHexOpacity } from '../utils';

import breakpoint from './breakpoint';
import opacity from './opacity';
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
          background-color: ${addHexOpacity(semantic.light.background.elevated.normal, opacity[88])};
          backdrop-filter: blur(32px);
      `,
      },
    },
  },
  opacity,
  breakpoint,
  spacing,
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
          background-color: ${addHexOpacity(semantic.dark.background.elevated.normal, opacity[88])};
          backdrop-filter: blur(32px);
      `,
      },
    },
  },
  opacity,
  breakpoint,
  spacing,
  zIndex,
};

const addVarPrefix = (obj: any, prefix: string) => {
  const newObj: any = {};

  for (const key in obj) {
    const originPrefix = `${prefix}-${key}`;

    if (typeof obj[key] === 'object') {
      newObj[key] = addVarPrefix(obj[key], originPrefix);
    } else if (
      typeof obj[key] === 'string' &&
      (obj[key].startsWith('#') || prefix.includes('shadow'))
    ) {
      newObj[key] = `var(--${originPrefix})`;
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const lightTheme = {
  ...lightOriginTheme,
  atomic: addVarPrefix(atomic, 'atomic') as typeof atomic,
  semantic: {
    ...(addVarPrefix(semantic.light, 'semantic') as typeof semantic.light),
    platform: {
      ios: {
        navigation: `
          background-color: rgba(var(--semantic-background-elevated-normal-rgb), 0.88);
          backdrop-filter: blur(32px);
        `,
      },
    },
  },
};

export const darkTheme = {
  ...darkOriginTheme,
  atomic: addVarPrefix(atomic, 'atomic') as typeof atomic,
  semantic: {
    ...(addVarPrefix(semantic.dark, 'semantic') as typeof semantic.dark),
    platform: {
      ios: {
        navigation: `
          background-color: rgba(var(--semantic-background-elevated-normal-rgb), 0.88);
          backdrop-filter: blur(32px);
        `,
      },
    },
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
