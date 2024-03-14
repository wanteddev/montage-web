import { css } from '@emotion/react';

import { createResponsiveStyle, typographyStyle } from '@/utils';

import type { TextFieldProps } from './types';
import type { Theme } from '@emotion/react';

export const textFieldWrapperStyle =
  ({
    invalid,
    disabled,
    width = 'initial',
    height = 'auto',
    xs,
    sm,
    md,
    lg,
  }: TextFieldProps) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${theme.palette.line.normal.normal};
    background-color: ${theme.palette.background.normal.normal};
    width: ${width};
    height: ${height};
    padding: 12px 16px;
    gap: 16px;
    cursor: text;

    ${disabled &&
    css`
      background-color: ${theme.palette.interaction.disable};
      cursor: default;
    `}

    ${invalid &&
    css`
      border-color: ${theme.palette.status.negative};
    `}

  @supports selector(:has(*)) {
      &:where(:has(input:focus)) {
        border-color: ${theme.palette.primary.normal};
      }
    }

    @supports not selector(:has(*)) {
      &:where(:focus-within) {
        border-color: ${theme.palette.primary.normal};
      }
    }

    &:where([type='number']) {
      -moz-appearance: textfield;
    }
    &::-webkit-inner-spin-button {
      appearance: none;
    }
    &::-webkit-search-cancel-button {
      appearance: none;
    }

    input {
      padding: 0;
      width: 100%;
      background-color: transparent;
      outline: none;
      border: none;
      color: ${theme.palette.label.normal};
      ${typographyStyle('body1_normal', 'regular')}

      &::placeholder {
        ${typographyStyle('body1_normal', 'regular')}
        color: ${theme.palette.label.assistive};
      }
    }

    & > span {
      padding-left: 12px;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg },
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

      ${params?.css}
      `,
    )}
  `;
