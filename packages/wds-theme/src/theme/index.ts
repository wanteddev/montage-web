import breakpoint from './breakpoint';
import opacity from './opacity';
import spacing from './spacing';
import zIndex from './z-index';
import atomic from './atomic';
import * as semantic from './semantic';

/**
 * @description css variable을 사용하지 않는 theme
 */
export const lightOriginTheme = {
  palette: {
    ...atomic,
    ...semantic.light,
  },
  opacity,
  breakpoint,
  spacing,
  zIndex,
  platform: {
    ios: {
      navigation: `
        background-color: rgba(var(--palette-background-elevated-normal-rgb), 0.88);
        backdrop-filter: blur(32px);
      `,
    },
  },
};

/**
 * @description css variable을 사용하지 않는 theme
 */
export const darkOriginTheme = {
  palette: {
    ...atomic,
    ...semantic.dark,
  },
  opacity,
  breakpoint,
  spacing,
  zIndex,
  platform: {
    ios: {
      navigation: `
        background-color: rgba(var(--palette-background-elevated-normal-rgb), 0.88);
        backdrop-filter: blur(32px);
      `,
    },
  },
};

const addVarPrefix = (obj: any, prefix: string) => {
  const newObj: any = {};

  for (const key in obj) {
    const originPrefix = `${prefix}-${key}`;

    if (typeof obj[key] === 'object') {
      newObj[key] = addVarPrefix(obj[key], originPrefix);
    } else if (typeof obj[key] === 'string' && obj[key].startsWith('#')) {
      newObj[key] = `var(--${originPrefix})`;
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const lightTheme = {
  ...lightOriginTheme,
  palette: {
    ...(addVarPrefix(atomic, 'palette') as typeof atomic),
    ...(addVarPrefix(semantic.light, 'palette') as typeof semantic.light),
  },
};

export const darkTheme = {
  ...darkOriginTheme,
  palette: {
    ...(addVarPrefix(atomic, 'palette') as typeof atomic),
    ...(addVarPrefix(semantic.dark, 'palette') as typeof semantic.dark),
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
