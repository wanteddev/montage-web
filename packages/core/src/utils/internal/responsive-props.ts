import { css } from '@montage-ui/engine';
import objectPath from 'object-path';

import { respondMore } from '../media';

import type {
  BreakPoint,
  CSSInterpolation,
  Merge,
  ResponsiveProps,
  SerializedStyles,
  Theme,
} from '@montage-ui/engine';

/**
 * The actual shape of a single breakpoint value inside `ResponsiveProps<T>` —
 * `ResponsiveProps` merges `sx` into every breakpoint on top of `T`.
 */
type ResponsiveBreakpointValue<T> = Merge<T, { sx?: CSSInterpolation }>;

const order: Array<keyof BreakPoint> = ['xs', 'sm', 'md', 'lg', 'xl'];

export const createEmptyResponsiveStyle =
  (responsive: ResponsiveProps<any>) => (theme: Theme) => css`
    ${createResponsiveStyle(
      responsive,
      theme,
    )(
      (params) => css`
        ${params?.sx}
      `,
    )}
  `;

export const createResponsiveStyle =
  <T extends ResponsiveProps<any>>(responsive: T, theme: Theme) =>
  (
    cb: (param: T[keyof T], breakpoint?: keyof BreakPoint) => SerializedStyles,
  ) => {
    return css`
      ${Object.entries(responsive)
        .sort(([a], [b]) => {
          return (
            order.findIndex((v) => v === a) - order.findIndex((v) => v === b)
          );
        })
        .map(([bp, value]) => {
          if (!value || !Object.values(value).some((v) => v !== undefined)) {
            return;
          }

          const breakpoint = bp as keyof BreakPoint;

          switch (breakpoint) {
            case 'xs':
              return css`
                ${respondMore(theme.breakpoint.xs)} {
                  ${cb(value, 'xs')}
                }
              `;
            case 'sm':
              return css`
                ${respondMore(theme.breakpoint.sm)} {
                  ${cb(value, 'sm')}
                }
              `;
            case 'md':
              return css`
                ${respondMore(theme.breakpoint.md)} {
                  ${cb(value, 'md')}
                }
              `;
            case 'lg':
              return css`
                ${respondMore(theme.breakpoint.lg)} {
                  ${cb(value, 'lg')}
                }
              `;
            case 'xl':
              return css`
                ${respondMore(theme.breakpoint.xl)} {
                  ${cb(value, 'xl')}
                }
              `;
          }
        })};
    `;
  };

export const getPreviousValue = <T extends object, K extends keyof T>(
  params: ResponsiveProps<T>,
  key: K,
  defaultValue: T[K],
  breakpoint: keyof BreakPoint,
): T[K] => {
  switch (breakpoint) {
    case 'xl':
      return (
        objectPath.get(params.xl || {}, key as string) ??
        objectPath.get(params.lg || {}, key as string) ??
        objectPath.get(params.md || {}, key as string) ??
        objectPath.get(params.sm || {}, key as string) ??
        objectPath.get(params.xs || {}, key as string) ??
        defaultValue
      );
    case 'lg':
      return (
        objectPath.get(params.lg || {}, key as string) ??
        objectPath.get(params.md || {}, key as string) ??
        objectPath.get(params.sm || {}, key as string) ??
        objectPath.get(params.xs || {}, key as string) ??
        defaultValue
      );
    case 'md':
      return (
        objectPath.get(params.md || {}, key as string) ??
        objectPath.get(params.sm || {}, key as string) ??
        objectPath.get(params.xs || {}, key as string) ??
        defaultValue
      );
    case 'sm':
      return (
        objectPath.get(params.sm || {}, key as string) ??
        objectPath.get(params.xs || {}, key as string) ??
        defaultValue
      );
    case 'xs':
    default:
      return objectPath.get(params.xs || {}, key as string) ?? defaultValue;
  }
};

/**
 * Splits responsive breakpoint props by specified keys.
 * Returns `picked` containing only the specified keys and `rest` containing everything else.
 */
const splitResponsiveProps = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  bp: T | undefined,
  keys: Array<K>,
): { picked: Pick<T, K> | undefined; rest: Omit<T, K> | undefined } => {
  if (!bp) return { picked: undefined, rest: undefined };

  const picked = {} as Record<string, unknown>;
  const rest = {} as Record<string, unknown>;

  for (const [k, v] of Object.entries(bp)) {
    if (keys.includes(k as K)) {
      picked[k] = v;
    } else {
      rest[k] = v;
    }
  }

  const hasPicked = Object.keys(picked).length > 0;
  const hasRest = Object.keys(rest).length > 0;

  return {
    picked: hasPicked ? (picked as Pick<T, K>) : undefined,
    rest: hasRest ? (rest as Omit<T, K>) : undefined,
  };
};

