import { css } from '@emotion/react';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

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
    xl,
  }: TextFieldProps) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 0 1px ${theme.palette.line.normal.normal};
    background-color: transparent;
    width: ${width};
    height: ${height};
    padding: 12px 16px;
    gap: 16px;
    cursor: text;

    @supports selector(:has(*)) {
      &:where(:has(input:focus)) {
        box-shadow: inset 0 0 0 1px ${theme.palette.primary.normal};
      }
    }

    @supports not selector(:has(*)) {
      &:where(:focus-within) {
        box-shadow: inset 0 0 0 1px ${theme.palette.primary.normal};
      }
    }

    ${disabled &&
    css`
      background-color: ${theme.palette.interaction.disable};
      cursor: default;
    `}

    ${invalid &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.palette.status.negative};
    `}

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
      box-shadow: none;
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

      ${params?.css}
      `,
    )}
  `;
