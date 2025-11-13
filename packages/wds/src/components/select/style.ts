import { css } from '@wanteddev/wds-engine';

import { addOpacity, ellipsisTypographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { Theme } from '@wanteddev/wds-engine';
import type { SelectMultipleProps } from '../select-multiple/types';

export const selectStyle =
  ({
    invalid,
    width = 'initial',
    height = 'fit-content',
    disabled,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SelectMultipleProps) =>
  (theme: Theme) => css`
    display: flex;
    border-radius: 12px;
    border: none;
    box-shadow:
      inset 0 0 0 1px ${theme.semantic.line.normal.neutral},
      ${theme.semantic.elevation.shadow.normal.xsmall};
    background-color: ${theme.semantic.background.transparent.normal};
    backdrop-filter: blur(32px);
    width: ${toCssValue(width)};
    height: ${toCssValue(height)};
    padding: 12px;
    gap: 8px;
    transition: box-shadow ease 0.2s;
    cursor: pointer;

    [data-role='select-render-wrapper'],
    [data-role='select-multiple-render-wrapper'] {
      min-height: 24px;
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }

    [data-role='select-invalid'],
    [data-role='select-multiple-invalid'] {
      display: flex;
    }

    [data-role='select-placeholder'],
    [data-role='select-multiple-placeholder'] {
      color: ${theme.semantic.label.assistive};
    }
    [data-role='select-values'],
    [data-role='select-multiple-values'] {
      color: ${theme.semantic.label.normal};
    }

    ${invalid &&
    css`
      box-shadow:
        inset 0 0 0 1px
          ${addOpacity(theme.semantic.status.negative, theme.opacity[28])},
        ${theme.semantic.elevation.shadow.normal.xsmall};
    `}

    ${disabled
      ? css`
          background-color: ${theme.semantic.fill.alternative};
          backdrop-filter: none;
          box-shadow:
            inset 0 0 0 1px ${theme.semantic.line.normal.alternative},
            ${theme.semantic.elevation.shadow.normal.xsmall};
          cursor: default;

          [data-role='select-placeholder']
            [data-role='select-multiple-placeholder'] {
            color: ${theme.semantic.label.disable};
          }

          [data-role='select-values'],
          [data-role='select-multiple-values'] {
            color: ${theme.semantic.label.alternative};
          }
        `
      : css`
          &:focus,
          &[aria-expanded='true'] {
            ${invalid
              ? css`
                  box-shadow:
                    inset 0 0 0 2px
                      ${addOpacity(
                        theme.semantic.status.negative,
                        theme.opacity[43],
                      )},
                    ${theme.semantic.elevation.shadow.normal.xsmall};
                `
              : css`
                  box-shadow:
                    inset 0 0 0 2px
                      ${addOpacity(
                        theme.semantic.primary.normal,
                        theme.opacity[43],
                      )},
                    ${theme.semantic.elevation.shadow.normal.xsmall};
                `}
          }

          &[aria-expanded='true'] {
            ${invalid &&
            css`
              [data-role='select-invalid'],
              [data-role='select-multiple-invalid'] {
                display: none;
              }
            `}
          }
        `}


    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
        `}

        ${params?.height !== undefined &&
        css`
          height: ${toCssValue(params.height)};
        `}
        ${params?.sx}
      `,
    )}
  `;

export const invalidIconWrapperStyle = (theme: Theme) => css`
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.semantic.static.white};
  }

  svg {
    color: ${theme.semantic.status.negative};
    z-index: 0;
  }
`;

export const selectIconStyle =
  ({ disabled }: SelectMultipleProps) =>
  (theme: Theme) => css`
    font-size: 16px;
    margin: 4px;
    display: block;
    flex-shrink: 0;

    ${disabled
      ? css`
          color: ${theme.semantic.label.disable};
        `
      : css`
          color: ${theme.semantic.label.alternative};
        `}
  `;

export const selectTextStyle = css`
  ${ellipsisTypographyStyle(1)}
  user-select: none;
`;
