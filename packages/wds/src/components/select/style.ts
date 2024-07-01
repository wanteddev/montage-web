import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  createResponsiveStyle,
  typographyStyle,
} from '../../utils';

import type { SelectProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const selectWrapperStyle = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

export const selectStyle =
  ({
    __shouldShowPlaceholder,
    invalid,
    width = 'initial',
    height = 'fit-content',
    xs,
    sm,
    md,
    lg,
    xl,
  }: SelectProps & { __shouldShowPlaceholder: boolean }) =>
  (theme: Theme) => css`
    padding: 12px 48px 12px 16px;
    border-radius: 12px;
    border: none;
    outline: none;
    box-shadow:
      inset 0 0 0 1px ${theme.palette.line.normal.neutral},
      0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
    background-color: transparent;
    transition: box-shadow ease 0.2s;
    color: ${theme.palette.label.normal};
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    width: ${width};
    height: ${height};
    ${typographyStyle('body1_normal', 'medium')}

    &:focus {
      outline: none;

      ${!invalid &&
      css`
        box-shadow:
          inset 0 0 0 2px
            ${addOpacity(theme.palette.primary.normal, theme.opacity[43])},
          0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
      `}
    }

    ${invalid &&
    css`
      box-shadow:
        inset 0 0 0 1px
          ${addOpacity(theme.palette.status.negative, theme.opacity[28])},
        0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};

      &:focus {
        box-shadow:
          inset 0 0 0 2px
            ${addOpacity(theme.palette.status.negative, theme.opacity[43])},
          0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
      }
    `}

    option[value=''][disabled] {
      display: none;
    }

    ${__shouldShowPlaceholder &&
    css`
      ${typographyStyle('body1_normal', 'medium')}
      color: ${theme.palette.label.alternative};
    `}

    &:disabled {
      color: ${theme.palette.label.disable};
      background-color: ${theme.palette.interaction.disable};
      box-shadow:
        inset 0 0 0 1px ${theme.palette.line.normal.alternative},
        0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
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

export const selectIconStyle =
  ({ disabled }: SelectProps) =>
  (theme: Theme) => css`
    font-size: 16px;
    margin: 0px 4px;
    position: absolute;
    right: 12px;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    display: block;

    ${theme.palette.label.alternative};

    ${disabled &&
    css`
      color: ${theme.palette.label.disable};
    `}
  `;
