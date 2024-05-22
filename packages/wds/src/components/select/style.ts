import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { SelectProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const selectWrapperStyle =
  ({
    disabled,
    width = 'initial',
    height = 'fit-content',
    xs,
    sm,
    md,
    lg,
    xl,
  }: Pick<
    SelectProps,
    'disabled' | 'width' | 'height' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  >) =>
  (theme: Theme) => css`
    position: relative;
    width: ${width};
    height: ${height};

    & > svg {
      right: 16px;
      position: absolute;
      font-size: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: ${theme.palette.label.normal};
    }

    ${disabled &&
    css`
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
      `,
    )}
  `;

export const selectStyle =
  ({
    __shouldShowPlaceholder,
    invalid,
    disabled,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SelectProps & { __shouldShowPlaceholder: boolean }) =>
  (theme: Theme) => css`
    padding: 12px 44px 12px 16px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
    background-color: transparent;
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

    ${invalid &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.palette.status.negative};
    `}

    ${disabled &&
    css`
      background-color: ${theme.palette.interaction.disable};
    `}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.sx}
      `,
    )}
  `;
