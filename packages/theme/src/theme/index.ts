import { addHexOpacity } from '../utils';

import atomic from './atomic';
import breakpoint from './breakpoint';
import dimension from './dimension';
import opacity from './opacity';
import primitive from './primitive';
import radius from './radius';
import * as semantic from './semantic';
import spacing from './spacing';
import typography from './typography';
import zIndex from './z-index';

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
      ` as const,
      },
    },
  },
  opacity,
  breakpoint,
  primitive,
  spacing,
  radius,
  dimension,
  typography,
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
      ` as const,
      },
    },
  },
  opacity,
  breakpoint,
  primitive,
  spacing,
  radius,
  dimension,
  typography,
  zIndex,
};

/** Object key → css variable segment (`0.5` → `0_5`). */
type CssVarSegment<K extends string> = K extends `${infer Head}.${infer Tail}`
  ? `${Head}_${CssVarSegment<Tail>}`
  : K;

/**
 * Maps every leaf of a token object to its css variable reference,
 * e.g. `CssVarTokens<{ blue: { 50: '#0066FF' } }, 'atomic'>`
 * → `{ blue: { 50: 'var(--atomic-blue-50)' } }`.
 */
export type CssVarTokens<T, Prefix extends string> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? CssVarTokens<T[K], `${Prefix}-${CssVarSegment<`${K}`>}`>
        : never;
    }
  : `var(--${Prefix})`;

const toCssVarSegment = (key: string) => key.replace(/\./g, '_');

const toCssVars = <T extends object, Prefix extends string>(
  obj: T,
  prefix: Prefix,
): CssVarTokens<T, Prefix> => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${toCssVarSegment(key)}`;

    result[key] =
      typeof value === 'object' && value !== null
        ? toCssVars(value, name)
        : `var(--${name})`;
  }

  return result as CssVarTokens<T, Prefix>;
};

const atomicVar = toCssVars(atomic, 'atomic');
const primitiveVar = toCssVars(primitive, 'primitive');
const opacityVar = toCssVars(opacity, 'opacity');
const spacingVar = toCssVars(spacing, 'spacing');
const radiusVar = toCssVars(radius, 'radius');
const dimensionVar = toCssVars(dimension, 'dimension');
const zIndexVar = toCssVars(zIndex, 'zIndex');

/**
 * Typography tokens as css variable references. Exported on its own because
 * typography is theme invariant, so consumers can read it without a theme.
 */
export const typographyVar = toCssVars(typography, 'typography');

export const lightTheme = {
  ...lightOriginTheme,
  atomic: atomicVar,
  semantic: {
    ...toCssVars(semantic.light, 'semantic'),
    platform: {
      ios: {
        navigation: `
          background-color: rgba(var(--semantic-surface-elevated-primary-rgb), 0.88);
          backdrop-filter: blur(32px);
        ` as const,
      },
    },
  },
  primitive: primitiveVar,
  opacity: opacityVar,
  breakpoint,
  spacing: spacingVar,
  radius: radiusVar,
  dimension: dimensionVar,
  typography: typographyVar,
  zIndex: zIndexVar,
};

export const darkTheme = {
  ...darkOriginTheme,
  atomic: atomicVar,
  semantic: {
    ...toCssVars(semantic.dark, 'semantic'),
    platform: {
      ios: {
        navigation: `
          background-color: rgba(var(--semantic-surface-elevated-primary-rgb), 0.88);
          backdrop-filter: blur(32px);
        ` as const,
      },
    },
  },
  primitive: primitiveVar,
  opacity: opacityVar,
  breakpoint,
  spacing: spacingVar,
  radius: radiusVar,
  dimension: dimensionVar,
  typography: typographyVar,
  zIndex: zIndexVar,
} satisfies typeof lightTheme;

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