/**
 * Splits every breakpoint of responsive props by the specified keys.
 * Returns `picked` responsive props containing only the specified keys and
 * `rest` responsive props containing everything else.
 *
 * Empty sides are returned as `undefined` (and empty breakpoints are omitted)
 * so the results can be passed to a context or spread into a component
 * without producing empty objects.
 *
 * @example
 * splitResponsiveBreakpoints({ xs: { size: 'medium', gap: '4px' } }, ['size']);
 * // { picked: { xs: { size: 'medium' } }, rest: { xs: { gap: '4px' } } }
 */
export const splitResponsiveBreakpoints = <
  T extends Record<string, unknown>,
  K extends keyof ResponsiveBreakpointValue<T>,
>(
  responsive: ResponsiveProps<T>,
  keys: Array<K>,
): {
  picked: ResponsiveProps<Pick<ResponsiveBreakpointValue<T>, K>> | undefined;
  rest: ResponsiveProps<Omit<ResponsiveBreakpointValue<T>, K>> | undefined;
} => {
  let picked: Record<string, Pick<ResponsiveBreakpointValue<T>, K>> | undefined;
  let rest: Record<string, Omit<ResponsiveBreakpointValue<T>, K>> | undefined;

  for (const breakpoint of order) {
    const split = splitResponsiveProps(
      responsive[breakpoint] as ResponsiveBreakpointValue<T> | undefined,
      keys,
    );

    if (split.picked) (picked ??= {})[breakpoint] = split.picked;
    if (split.rest) (rest ??= {})[breakpoint] = split.rest;
  }

  return { picked, rest };
};

/**
 * Maps a single key of each breakpoint in responsive props to a new value,
 * producing responsive props that can be spread into another component.
 *
 * Breakpoints whose value is `undefined` are skipped, so the transform never
 * runs on a missing value (the breakpoint simply stays absent).
 *
 * @example
 * mapResponsiveProps({ xs: { size: 'large' }, sm: { size: 'medium' } }, 'size', (size) =>
 *   size === 'large' ? 24 : 20,
 * );
 * // { xs: { size: 24 }, sm: { size: 20 } }
 */
export const mapResponsiveProps = <T extends object, K extends keyof T, R>(
  responsive: ResponsiveProps<T>,
  key: K,
  transform: (value: NonNullable<T[K]>) => R,
): ResponsiveProps<Record<K, R>> => {
  const result: Record<string, Record<K, R>> = {};

  for (const breakpoint of order) {
    const value = (responsive[breakpoint] as T | undefined)?.[key];

    if (value === undefined) continue;

    result[breakpoint] = {
      [key]: transform(value as NonNullable<T[K]>),
    } as Record<K, R>;
  }

  return result;
};

/**
 * Merges fallback responsive props into user responsive props for a specific key,
 * respecting the cascade nature of responsive breakpoints.
 *
 * For each breakpoint B in `fallback` that carries `key`:
 * - If any breakpoint at B or higher in `user` already specifies `key`, the
 *   fallback at B is dropped — keeping it would cause the lower-breakpoint
 *   fallback to cascade up and conflict with the user's explicit override.
 * - Otherwise the fallback value is merged in (user props take precedence on
 *   any direct conflict within the same breakpoint).
 *
 * @example
 * // FormControl: sm={ size: 'medium' }  /  TextField: md={ size: 'large' }
 * mergeResponsiveProps({ md: { size: 'large' } }, { sm: { size: 'medium' } }, 'size');
 * // → { md: { size: 'large' } }  (sm fallback dropped — md user overrides it)
 *
 * // FormControl: sm={ size: 'medium' }  /  TextField: xs={ width: '100%' }
 * mergeResponsiveProps({ xs: { width: '100%' } }, { sm: { size: 'medium' } }, 'size');
 * // → { xs: { width: '100%' }, sm: { size: 'medium' } }  (no size conflict → fallback applied)
 */
export const mergeResponsiveProps = <T extends object, K extends keyof T>(
  user: ResponsiveProps<T>,
  fallback: ResponsiveProps<Pick<T, K>> | undefined,
  key: K,
): ResponsiveProps<T> => {
  if (!fallback) return user;

  const merged: Record<string, unknown> = {};

  for (const [i, bp] of order.entries()) {
    const userBp = user[bp];
    const fallbackBp = fallback[bp];

    if ((fallbackBp as Pick<T, K> | undefined)?.[key] === undefined) {
      if (userBp !== undefined) merged[bp] = userBp;
      continue;
    }

    const userHasKeyAtOrAbove = order
      .slice(i)
      .some(
        (higherBp) => (user[higherBp] as T | undefined)?.[key] !== undefined,
      );

    if (userHasKeyAtOrAbove) {
      if (userBp !== undefined) merged[bp] = userBp;
    } else {
      merged[bp] = { ...fallbackBp, ...userBp };
    }
  }

  return merged as ResponsiveProps<T>;
};
