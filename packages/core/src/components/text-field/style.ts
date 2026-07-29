import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { TextFieldProps } from './types';
import type { Theme } from '@montage-ui/engine';

const EXCLUDE_TYPE = ['date', 'month', 'week', 'datetime-local', 'time'];

type TextFieldWrapperStyleProps = TextFieldProps & {
  type?: string;
  readOnly?: boolean;
};

export const textFieldWrapperStyle =
  ({
    size,
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
    border: none;
    background-color: ${theme.semantic.effect.transparent.primary};
    backdrop-filter: blur(32px);
    width: ${toCssValue(width)};
    height: ${toCssValue(height)};
    cursor: text;
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
    transition: box-shadow ease 0.2s;

    ${textFieldSizeStyle({ size }, theme)}

    [data-role='text-field-positive'] {
      display: flex;
    }

    [data-role='text-field-reset'] {
      display: none;
    }

    [data-role='text-field-wrapper'] {
      padding: ${theme.spacing[0]} ${theme.spacing[4]};
      align-items: center;
      width: 100%;
      height: 100%;
    }

    ${EXCLUDE_TYPE.includes(type || '') &&
    css`
      [data-role='text-field-positive'] {
        display: none !important;
      }

      [data-role='text-field-reset'] {
        display: none !important;
      }
    `}

    ${invalid &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.semantic.line.negative.primary};
    `}

    ${disabled
      ? css`
          background-color: ${theme.semantic.surface.neutral.tertiary};
          backdrop-filter: none;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.tertiary};
          cursor: default;
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(input:focus)) {
              ${invalid
                ? css`
                    box-shadow:
                      inset 0 0 0 1px ${theme.semantic.line.negative.strong},
                      0 0 0 4px ${theme.semantic.line.negative.focus};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 1px ${theme.semantic.line.brand.strong},
                      0 0 0 4px ${theme.semantic.line.brand.focus};
                  `}

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
                [data-role='text-field-positive'] {
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
                      inset 0 0 0 1px ${theme.semantic.line.negative.strong},
                      0 0 0 4px ${theme.semantic.line.negative.focus};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 1px ${theme.semantic.line.brand.strong},
                      0 0 0 4px ${theme.semantic.line.brand.focus};
                  `}

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
      color: ${theme.semantic.foreground.neutral.primary};
    }

    input:disabled::placeholder {
      color: ${theme.semantic.foreground.disable.primary};
    }

    @supports selector(:has(*)) {
      &:where(
        :has(input[data-role='date-picker-field']),
        :has(input[data-role='time-picker-field']),
        :has(input[data-role='date-range-picker-field'])
      ) {
        [data-role='text-field-reset'],
        [data-role='text-field-positive'] {
          display: none;
        }
      }
    }

    [data-role='text-field-leading-content'],
    [data-role='text-field-trailing-content'],
    [data-role='text-field-wrapper'] {
      font: inherit;
    }

    [data-role='text-field-leading-content'],
    [data-role='text-field-trailing-content'] {
      flex-shrink: 0;
    }

    input {
      width: 100%;
      background-color: transparent;
      caret-color: ${theme.semantic.foreground.brand.primary};
      outline: none;
      border: none;
      box-shadow: none;
      font: inherit;
      color: ${theme.semantic.foreground.neutral.primary};

      &::placeholder {
        font: inherit;
        color: ${theme.semantic.foreground.neutral.tertiary};
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

        ${textFieldSizeStyle({ size: params?.size }, theme)}
        ${params?.sx}
      `,
    )}
  `;

const textFieldSizeStyle = ({ size }: TextFieldProps, theme: Theme) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: ${theme.radius[14]};
        padding: ${theme.spacing[12]} ${theme.spacing[8]};
        ${typographyStyle('body2', 'regular')}

        input {
          padding: 1px ${theme.spacing[4]};
        }

        --text-field-content-icon-wrapper-size: ${theme.dimension[24]};
        --text-field-content-icon-size: ${theme.dimension[20]};
        --text-field-content-max-height: ${theme.dimension[24]};
        --text-field-button-padding: ${theme.spacing[8]} ${theme.spacing[12]};
        --text-field-button-radius: ${theme.radius[10]};
        --text-field-button-max-height: ${theme.dimension[32]};
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[12]};
        padding: ${theme.spacing[10]} ${theme.spacing[6]};
        ${typographyStyle('label1', 'regular')}

        input {
          padding: ${theme.spacing[0]} ${theme.spacing[4]};
        }

        --text-field-content-icon-wrapper-size: ${theme.dimension[20]};
        --text-field-content-icon-size: ${theme.dimension[18]};
        --text-field-content-max-height: ${theme.dimension[20]};
        --text-field-button-padding: ${theme.spacing[6]} ${theme.spacing[10]};
        --text-field-button-radius: ${theme.radius[8]};
        --text-field-button-max-height: ${theme.dimension[28]};
      `;
  }
};

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
    color: ${theme.semantic.foreground.positive.primary};
    z-index: 0;
  }
`;

export const textFieldContentStyle = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  max-height: var(--text-field-content-max-height);
`;

export const textFieldButtonStyle = css`
  min-height: initial;
  padding: var(--text-field-button-padding);
  border-radius: var(--text-field-button-radius);
  background-color: transparent;
  flex-shrink: 0;
  position: relative;

  & > span {
    ${typographyStyle('caption1', 'bold')};
  }
`;
