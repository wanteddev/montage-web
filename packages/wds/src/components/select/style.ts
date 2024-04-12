import { css } from '@emotion/react';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { SelectProps } from './types';
import type { Theme } from '@emotion/react';

export const selectWrapperStyle =
  ({
    __shouldShowPlaceholder,
    invalid,
    disabled,
    width = 'initial',
    height = 'auto',
    xs,
    sm,
    md,
    lg,
    xl,
  }: SelectProps & { __shouldShowPlaceholder: boolean }) =>
  (theme: Theme) => css`
    width: ${width};
    height: ${height};
    position: relative;

    select {
      padding: 12px 44px 12px 16px;
      border-radius: 10px;
      border: none;
      box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
      background-color: transparent;
      width: 100%;
      height: 100%;
      color: ${theme.palette.label.normal};
      -webkit-appearance: none;
      -moz-appearance: none;
      ${typographyStyle('body1_normal', 'regular')}

      &:focus-visible {
        outline-style: solid;
      }

      option[value=''][disabled] {
        display: none;
      }

      ${__shouldShowPlaceholder &&
      css`
        ${typographyStyle('body1_normal', 'regular')}
        color: ${theme.palette.label.assistive};
      `}
    }

    & > svg {
      right: 16px;
      position: absolute;
      font-size: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: ${theme.palette.label.normal};
    }

    ${invalid &&
    css`
      select {
        box-shadow: inset 0 0 0 1px ${theme.palette.status.negative};
      }
    `}

    ${disabled &&
    css`
      select {
        background-color: ${theme.palette.interaction.disable};
      }

      & > svg {
        color: ${theme.palette.label.disable};
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

      ${params?.css}
      `,
    )}
  `;
