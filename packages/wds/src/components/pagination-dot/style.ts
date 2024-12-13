import { css } from '@wanteddev/wds-engine';

import { addOpacity, createResponsiveStyle } from '../../utils';

import type { PaginationDotProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const paginationDotWrapperStyle =
  ({
    color,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Omit<PaginationDotProps, 'totalPage'>) =>
  (theme: Theme) => css`
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: fit-content;
    position: relative;

    &::before {
      z-index: 0;
      content: '';
      position: absolute;
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    [data-role='pagination-dot-button'] {
      z-index: 1;
    }

    ${paginationDotWrapperSizeStyle({ size })}
    ${paginationDotWrapperColorStyle({ color }, theme)}

    &:hover, &:has(*:focus-visible) {
      [data-role='pagination-dot'] {
        width: var(--wds-pagination-dot-size, 10px) !important;
        height: var(--wds-pagination-dot-size, 10px) !important;
        margin-left: var(--wds-pagination-dot-size, 10px) !important;

        &::after {
          border-width: 1px !important;
        }

        &:first-of-type {
          margin-left: 0px !important;
        }
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${paginationDotWrapperSizeStyle({ size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

const paginationDotWrapperColorStyle = (
  { color }: Omit<PaginationDotProps, 'totalPage'>,
  theme: Theme,
) => {
  switch (color) {
    case 'normal':
      return css`
        [data-role='pagination-dot-button'] {
          background-color: ${addOpacity(
            theme.palette.label.normal,
            theme.opacity[16],
          )};
          border: none;

          &[aria-current='page'] {
            background-color: ${theme.palette.label.normal};
          }
        }
      `;
    case 'white':
      return css`
        [data-role='pagination-dot-button'] {
          background-color: ${addOpacity(
            theme.palette.static.white,
            theme.opacity[52],
          )};
          position: relative;
          border: none;

          &::after {
            position: absolute;
            border-radius: inherit;
            content: '';
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            opacity: ${theme.opacity[52]};
            border: 1px solid ${theme.palette.line.normal.neutral};
          }

          &[aria-current='page'] {
            background-color: ${theme.palette.static.white};
            &::after {
              opacity: ${theme.opacity[100]};
            }
          }
        }
      `;
  }
};

const paginationDotWrapperSizeStyle = ({
  size,
}: Omit<PaginationDotProps, 'totalPage'>) => {
  switch (size) {
    case 'normal':
      return css`
        height: 10px;

        --wds-pagination-dot-size: 10px;
      `;
    case 'small':
      return css`
        height: 8px;

        --wds-pagination-dot-size: 8px;
      `;
  }
};

export const paginationDotStyle = (scale: number, isFirst: boolean) => css`
  transition: all ease 0.2s;
  width: calc(var(--wds-pagination-dot-size, 10px) * ${scale});
  height: calc(var(--wds-pagination-dot-size, 10px) * ${scale});
  margin: 0px;
  padding: 0px;
  border-radius: 1000px;

  ${scale === 0 &&
  css`
    &&::after {
      border-width: 0px !important;
    }
  `}

  margin-left: ${scale === 0 || isFirst
    ? 0
    : 'var(--wds-pagination-dot-size, 10px)'};
`;
