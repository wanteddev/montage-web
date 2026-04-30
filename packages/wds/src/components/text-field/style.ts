import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { addOpacity } from '../../utils';
import { toCssValue } from '../../utils/internal/css';

import type { TextFieldButtonProps, TextFieldProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const EXCLUDE_TYPE = ['date', 'month', 'week', 'datetime-local', 'time'];

type TextFieldWrapperStyleProps = TextFieldProps & {
  type?: string;
  readOnly?: boolean;
};

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
  }: TextFieldWrapperStyleProps) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: none;
    box-shadow: ${theme.semantic.elevation.shadow.normal.xsmall};
    background-color: ${theme.semantic.background.transparent.normal};
    backdrop-filter: blur(32px);
    width: ${toCssValue(width)};
    height: ${toCssValue(height)};

    [data-role='text-field-wrapper'] {
      padding: 12px;
      width: 100%;
      height: 100%;
      align-items: center;
      cursor: text;
      position: relative;
      transition: box-shadow ease 0.2s;
      box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
      border-radius: inherit;
    }

    &:has([data-role='text-field-button']) {
      [data-role='text-field-wrapper'] {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }

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
      [data-role='text-field-wrapper'] {
        box-shadow: inset 0 0 0 1px
          ${addOpacity(theme.semantic.status.negative, theme.opacity[28])};
      }
    `}

    ${disabled
      ? css`
          background-color: ${theme.semantic.fill.alternative};
          backdrop-filter: none;
          [data-role='text-field-wrapper'] {
            box-shadow: inset 0 0 0 1px
              ${theme.semantic.line.normal.alternative};
          }
          cursor: default;
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(input:focus)),
            &:where(
                :has(
                    input[data-role='date-picker-field'][aria-expanded='true']
                  ),
                :has(
                    input[data-role='time-picker-field'][aria-expanded='true']
                  ),
                :has(
                    input[data-role='date-range-picker-field'][aria-expanded='true']
                  )
              ) {
              ${invalid
                ? css`
                    [data-role='text-field-wrapper'] {
                      box-shadow: inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.status.negative,
                          theme.opacity[43],
                        )};
                    }
                  `
                : css`
                    [data-role='text-field-wrapper'] {
                      box-shadow: inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.primary.normal,
                          theme.opacity[43],
                        )};
                    }
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
                    input[data-role='date-picker-field'][aria-expanded='true']
                  ),
                :has(input[data-role='time-picker-field'][aria-expanded='true'])
              ) {
              ${invalid
                ? css`
                    [data-role='text-field-wrapper'] {
                      box-shadow: inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.status.negative,
                          theme.opacity[43],
                        )};
                    }
                  `
                : css`
                    [data-role='text-field-wrapper'] {
                      box-shadow: inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.primary.normal,
                          theme.opacity[43],
                        )};
                    }
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
          :has(input[data-role='date-picker-field']),
          :has(input[data-role='time-picker-field']),
          :has(input[data-role='date-range-picker-field'])
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
      caret-color: ${theme.semantic.primary.normal};
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
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  ({ variant, disabled }: TextFieldButtonProps) =>
  (theme: Theme) => css`
    box-shadow: none;
    height: 100%;
    align-items: center;
    padding: 12px 16px;
    min-width: 80px;
    border-radius: inherit;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    overflow: hidden;
    background-color: transparent;
    flex-shrink: 0;
    position: relative;

    &:disabled {
      box-shadow: none;
    }

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
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
      `}
    }

    & > span {
      ${typographyStyle('body1', variant === 'assistive' ? 'medium' : 'bold')};
    }
  `;
