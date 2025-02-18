import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  createResponsiveStyle,
  typographyStyle,
} from '../../utils';

import type { PaginationCounterProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const paginationCounterStyle =
  ({
    alternative,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Omit<PaginationCounterProps, 'totalPage'>) =>
  (theme: Theme) => css`
    list-style: none;
    margin: 0px;
    border-radius: 1000px;
    width: fit-content;
    position: relative;

    [data-role='pagination-counter-text'],
    [data-role='pagination-counter-divider'] {
      position: relative;
    }

    &::before {
      position: absolute;
      content: '';
      ${alternative
        ? css`
            background-color: ${addOpacity(
              theme.palette.coolNeutral[30],
              theme.opacity[61],
            )};
          `
        : css`
            backdrop-filter: blur(32px);
          `}
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      border-radius: inherit;
    }

    ${alternative
      ? css`
          [data-role='pagination-counter-text'] {
            color: ${addOpacity(theme.palette.static.white, theme.opacity[88])};

            &:first-of-type {
              text-shadow: 0px 0px 6px
                ${addOpacity(theme.palette.static.black, theme.opacity[8])};
            }
          }

          [data-role='pagination-counter-divider'] {
            color: ${addOpacity(theme.palette.static.white, theme.opacity[52])};
          }
        `
      : css`
          [data-role='pagination-counter-text'] {
            color: ${addOpacity(theme.palette.static.white, theme.opacity[88])};

            &:first-of-type {
              text-shadow: 0px 0px 6px
                ${addOpacity(theme.palette.static.black, theme.opacity[8])};
            }

            @supports (-webkit-backdrop-filter: none) {
              color: ${addOpacity(
                theme.palette.coolNeutral[70],
                theme.opacity[74],
              )};
              will-change: mix-blend-mode;
              mix-blend-mode: plus-lighter;
            }
          }

          [data-role='pagination-counter-divider'] {
            color: ${addOpacity(theme.palette.static.white, theme.opacity[28])};

            @supports (-webkit-backdrop-filter: none) {
              color: ${addOpacity(
                theme.palette.coolNeutral[70],
                theme.opacity[28],
              )};
              will-change: mix-blend-mode;
              mix-blend-mode: plus-lighter;
            }
          }
        `}

    ${paginationCounterSizeStyle({ size })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${paginationCounterSizeStyle({ size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

const paginationCounterSizeStyle = ({
  size,
}: Omit<PaginationCounterProps, 'totalPage'>) => {
  switch (size) {
    case 'small':
      return css`
        padding: 4px 10px;
        gap: 3px;

        [data-role='pagination-counter-divider'] {
          ${typographyStyle('label2', 'regular')}
        }
        [data-role='pagination-counter-text'] {
          ${typographyStyle('label2', 'bold')}
        }
      `;
    case 'normal':
      return css`
        padding: 6px 12px;
        gap: 4px;

        [data-role='pagination-counter-divider'] {
          ${typographyStyle('body2', 'regular')}
        }
        [data-role='pagination-counter-text'] {
          ${typographyStyle('body2', 'bold')}
        }
      `;
  }
};

export const backgroundBlendStyle = (theme: Theme) => css`
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: inherit;
  background-color: ${addOpacity(
    theme.palette.static.white,
    theme.opacity[35],
  )};

  @supports (-webkit-backdrop-filter: none) {
    mix-blend-mode: plus-lighter;
    will-change: mix-blend-mode;
  }
`;

export const backgroundBlendLayerStyle = (theme: Theme) => css`
  background-color: ${addOpacity(
    theme.palette.static.black,
    theme.opacity[28],
  )};
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: inherit;
`;
