import { css } from '@wanteddev/wds-engine';
import objectPath from 'object-path';

import { respondMore } from './media';

import type {
  BreakPoint,
  ResponsiveProps,
  SerializedStyles,
  Theme,
} from '@wanteddev/wds-engine';

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
