import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { PaginationDotsProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const paginationDotsWrapperStyle =
  ({
    color,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Omit<PaginationDotsProps, 'totalPages'>) =>
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

    ${paginationDotsWrapperSizeStyle({ size })}
    ${paginationDotsWrapperColorStyle({ color }, theme)}

    &:hover, &:has(*:focus-visible) {
      [data-role='pagination-dot-button'] {
        width: var(--wds-pagination-dot-size, 10px);
        height: var(--wds-pagination-dot-size, 10px);
        margin-left: var(--wds-pagination-dot-size, 10px);

        &::after {
          --wds-pagination-dot-border-color: ${theme.semantic.line.normal
            .neutral};
        }

        &:first-of-type {
          margin-left: 0px;
        }
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${paginationDotsWrapperSizeStyle({ size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

const paginationDotsWrapperColorStyle = (
  { color }: Omit<PaginationDotsProps, 'totalPages'>,
  theme: Theme,
) => {
  switch (color) {
    case 'normal':
      return css`
        [data-role='pagination-dot-button'] {
          background-color: ${addOpacity(
            theme.semantic.label.normal,
            theme.opacity[16],
          )};
          border: none;

          &[aria-selected='true'] {
            background-color: ${theme.semantic.label.normal};
          }
        }
      `;
    case 'white':
      return css`
        [data-role='pagination-dot-button'] {
          background-color: ${addOpacity(
            theme.semantic.static.white,
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
            transition:
              border ease 0.2s,
              opacity ease 0.2s;
            border: 1px solid
              var(
                --wds-pagination-dot-border-color,
                ${theme.semantic.line.normal.neutral}
              );
          }

          &[aria-selected='true'] {
            background-color: ${theme.semantic.static.white};
            &::after {
              opacity: ${theme.opacity[100]};
            }
          }
        }
      `;
  }
};

const paginationDotsWrapperSizeStyle = ({
  size,
}: Omit<PaginationDotsProps, 'totalPages'>) => {
  switch (size) {
    case 'medium':
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

export const paginationDotsStyle = (scale: number, isFirst: boolean) => css`
  transition: all ease 0.2s;
  width: calc(var(--wds-pagination-dot-size, 10px) * ${scale});
  height: calc(var(--wds-pagination-dot-size, 10px) * ${scale});
  margin: 0px;
  padding: 0px;
  border-radius: 1000px;

  ${scale === 0 &&
  css`
    &::after {
      --wds-pagination-dot-border-color: transparent;
    }
  `}

  margin-left: ${scale === 0 || isFirst
    ? 0
    : 'var(--wds-pagination-dot-size, 10px)'};
`;
