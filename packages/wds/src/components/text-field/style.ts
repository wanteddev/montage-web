import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';
import { addOpacity } from '../../utils';

import type { TextFieldButtonProps, TextFieldProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const EXCLUDE_TYPE = ['date', 'month', 'week', 'datetime-local', 'time'];

export const textFieldWrapperStyle =
  ({
    invalid,
    readOnly,
    type,
    disabled,
    width = 'initial',
    height = 'auto',
    xs,
    sm,
    md,
    lg,
    xl,
  }: TextFieldProps & { type?: string; readOnly?: boolean }) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: none;
    box-shadow:
      inset 0 0 0 1px ${theme.semantic.line.normal.neutral},
      0px 1px 2px 0px ${addOpacity(theme.semantic.static.black, 0.03)};
    background-color: transparent;
    width: ${width};
    height: ${height};
    padding: 12px;
    gap: 8px;
    cursor: text;
    transition: box-shadow ease 0.2s;

    [data-role='text-field-invalid'],
    [data-role='text-field-positive'] {
      display: flex;
    }

    [data-role='text-field-reset'] {
      display: none;
    }

    ${EXCLUDE_TYPE.includes(type || '') &&
    css`
      input {
        max-height: 24px;
      }

      [data-role='text-field-invalid'],
      [data-role='text-field-positive'] {
        display: none !important;
      }

      [data-role='text-field-reset'] {
        display: none !important;
      }
    `}

    ${invalid &&
    css`
      box-shadow:
        inset 0 0 0 1px
          ${addOpacity(theme.semantic.status.negative, theme.opacity[28])},
        0px 1px 2px 0px ${addOpacity(theme.semantic.static.black, 0.03)};
    `}

    ${disabled
      ? css`
          background-color: ${theme.semantic.interaction.disable};
          box-shadow:
            inset 0 0 0 1px ${theme.semantic.line.normal.alternative},
            0px 1px 2px 0px ${addOpacity(theme.semantic.static.black, 0.03)};
          cursor: default;
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(input:focus)),
            &:where(
                :has(
                    input[data-role='date-picker-input'][aria-expanded='true']
                  ),
                :has(input[data-role='time-picker-input'][aria-expanded='true'])
              ) {
              ${invalid
                ? css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.status.negative,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.semantic.static.black, 0.03)};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.primary.normal,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.semantic.static.black, 0.03)};
                  `}

              [data-role='text-field-invalid'],
              [data-role='text-field-positive'] {
                display: none;
              }

              [data-role='text-field-reset'] {
                display: ${readOnly ? 'none' : 'flex'};
              }

              &:where(:has(input:placeholder-shown)) {
                [data-role='text-field-reset'] {
                  display: none;
                }
                [data-role='text-field-invalid'],
                [data-role='text-field-positive'] {
                  display: flex;
                }
              }
            }
          }

          @supports not selector(:has(*)) {
            &:where(:focus-within),
            &:where(
                :has(
                    input[data-role='date-picker-input'][aria-expanded='true']
                  ),
                :has(input[data-role='time-picker-input'][aria-expanded='true'])
              ) {
              ${invalid
                ? css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.status.negative,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.semantic.static.black, 0.03)};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.primary.normal,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.semantic.static.black, 0.03)};
                  `}

              [data-role='text-field-invalid'],
              [data-role='text-field-positive'] {
                display: none;
              }
              [data-role='text-field-reset'] {
                display: ${readOnly ? 'none' : 'flex'};
              }
            }
          }
        `}

        
    input:disabled {
      color: ${theme.semantic.label.alternative};
    }

    input:disabled::placeholder {
      color: ${theme.semantic.label.disable};
    }

    @supports selector(:has(*)) {
      &:where(
          :has(input[data-role='date-picker-input']),
          :has(input[data-role='time-picker-input'])
        ) {
        [data-role='text-field-reset'],
        [data-role='text-field-invalid'],
        [data-role='text-field-positive'] {
          display: none;
        }
      }
    }

    input {
      padding: 0 4px;
      width: 100%;
      min-height: 24px;
      background-color: transparent;
      outline: none;
      border: none;
      box-shadow: none;
      color: ${theme.semantic.label.normal};
      ${typographyStyle('body1', 'regular')}

      &::placeholder {
        ${typographyStyle('body1', 'regular')}
        color: ${theme.semantic.label.assistive};
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
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.semantic.static.white};
  }

  svg {
    color: ${theme.semantic.status.negative};
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
    background-color: ${theme.semantic.static.white};
  }

  svg {
    color: ${theme.semantic.primary.normal};
    z-index: 0;
  }
`;

export const textFieldContentStyle = css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
  max-height: 24px;
`;

export const textFieldButtonStyle =
  ({ position, variant, disabled }: TextFieldButtonProps) =>
  (theme: Theme) => css`
    box-shadow: none;
    padding: 12px 16px;
    min-width: 80px;

    &:disabled {
      box-shadow: none;
      background-color: ${theme.semantic.interaction.disable};
    }

    ${textFieldButtonPositionStyle({ position, disabled }, theme)}

    &>span {
      ${typographyStyle('body1', variant === 'assistive' ? 'medium' : 'bold')};
    }
  `;

export const textFieldButtonPositionStyle = (
  { position, disabled }: TextFieldButtonProps,
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
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

          ${disabled &&
          css`
            box-shadow: inset 0 0 0 1px
              ${theme.semantic.line.normal.alternative};
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
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

          ${disabled &&
          css`
            box-shadow: inset 0 0 0 1px
              ${theme.semantic.line.normal.alternative};
          `}
        }
      `;
  }
};
