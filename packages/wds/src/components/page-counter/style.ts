import { css } from '@wanteddev/wds-engine';

import { addOpacity, typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { PageCounterProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const pageCounterStyle =
  ({
    alternative,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Omit<PageCounterProps, 'totalPages'>) =>
  (theme: Theme) => css`
    list-style: none;
    margin: 0px;
    border-radius: 1000px;
    width: fit-content;
    position: relative;

    [data-role='page-counter-text'],
    [data-role='page-counter-divider'] {
      position: relative;
    }

    &::before {
      position: absolute;
      content: '';
      border-radius: inherit;
      ${alternative
        ? css`
            background-color: ${addOpacity(
              theme.atomic.coolNeutral[30],
              theme.opacity[61],
            )};
          `
        : css`
            will-change: backdrop-filter;
            backdrop-filter: blur(32px) saturate(150%) brightness(150%);
            background-color: ${addOpacity(
              theme.semantic.static.white,
              theme.opacity[35],
            )};

            @supports (-webkit-backdrop-filter: none) {
              clip-path: inset(0 round 1000px);
              overflow: auto;
              border-radius: 0;
            }
          `}
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
    }

    ${alternative
      ? css`
          [data-role='page-counter-text'] {
            color: ${addOpacity(
              theme.semantic.static.white,
              theme.opacity[88],
            )};

            &:first-of-type {
              text-shadow: 0px 0px 6px
                ${addOpacity(theme.semantic.static.black, theme.opacity[8])};
            }
          }

          [data-role='page-counter-divider'] {
            color: ${addOpacity(
              theme.semantic.static.white,
              theme.opacity[52],
            )};
          }
        `
      : css`
          [data-role='page-counter-text'] {
            color: ${addOpacity(
              theme.semantic.static.white,
              theme.opacity[88],
            )};

            &:first-of-type {
              text-shadow: 0px 0px 6px
                ${addOpacity(theme.semantic.static.black, theme.opacity[8])};
            }
          }

          [data-role='page-counter-divider'] {
            color: ${addOpacity(
              theme.semantic.static.white,
              theme.opacity[61],
            )};
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
}: Omit<PageCounterProps, 'totalPages'>) => {
  switch (size) {
    case 'small':
      return css`
        padding: 4px 10px;
        gap: 3px;

        [data-role='page-counter-divider'] {
          ${typographyStyle('label2', 'regular')}
        }
        [data-role='page-counter-text'] {
          ${typographyStyle('label2', 'bold')}
        }
      `;
    case 'medium':
      return css`
        padding: 6px 12px;
        gap: 4px;

        [data-role='page-counter-divider'] {
          ${typographyStyle('body2', 'regular')}
        }
        [data-role='page-counter-text'] {
          ${typographyStyle('body2', 'bold')}
        }
      `;
  }
};

export const backgroundBlendStyle = (theme: Theme) => css`
  position: absolute;
  content: '';
  background-color: ${addOpacity(
    theme.semantic.static.black,
    theme.opacity[28],
  )};
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: inherit;
`;
