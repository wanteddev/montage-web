import { type SerializedStyles, type Theme, css } from '@emotion/react';

import { respondMore } from './media';

import type { BreakPoint, ResponsiveProps } from '../types';

const order: Array<keyof BreakPoint> = ['xs', 'sm', 'md', 'lg'];

export const createResponsiveStyle =
  <T extends ResponsiveProps<any>>(responsive: T, theme: Theme) =>
  (
    cb: (param: T[keyof T], breakpoint?: keyof BreakPoint) => SerializedStyles,
  ) => {
    return css`
      ${Object.entries(responsive)
        .sort(([a], [b]) => {
          return (
            order.findIndex((v) => v === b) - order.findIndex((v) => v === a)
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
          }
        })};
    `;
  };
