import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  createResponsiveStyle,
  typographyStyle,
} from '../../utils';

import type { PageIndicatorProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const pageIndicatorCounterStyle =
  ({ xs, sm, md, lg, xl }: PageIndicatorProps) =>
  (theme: Theme) => css`
    list-style: none;
    margin: 0px;
    border-radius: 24px;
    padding: 4px 10px;
    width: fit-content;
    position: relative;
    ${typographyStyle('label2', 'bold')}

    [data-role="page-indicator-counter-wrapper"] {
      mix-blend-mode: plus-lighter;
      display: flex;
      z-index: 1;
      position: relative;
      gap: 2px;
      align-items: center;
    }

    [data-role='page-indicator-counter-text'] {
      color: ${theme.palette.coolNeutral[70]};
    }

    [data-role='page-indicator-counter-divider'] {
      color: ${theme.palette.coolNeutral[50]};
      opacity: ${theme.opacity[43]};
      ${typographyStyle('caption1', 'medium')}
    }

    [data-role='page-indicator-counter-background-layer'] {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      backdrop-filter: blur(32px);
    }

    [data-role='page-indicator-counter-background-first'] {
      mix-blend-mode: plus-lighter;
      opacity: 0.35;
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: ${theme.palette.static.white};
    }

    [data-role='page-indicator-counter-background-second'] {
      opacity: 0.28;
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: ${theme.palette.static.black};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.sx}
      `,
    )}
  `;

export const pageIndicatorDotWrapperStyle =
  ({ color, size, xs, sm, md, lg, xl }: PageIndicatorProps) =>
  (theme: Theme) => css`
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: fit-content;

    ${pageIndicatorDotWrapperSizeStyle({ size })}
    ${pageIndicatorDotWrapperColorStyle({ color }, theme)}

    &:hover, &:has(*:focus-visible) {
      [data-role='page-indicator-dot'] {
        width: var(--wds-page-indicator-dot-size, 10px) !important;
        height: var(--wds-page-indicator-dot-size, 10px) !important;
        margin-left: var(--wds-page-indicator-dot-size, 10px) !important;

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
        ${pageIndicatorDotWrapperSizeStyle({ size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

const pageIndicatorDotWrapperColorStyle = (
  { color }: PageIndicatorProps,
  theme: Theme,
) => {
  switch (color) {
    case 'normal':
      return css`
        [data-role='page-indicator-dot'] {
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
        [data-role='page-indicator-dot'] {
          background-color: ${addOpacity(theme.palette.static.white, 0.56)};
          position: relative;

          &::after {
            position: absolute;
            border-radius: inherit;
            content: '';
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            opacity: 0.56;
            border: 1px solid
              ${addOpacity(
                theme.palette.line.normal.neutral,
                theme.opacity[88],
              )};
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

const pageIndicatorDotWrapperSizeStyle = ({ size }: PageIndicatorProps) => {
  switch (size) {
    case 'normal':
      return css`
        height: 10px;

        --wds-page-indicator-dot-size: 10px;
      `;
    case 'small':
      return css`
        height: 8px;

        --wds-page-indicator-dot-size: 8px;
      `;
  }
};

export const pageIndicatorDotStyle = (scale: number, isFirst: boolean) => css`
  transition: all ease 0.2s;
  width: calc(var(--wds-page-indicator-dot-size, 10px) * ${scale});
  height: calc(var(--wds-page-indicator-dot-size, 10px) * ${scale});
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
    : 'var(--wds-page-indicator-dot-size, 10px)'};
`;
