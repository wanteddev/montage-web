import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { SearchInputProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const searchInputWrapperStyle =
  ({
    readOnly,
    disabled,
    width = 'initial',
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SearchInputProps & { readOnly?: boolean }) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: none;
    background-color: ${theme.palette.fill.normal};
    backdrop-filter: blur(32px);
    will-change: backdrop-filter;
    width: ${width};
    cursor: text;

    ${searchInputWrapperSizeStyle({ size })}

    [data-role='search-input-icon'] {
      transition: color ease 0.2s;
      color: ${theme.palette.label.alternative};
    }

    [data-role='search-input-reset'] {
      display: none;
    }

    ${disabled
      ? css`
          cursor: default;

          [data-role='search-input-icon'] {
            color: ${theme.palette.label.disable};
          }

          [data-role='search-input-reset'] {
            display: none;
          }
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(input:placeholder-shown)) {
              [data-role='search-input-icon'] {
                color: ${theme.palette.label.assistive};
              }
            }

            &:where(:has(input:focus)) {
              [data-role='search-input-reset'] {
                display: ${readOnly ? 'none' : 'flex'};
              }

              &:where(:has(input:placeholder-shown)) {
                [data-role='search-input-reset'] {
                  display: none;
                }

                [data-role='search-input-icon'] {
                  color: ${theme.palette.label.alternative};
                }
              }
            }
          }

          @supports not selector(:has(*)) {
            &:where(:focus-within) {
              [data-role='search-input-reset'] {
                display: ${readOnly ? 'none' : 'flex'};
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

    input {
      transition: color ease 0.2s;
      width: 100%;
      padding: 0;
      margin: 0;
      min-height: 24px;
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
        ${Boolean(params?.width) &&
        css`
          width: ${params!.width};
        `}

        ${searchInputWrapperSizeStyle({ size: params?.size })}

        ${params?.sx}
      `,
    )}
  `;

const searchInputWrapperSizeStyle = ({
  size,
}: Pick<SearchInputProps, 'size'>) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px;
      `;
    case 'medium':
      return css`
        padding: 12px;
      `;
  }
};

export const searchInputContentStyle = css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
  font-size: 20px;
  padding: 0px 2px;
`;
