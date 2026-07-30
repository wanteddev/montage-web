import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { SearchFieldProps } from './types';
import type { Theme } from '@montage-ui/engine';

type SearchFieldWrapperStyleProps = SearchFieldProps & { readOnly?: boolean };

export const searchFieldWrapperStyle =
  ({
    readOnly,
    disabled,
    width = 'initial',
    variant,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SearchFieldWrapperStyleProps) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    border: none;
    width: ${toCssValue(width)};
    cursor: text;

    ${searchFieldWrapperSizeStyle({ size }, theme)}
    ${searchFieldWrapperVariantStyle({ variant, disabled }, theme)}

      [data-role='search-field-icon'] {
      transition: color ease 0.2s;
      color: ${theme.semantic.foreground.neutral.tertiary};
    }

    [data-role='search-field-reset'] {
      display: none;
    }

    [data-role='search-field-wrapper'] {
      padding: ${theme.spacing[0]} ${theme.spacing[4]};
      gap: ${theme.spacing[2]};
      align-items: center;
      width: 100%;
      height: 100%;
    }

    ${disabled
      ? css`
          cursor: default;

          [data-role='search-field-icon'] {
            color: ${theme.semantic.foreground.disable.primary};
          }

          [data-role='search-field-reset'] {
            display: none;
          }
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(input:focus)) {
              [data-role='search-field-reset'] {
                display: ${readOnly ? 'none' : 'flex'};
              }

              &:where(:has(input:placeholder-shown)) {
                [data-role='search-field-reset'] {
                  display: none;
                }
              }
            }
          }

          @supports not selector(:has(*)) {
            &:where(:focus-within) {
              [data-role='search-field-reset'] {
                display: ${readOnly ? 'none' : 'flex'};
              }
            }
          }
        `}

    input {
      caret-color: ${theme.semantic.foreground.brand.primary};
      transition: color ease 0.2s;
      width: 100%;
      margin: 0;
      background-color: transparent;
      outline: none;
      border: none;
      box-shadow: none;
      color: ${theme.semantic.foreground.neutral.primary};

      &::placeholder {
        color: ${theme.semantic.foreground.neutral.tertiary};
      }

      &:disabled {
        color: ${theme.semantic.foreground.disable.primary};

        &::placeholder {
          color: ${theme.semantic.foreground.disable.primary};
        }
      }

      [type='number'] {
        -moz-appearance: textfield;
      }

      &::-webkit-inner-spin-button,
      &::-webkit-search-cancel-button,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        appearance: none;
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

        ${searchFieldWrapperSizeStyle({ size: params?.size }, theme)}

        ${params?.sx}
      `,
    )}
  `;

const searchFieldWrapperSizeStyle = (
  { size }: Pick<SearchFieldProps, 'size'>,
  theme: Theme,
) => {
  switch (size) {
    case 'large':
      return css`
        padding: ${theme.spacing[12]} ${theme.spacing[8]};
        border-radius: ${theme.radius[14]};
        min-height: ${theme.dimension[48]};

        --search-field-icon-wrapper-size: ${theme.dimension[24]};
        --search-field-icon-size: ${theme.dimension[20]};

        input {
          padding: 1px ${theme.spacing[4]};
          ${typographyStyle('body2', 'regular')}

          &::placeholder {
            ${typographyStyle('body2', 'regular')}
          }
        }
      `;
    case 'medium':
      return css`
        padding: ${theme.spacing[8]} ${theme.spacing[6]};
        border-radius: ${theme.radius[12]};
        min-height: ${theme.dimension[40]};

        --search-field-icon-wrapper-size: ${theme.dimension[20]};
        --search-field-icon-size: ${theme.dimension[18]};

        input {
          padding: ${theme.spacing[0]} ${theme.spacing[4]};
          ${typographyStyle('label1', 'regular')}

          &::placeholder {
            ${typographyStyle('label1', 'regular')}
          }
        }
      `;
  }
};

const searchFieldWrapperVariantStyle = (
  { variant, disabled }: SearchFieldProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'outlined':
      return css`
        background-color: ${theme.semantic.effect.transparent.primary};
        backdrop-filter: blur(32px);
        box-shadow: 0 0 0 1px inset ${theme.semantic.line.neutral.secondary};

        ${disabled &&
        css`
          background-color: ${theme.semantic.surface.neutral.tertiary};
          backdrop-filter: none;
          box-shadow: 0 0 0 1px inset ${theme.semantic.line.neutral.tertiary};
        `}
      `;
    default:
    case 'solid':
      return css`
        background-color: ${theme.semantic.surface.neutral.secondary};
        backdrop-filter: blur(32px);
        box-shadow: none;

        ${disabled &&
        css`
          background-color: ${theme.semantic.surface.neutral.secondary};
          backdrop-filter: blur(32px);
          box-shadow: none;
        `}
      `;
  }
};

export const searchFieldContentStyle = css`
  flex-shrink: 0;
  width: var(--search-field-icon-wrapper-size);
  height: var(--search-field-icon-wrapper-size);
  font-size: var(--search-field-icon-size);
`;
