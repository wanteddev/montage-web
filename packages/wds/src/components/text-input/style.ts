import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';
import { addOpacity } from '../../utils';

import type { TextInputButtonProps, TextInputProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const EXCLUDE_TYPE = ['date', 'month', 'week', 'datetime-local', 'time'];

export const textInputWrapperStyle =
  ({
    invalid,
    type,
    disabled,
    width = 'initial',
    height = 'auto',
    xs,
    sm,
    md,
    lg,
    xl,
  }: TextInputProps & { type?: string }) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
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
    cursor: text;
    transition: box-shadow ease 0.2s;

    [data-role='text-input-invalid'],
    [data-role='text-input-positive'] {
      display: flex;
    }

    [data-role='text-input-reset'] {
      display: none;
    }

    ${EXCLUDE_TYPE.includes(type || '') &&
    css`
      input {
        max-height: 24px;
      }

      [data-role='text-input-invalid'],
      [data-role='text-input-positive'] {
        display: none !important;
      }

      [data-role='text-input-reset'] {
        display: none !important;
      }
    `}

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
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(input:focus)) {
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

              [data-role='text-input-invalid'],
              [data-role='text-input-positive'] {
                display: none;
              }

              [data-role='text-input-reset'] {
                display: flex;
              }

              &:where(:has(input:placeholder-shown)) {
                [data-role='text-input-reset'] {
                  display: none;
                }
                [data-role='text-input-invalid'],
                [data-role='text-input-positive'] {
                  display: flex;
                }
              }
            }
          }

          @supports not selector(:has(*)) {
            &:where(:focus-within) {
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

              [data-role='text-input-invalid'],
              [data-role='text-input-positive'] {
                display: none;
              }
              [data-role='text-input-reset'] {
                display: flex;
              }
            }
          }
        `}

        
    input:disabled {
      color: ${theme.palette.label.alternative};
    }

    input:disabled::placeholder {
      color: ${theme.palette.label.disable};
    }

    &:where(:has(input:placeholder-shown)) {
      [data-role='text-input-reset'] {
        display: none;
      }
    }

    input {
      padding: 0 4px;
      width: 100%;
      background-color: transparent;
      outline: none;
      border: none;
      box-shadow: none;
      color: ${theme.palette.label.normal};
      ${typographyStyle('body1_normal', 'regular')}

      &::placeholder {
        ${typographyStyle('body1_normal', 'regular')}
        color: ${theme.palette.label.assistive};
      }

      [type='number'] {
        -moz-appearance: textfield;
      }
      &::-webkit-inner-spin-button,
      &::-webkit-search-cancel-button {
        appearance: none;
      }
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }

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

export const positiveIconWrapperStyle = (theme: Theme) => css`
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 50%;
    height: 50%;
    background-color: ${theme.palette.static.white};
  }

  svg {
    color: ${theme.palette.primary.normal};
    z-index: 1;
  }
`;

export const textInputContentStyle = (theme: Theme) => css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
  max-height: 24px;

  & > svg {
    color: ${theme.palette.label.alternative};
  }

  [wds-component='icon-button'][data-variant='normal'] {
    color: ${theme.palette.label.alternative};
  }
`;

export const textInputButtonStyle =
  ({ position, variant, disabled }: TextInputButtonProps) =>
  (theme: Theme) => css`
    box-shadow: none;
    padding: 12px 16px;
    min-width: 80px;

    &:disabled {
      box-shadow: none;
      background-color: ${theme.palette.interaction.disable};
    }

    ${textInputButtonPositionStyle({ position, disabled }, theme)}

    &>span {
      ${typographyStyle(
        'body1_normal',
        variant === 'assistive' ? 'medium' : 'bold',
      )};
    }
  `;

export const textInputButtonPositionStyle = (
  { position, disabled }: TextInputButtonProps,
  theme: Theme,
) => {
  switch (position) {
    case 'right':
      return css`
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        overflow: hidden;

        &::before {
          content: '';
          right: 0px;
          top: 0px;
          border-radius: inherit;
          position: absolute;
          width: calc(100% + 3px);
          height: calc(100% + 0px);
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

          ${disabled &&
          css`
            box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.alternative};
          `}
        }
      `;
    case 'left':
      return css`
        overflow: hidden;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;

        &::before {
          content: '';
          left: 0px;
          top: 0px;
          border-radius: inherit;
          position: absolute;
          width: calc(100% + 3px);
          height: calc(100% + 0px);
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

          ${disabled &&
          css`
            box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.alternative};
          `}
        }
      `;
  }
};
