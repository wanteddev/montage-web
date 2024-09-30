import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';
import { addOpacity } from '../../utils';

import type { ChipActionProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const actionStyle =
  ({ xs, sm, md, lg, xl, ...props }: ChipActionProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    cursor: pointer;
    width: fit-content;
    flex-shrink: 0;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: initial;
    }

    ${actionVariantStyle(props, theme)}
    ${actionSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${actionSizeStyle(params)}
        ${params?.sx}
      `,
    )}
  `;

const actionSizeStyle = ({ size }: ChipActionProps = {}) => {
  switch (size) {
    case 'xsmall':
      return css`
        border-radius: 6px;
        padding: 4px 6px;
        gap: 4px;

        svg {
          font-size: 12px;
        }
        & > span {
          ${typographyStyle('caption1', 'medium')}
        }
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 6px 10px;
        gap: 4px;

        svg {
          font-size: 14px;
        }
        & > span {
          ${typographyStyle('label1_normal', 'medium')}
        }
      `;
    case 'normal':
      return css`
        border-radius: 8px;
        padding: 7px 12px;
        gap: 4px;

        svg {
          font-size: 14px;
        }

        & > span {
          ${typographyStyle('body2_normal', 'medium')}
        }
      `;
    case 'large':
      return css`
        border-radius: 10px;
        padding: 9px 12px;
        gap: 6px;

        svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('body2_normal', 'medium')}
        }
      `;
  }
};

const actionVariantStyle = (
  { variant }: ChipActionProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'filled':
      return css`
        color: ${theme.palette.label.normal};
        background-color: ${theme.palette.fill.alternative};
        box-shadow: none;

        svg {
          color: ${theme.palette.label.alternative};
        }

        &[aria-pressed='true'] {
          color: ${theme.palette.inverse.label};
          background-color: ${theme.palette.inverse.background};

          svg {
            color: ${theme.palette.inverse.label};
          }
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: ${theme.palette.interaction.disable};
          box-shadow: none;
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.palette.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

        svg {
          color: ${theme.palette.label.alternative};
        }

        &[aria-pressed='true'] {
          background-color: ${addOpacity(
            theme.palette.primary.normal,
            theme.opacity[5],
          )};
          box-shadow: inset 0 0 0 1px
            ${addOpacity(theme.palette.primary.normal, theme.opacity[43])};
          color: ${theme.palette.primary.normal};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
        }
      `;
  }
};
