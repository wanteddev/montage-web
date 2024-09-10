import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  createResponsiveStyle,
  ellipsisTypographyStyle,
} from '../../utils';

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
    align-items: flex-start;
    border-radius: 12px;
    border: none;
    box-shadow:
      inset 0 0 0 1px ${theme.palette.line.normal.neutral},
      0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
    background-color: transparent;
    width: ${width};
    height: ${height};
    padding: 12px;
    gap: 8px;
    transition: box-shadow ease 0.2s;
    cursor: pointer;

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
      color: ${theme.palette.label.assistive};
    }
    [data-role='select-values'],
    [data-role='select-multiple-values'] {
      color: ${theme.palette.label.normal};
    }

    ${invalid &&
    css`
      box-shadow:
        inset 0 0 0 1px
          ${addOpacity(theme.palette.status.negative, theme.opacity[28])},
        0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
    `}

    ${disabled
      ? css`
          background-color: ${theme.palette.interaction.disable};
          box-shadow:
            inset 0 0 0 1px ${theme.palette.line.normal.alternative},
            0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
          cursor: default;

          [data-role='select-placeholder']
            [data-role='select-multiple-placeholder'] {
            color: ${theme.palette.label.disable};
          }

          [data-role='select-values'],
          [data-role='select-multiple-values'] {
            color: ${theme.palette.label.alternative};
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
                        theme.palette.status.negative,
                        theme.opacity[43],
                      )},
                    0px 1px 2px 0px
                      ${addOpacity(theme.palette.static.black, 0.03)};
                `
              : css`
                  box-shadow:
                    inset 0 0 0 2px
                      ${addOpacity(
                        theme.palette.primary.normal,
                        theme.opacity[43],
                      )},
                    0px 1px 2px 0px
                      ${addOpacity(theme.palette.static.black, 0.03)};
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
        ${Boolean(params?.width) &&
        css`
          width: ${params!.width};
        `}

        ${Boolean(params?.height) &&
        css`
          height: ${params!.height};
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
    background-color: ${theme.palette.static.white};
  }

  svg {
    color: ${theme.palette.status.negative};
    z-index: 1;
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
          color: ${theme.palette.label.disable};
        `
      : css`
          color: ${theme.palette.label.alternative};
        `}
  `;

export const selectTextStyle = css`
  ${ellipsisTypographyStyle(1)}
  user-select: none;
`;

export const selectBubbleInputStyle = css`
  display: none;
  pointer-events: none;
  position: absolute;
  opacity: 0;
  margin: 0;
  transform: translateX(-100%);
`;
